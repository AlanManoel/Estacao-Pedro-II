import { Image, ScrollView, Text, TouchableOpacity, View, } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TSScreenDefinitionsProps } from "@/AppRoutes";

import { imageUrl, } from "@/services/attractionsApi";
import { GuideCards } from "@/shared/Components/GuideCards";
import { detailsStyles as styles } from "../details.styles";

type Props = {
    attraction: any;
};

export const WaterfallDetails = ({ attraction }: Props) => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    const mainPhoto = attraction.photos?.[0];
    const thumbnails = attraction.photos?.slice(1);

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

                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Feather
                        name="arrow-left"
                        size={28}
                        color="#F3F0FA"
                    />
                </TouchableOpacity>

                {thumbnails?.length > 0 && (
                    <View style={styles.thumbnailContainer}>
                        {thumbnails.slice(0, 3).map((photo: any) => (
                            <Image
                                key={photo.id}
                                source={{
                                    uri: imageUrl(photo.url),
                                }}
                                style={styles.thumbnail}
                            />
                        ))}
                    </View>
                )}

                <LinearGradient
                    colors={[
                        "transparent",
                        "rgba(243, 240, 250, 0.15)",
                        "rgba(243, 240, 250, 0.55)",
                        "rgba(243, 240, 250, 0.9)",
                        "#F3F0FA",
                    ]}
                    locations={[0, 0.35, 0.65, 0.85, 1]}
                    style={styles.imageGradient}
                />
            </View>

            <View style={styles.content}>

                <Text style={styles.title}>{attraction.name}</Text>

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

                        <Text style={styles.trailCardValue}>{attraction.trailLevel || "-"}</Text>
                    </View>

                </View>
                {attraction.description && (
                    <View>
                        <Text style={styles.sectionTitle}>Descrição</Text>

                        <Text style={styles.sectionText}>{attraction.description}</Text>
                    </View>
                )}
                
                {attraction.tips && (
                    <View>
                        <Text style={styles.sectionTitle}>Dicas e cuidados</Text>

                        <Text style={styles.sectionText}>{attraction.tips}</Text>
                    </View>
                )}

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