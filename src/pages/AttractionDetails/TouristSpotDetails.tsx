import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import MapView, { Marker } from "react-native-maps";

import { LinearGradient } from "expo-linear-gradient";

import { TSScreenDefinitionsProps } from "@/AppRoutes";

import { imageUrl } from "@/services/attractionsApi";

import { GuideCards } from "@/shared/Components/GuideCards";

import { detailsStyles as styles } from "../details.styles";

type Props = {
    attraction: any;
};

export const TouristSpotDetails = ({ attraction }: Props) => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    return (
        <ScrollView>
            {/* MAPA */}
            <View style={styles.mapContainer}>
                <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => navigation.goBack()}
                >
                    <Feather
                        name="arrow-left"
                        size={24}
                        color="#F3F0FA"
                    />
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
                        coordinate={{
                            latitude: attraction.latitude,
                            longitude: attraction.longitude,
                        }}
                        title={attraction.name}
                    />
                </MapView>

                <LinearGradient
                    colors={[
                        "transparent",
                        "rgba(255,255,255,0.3)",
                        "rgba(255,255,255,0.7)",
                        "#F3F0FA",
                    ]}
                    style={styles.gradient}
                />
            </View>

            {/* CONTEÚDO */}
            <View style={styles.content}>

                <Text style={styles.title}>
                    {attraction.name}
                </Text>

                {/* FOTOS */}
                {attraction.photos.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[
                            styles.photosContainer,
                            attraction.photos.length === 1 && styles.singlePhotoContainer,
                        ]}
                    >
                        {attraction.photos.map((photo: any) => (
                            <Image
                                key={photo.id}
                                source={{
                                    uri: imageUrl(photo.url),
                                }}
                                style={[
                                    styles.photo,
                                    attraction.photos.length === 1 && styles.singlePhoto,
                                ]}
                            />
                        ))}
                    </ScrollView>
                )}

                {/* DESCRIÇÃO */}
                {attraction.description && (
                    <View>
                        <Text style={styles.sectionTitle}>
                            Descrição
                        </Text>

                        <Text style={styles.sectionText}>
                            {attraction.description}
                        </Text>
                    </View>
                )}

                {/* DICAS */}
                {attraction.tips && (
                    <View>
                        <Text style={styles.sectionTitle}>
                            Dicas e cuidados
                        </Text>

                        <Text style={styles.sectionText}>
                            {attraction.tips}
                        </Text>
                    </View>
                )}

                {/* HORÁRIO */}
                {attraction.openingHours && (
                    <View>
                        <Text style={styles.sectionTitle}>
                            Horário
                        </Text>

                        <Text style={styles.sectionText}>
                            {attraction.openingHours}
                        </Text>
                    </View>
                )}

                {/* PREÇO */}
                {attraction.price && (
                    <View>
                        <Text style={styles.sectionTitle}>
                            Preço
                        </Text>

                        <Text style={styles.sectionText}>
                            {attraction.price}
                        </Text>
                    </View>
                )}

                {/* COMO CHEGAR */}
                {attraction.howToGet && (
                    <View>
                        <Text style={styles.sectionTitle}>
                            Como chegar
                        </Text>

                        <Text style={styles.sectionText}>
                            {attraction.howToGet}
                        </Text>
                    </View>
                )}

                {/* GUIAS */}
                <View>
                    <Text style={styles.sectionTitle}>
                        Guias locais
                    </Text>

                    {attraction.guides.length === 0 ? (
                        <Text style={styles.sectionText}>
                            Nenhum guia cadastrado para esta atração.
                        </Text>
                    ) : (
                        <>
                            <Text style={styles.sectionText}>
                                Entre em contato com os guias pelo WhatsApp ou Instagram
                            </Text>

                            {attraction.guides.map((guide: any) => (
                                <GuideCards
                                    key={guide.id}
                                    guide={guide}
                                    attractionName={attraction.name}
                                />
                            ))}
                        </>
                    )}
                </View>

            </View>
        </ScrollView>
    );
};