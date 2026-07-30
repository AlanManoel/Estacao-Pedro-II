import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { waterfalls } from "@/data/waterfalls";
import { waterfallInfo } from "@/data/common"
import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { guides } from "@/data/guides"
import { styles } from "./styles";
import { GuideCards } from "@/shared/Components/GuideCards";


export const DetailsWaterfall = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const route = useRoute();

    const { id } = route.params as {
        id: number;
    };

    const tourism = waterfalls.find(item => item.id === id);

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#F3F0FA" />
                </TouchableOpacity>
                <Image
                    source={tourism?.image}
                    style={styles.image}
                />

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

            <View style={styles.containerDescription}>
                <Text style={styles.title}>{tourism?.name}</Text>

                <View style={styles.containerCards}>
                    <View style={styles.cardsInfo}>
                        <Text style={styles.subitleTextCard}>Distância</Text>
                        <Text style={styles.textCard}>{tourism?.distance}</Text>
                    </View>
                    <View style={styles.cardsInfo}>
                        <Text style={styles.subitleTextCard}>Tempo</Text>
                        <Text style={styles.textCard}>{tourism?.time}</Text>
                    </View>
                    <View style={styles.cardsInfo}>
                        <Text style={styles.subitleTextCard}>Nível</Text>
                        <Text style={styles.textCard}>{tourism?.level}</Text>
                    </View>
                </View>

                <View style={styles.containerInfo}>
                    <View>
                        <Text style={styles.titleInfo}>Sobre a trilha</Text>
                        <Text style={styles.subitleTextInfo}>{tourism?.description}</Text>
                    </View>
                    <View>
                        <Text style={styles.titleInfo}>Dicas e cuidado</Text>
                        <Text style={styles.subitleTextInfo}>{waterfallInfo.tips}</Text>
                    </View>
                    <View>
                        <Text style={styles.titleInfo}>Como chegar</Text>
                        <Text style={styles.subitleTextInfo}>{waterfallInfo.guide}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.titleInfo}>Guias locais</Text>
                    <Text style={styles.subitleTextInfo}>Entre em contato com o guias através do WhatsApp ou Instagram</Text>
                    {guides.map((guide) => (
                        <GuideCards
                            key={guide.id}
                            name={guide.name}
                            image={guide.image}
                        />
                    ))}
                </View>
            </View>

        </ScrollView>
    );
}
