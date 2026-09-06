import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { useRequest } from "@/hooks/useRequest";
import { imageUrl } from "@/services/attractionsApi";
import { formatPeriod, getEvent } from "@/services/eventsApi";
import { Button } from "@/shared/Components/Button";
import { Theme } from "@/shared/Themes";
import { detailsStyles as styles } from "../details.styles";

type Section = { title: string; text: string | null };

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

    return (
        <ScrollView>
            <View style={styles.mapContainer}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#F3F0FA" />
                </TouchableOpacity>

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: event.latitude,
                        longitude: event.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={{ latitude: event.latitude, longitude: event.longitude }} title={event.name} />
                </MapView>

                <LinearGradient
                    colors={["transparent", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.7)", "#F3F0FA"]}
                    style={styles.gradient}
                />
            </View>

            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>{event.name}</Text>
                    <Text style={styles.period}>{formatPeriod(event.startsAt, event.endsAt)}</Text>
                    {event.dateNote && <Text style={styles.periodNote}>{event.dateNote}</Text>}
                </View>

                {event.photos.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photosContainer}>
                        {event.photos.map((photo) => (
                            <Image key={photo.id} source={{ uri: imageUrl(photo.url) }} style={styles.photo} />
                        ))}
                    </ScrollView>
                )}

                {sections
                    .filter((section) => section.text)
                    .map((section) => (
                        <View key={section.title}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <Text style={styles.sectionText}>{section.text}</Text>
                        </View>
                    ))}
            </View>
        </ScrollView>
    );
};
