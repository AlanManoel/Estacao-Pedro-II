import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { guides } from "@/data/guides";
import { useRequest } from "@/hooks/useRequest";
import { getAttraction, imageUrl, TRAIL_LEVEL_LABEL } from "@/services/attractionsApi";
import { Button } from "@/shared/Components/Button";
import { GuideCards } from "@/shared/Components/GuideCards";
import { Theme } from "@/shared/Themes";
import { detailsStyles as styles } from "../details.styles";

type Section = { title: string; text: string | null };

export const AttractionDetails = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { id } = useRoute().params as { id: string };

    const { data: attraction, loading, error, reload } = useRequest(() => getAttraction(id), [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Theme.colors.primary500} />
            </View>
        );
    }

    if (error || !attraction) {
        return (
            <View style={styles.center}>
                <Text style={styles.feedbackText}>{error ?? "Atração não encontrada"}</Text>
                <Button title="Tentar de novo" variant="outline" onPress={reload} />
                <Button title="Voltar" variant="link" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    const isWaterfall = attraction.type === "CACHOEIRA";
    const sections: Section[] = [
        { title: isWaterfall ? "Sobre a trilha" : "Descrição", text: attraction.description },
        { title: "Dicas e cuidados", text: attraction.tips },
        { title: "Horário", text: attraction.openingHours },
        { title: "Preço", text: attraction.price },
        { title: "Como chegar", text: attraction.howToGet },
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
                        latitude: attraction.latitude,
                        longitude: attraction.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: attraction.latitude, longitude: attraction.longitude }}
                        title={attraction.name}
                    />
                </MapView>

                <LinearGradient
                    colors={["transparent", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.7)", "#F3F0FA"]}
                    style={styles.gradient}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{attraction.name}</Text>

                {attraction.photos.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.photosContainer}
                    >
                        {attraction.photos.map((photo) => (
                            <Image key={photo.id} source={{ uri: imageUrl(photo.url) }} style={styles.photo} />
                        ))}
                    </ScrollView>
                )}

                {isWaterfall && (
                    <View style={styles.trailCards}>
                        <View style={styles.trailCard}>
                            <Text style={styles.trailCardLabel}>Distância</Text>
                            <Text style={styles.trailCardValue}>{attraction.trailDistance}</Text>
                        </View>
                        <View style={styles.trailCard}>
                            <Text style={styles.trailCardLabel}>Tempo</Text>
                            <Text style={styles.trailCardValue}>{attraction.trailTime}</Text>
                        </View>
                        <View style={styles.trailCard}>
                            <Text style={styles.trailCardLabel}>Nível</Text>
                            <Text style={styles.trailCardValue}>
                                {attraction.trailLevel ? TRAIL_LEVEL_LABEL[attraction.trailLevel] : "-"}
                            </Text>
                        </View>
                    </View>
                )}

                {sections
                    .filter((section) => section.text)
                    .map((section) => (
                        <View key={section.title}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <Text style={styles.sectionText}>{section.text}</Text>
                        </View>
                    ))}

                <View>
                    <Text style={styles.sectionTitle}>Guias locais</Text>
                    <Text style={styles.sectionText}>Entre em contato com os guias através do WhatsApp ou Instagram</Text>
                    {guides.map((guide) => (
                        <GuideCards key={guide.id} name={guide.name} image={guide.image} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};
