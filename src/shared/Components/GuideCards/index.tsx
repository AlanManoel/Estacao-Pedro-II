import { Alert, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";

import { imageUrl } from "@/services/attractionsApi";
import { instagramUrl, whatsappUrl, type GuideSummary } from "@/services/guidesApi";
import { styles } from "./styles";

type Props = {
    guide: GuideSummary;
    attractionName: string;
};

async function open(url: string) {
    try {
        await Linking.openURL(url);
    } catch {
        Alert.alert("Não foi possível abrir o aplicativo");
    }
}

export const GuideCards = ({ guide, attractionName }: Props) => {
    return (
        <View style={styles.card}>
            <View style={styles.containterPrimaryCard}>
                {guide.photoUrl ? (
                    <Image style={styles.imageCard} source={{ uri: imageUrl(guide.photoUrl) }} />
                ) : (
                    <View style={[styles.imageCard, styles.imagePlaceholder]}>
                        <Feather name="user" size={26} color="#A9A9B8" />
                    </View>
                )}
                <View style={styles.texts}>
                    <Text style={styles.nameCard} numberOfLines={1}>{guide.name}</Text>
                    {guide.description && (
                        <Text style={styles.descriptionCard} numberOfLines={2}>{guide.description}</Text>
                    )}
                </View>
            </View>
            <View style={styles.containterIcons}>
                <TouchableOpacity
                    onPress={() => open(whatsappUrl(guide.whatsapp, attractionName))}
                    accessibilityLabel={`WhatsApp de ${guide.name}`}
                >
                    <FontAwesome5 name="whatsapp" size={36} color="#171717" />
                </TouchableOpacity>
                {guide.instagram && (
                    <TouchableOpacity
                        onPress={() => open(instagramUrl(guide.instagram as string))}
                        accessibilityLabel={`Instagram de ${guide.name}`}
                    >
                        <Entypo name="instagram" size={32} color="#171717" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
