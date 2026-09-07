import { ActivityIndicator, Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { useRequest } from "@/hooks/useRequest";
import { imageUrl } from "@/services/attractionsApi";
import { instagramUrl, whatsappUrl } from "@/services/contacts";
import {
    ESTABLISHMENT_TYPE_LABEL,
    getEstablishment,
    PRICE_RANGE_LABEL,
} from "@/services/establishmentsApi";
import { Button } from "@/shared/Components/Button";
import { Theme } from "@/shared/Themes";
import { detailsStyles as styles } from "../details.styles";

type Section = { title: string; text: string | null };

async function open(url: string) {
    try {
        await Linking.openURL(url);
    } catch {
        Alert.alert("Não foi possível abrir o aplicativo");
    }
}

export const EstablishmentDetails = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { id } = useRoute().params as { id: string };

    const { data: place, loading, error, reload } = useRequest(() => getEstablishment(id), [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Theme.colors.primary500} />
            </View>
        );
    }

    if (error || !place) {
        return (
            <View style={styles.center}>
                <Text style={styles.feedbackText}>{error ?? "Estabelecimento não encontrado"}</Text>
                <Button title="Tentar de novo" variant="outline" onPress={reload} />
                <Button title="Voltar" variant="link" onPress={() => navigation.goBack()} />
            </View>
        );
    }

    const sections: Section[] = [
        { title: "Sobre", text: place.description },
        { title: "Destaques", text: place.highlights },
        { title: "Horário", text: place.openingHours },
        { title: "Endereço", text: place.address },
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
                        latitude: place.latitude,
                        longitude: place.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={{ latitude: place.latitude, longitude: place.longitude }} title={place.name} />
                </MapView>

                <LinearGradient
                    colors={["transparent", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.7)", "#F3F0FA"]}
                    style={styles.gradient}
                />
            </View>

            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>{place.name}</Text>
                    <Text style={styles.period}>
                        {ESTABLISHMENT_TYPE_LABEL[place.type]} · {PRICE_RANGE_LABEL[place.priceRange]}
                    </Text>
                </View>

                <View style={{ gap: 12 }}>
                    <Button title="Chamar no WhatsApp" onPress={() => open(whatsappUrl(place.whatsapp, place.name))} />
                    {place.instagram && (
                        <Button title="Ver no Instagram" variant="outline" onPress={() => open(instagramUrl(place.instagram as string))} />
                    )}
                </View>

                {place.photos.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photosContainer}>
                        {place.photos.map((photo) => (
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
