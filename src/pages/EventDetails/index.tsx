import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { useRequest } from "@/hooks/useRequest";
import { imageUrl } from "@/services/attractionsApi";
import { formatPeriod, getEvent } from "@/services/eventsApi";
import { Button } from "@/shared/Components/Button";
import { Theme } from "@/shared/Themes";
import { detailsStyles as styles } from "../details.styles";

type Section = {
    title: string;
    text: string | null;
};

export const EventDetails = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { id } = useRoute().params as { id: string };
    const { data: event, loading, error, reload } = useRequest(() => getEvent(id), [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Theme.colors.primary500} />
            </View>
        );
    }

    if (error || !event) {
        return (
            <View style={styles.center}>
                <Text style={styles.feedbackText}>{error ?? "Evento não encontrado"}</Text>
                <Button title="Tentar de novo" variant="outline" onPress={reload} />
                <Button title="Voltar" variant="link" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    const sections: Section[] = [
        { title: "Sobre o evento", text: event.description },
        { title: "Local", text: event.address },
        { title: "Dicas", text: event.tips },
    ];

    const mainPhoto = event.photos?.[0];

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                {mainPhoto && (
                    <Image
                        source={{
                            uri: imageUrl(mainPhoto.url),
                        }}
                        style={styles.mainPhoto}
                    />
                )}

                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()} >
                    <Feather name="arrow-left" size={28} color="#F3F0FA" />
                </TouchableOpacity>

                <LinearGradient
                    colors={[
                        "transparent",
                        "rgba(243, 240, 250, 0.15)",
                        "rgba(243, 240, 250, 0.55)",
                        "rgba(243, 240, 250, 0.9)",
                        "#F3F0FA",
                    ]}
                    locations={[0, 0.35, 0.65, 0.85, 1]}
                    style={styles.imageGradient} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{event.name}</Text>

                <Text style={styles.period}> {formatPeriod(event.startsAt, event.endsAt)} </Text>

                {event.dateNote && (<Text style={styles.periodNote}> {event.dateNote} </Text>)}

                {event.photos.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Fotos do evento</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[
                                styles.photosContainer,
                                event.photos.length === 1 && styles.singlePhotoContainer,
                            ]}
                        >
                            {event.photos.map((photo) => (
                                <View
                                    key={photo.id}
                                    style={{
                                        width: event.photos.length === 1 ? "100%" : 280,
                                        marginRight: 12,
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: imageUrl(photo.url),
                                        }}
                                        style={[
                                            styles.photo,
                                            event.photos.length === 1 && styles.singlePhoto,
                                        ]}
                                    />

                                    {!!photo.credit?.trim() && (
                                        <Text
                                            style={{
                                                color: "#696969",
                                                fontSize: 12,
                                                fontWeight: "700",
                                                textAlign: "center",
                                                marginTop: 5,
                                                marginBottom: 8,
                                                width: "100%",
                                            }}
                                        >
                                            Imagem: {photo.credit}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {sections
                    .filter((section) => section.text)
                    .map((section) => (
                        <View key={section.title}>
                            <Text style={styles.sectionTitle}>
                                {section.title}
                            </Text>

                            <Text style={styles.sectionText}>
                                {section.text}
                            </Text>
                        </View>
                    ))}
            </View>
        </ScrollView>
    );
};