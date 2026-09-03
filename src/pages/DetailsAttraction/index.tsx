import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

import { LinearGradient } from "expo-linear-gradient";

import { touristAttractions } from "@/data/touristAttractions";
import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { styles } from "./styles";



export const DetailsAttraction = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const route = useRoute();

    const { id } = route.params as {
        id: number;
    };

    const tourism = touristAttractions.find(item => item.id === id);

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#F3F0FA" />
                </TouchableOpacity>

                {tourism && (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: tourism.location.latitude,
                            longitude: tourism.location.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: tourism.location.latitude,
                                longitude: tourism.location.longitude,
                            }}
                            title={tourism.name}
                        />
                    </MapView>
                )}

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
                <Text>Fotos</Text>
            </View>

        </ScrollView>
    );
}