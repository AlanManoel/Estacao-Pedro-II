import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { ScreenHeader } from "@/shared/Components/ScreenHeader";
import { Theme } from "@/shared/Themes";
import { adminStyles as styles } from "../styles";

const ITEMS = [
    { title: "Atrações", subtitle: "Cachoeiras e pontos turísticos", icon: "map-pin", route: "AdminAttractions" },
    { title: "Eventos", subtitle: "Festivais e programação", icon: "calendar", route: "AdminEvents" },
    { title: "Guias", subtitle: "Guias locais e contatos", icon: "users", route: "AdminGuides" },
] as const;

export const AdminMenu = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    return (
        <View style={styles.screen}>
            <ScreenHeader title="Administração" />
            <ScrollView contentContainerStyle={styles.content}>
                {ITEMS.map((item) => (
                    <TouchableOpacity key={item.route} style={styles.listItem} onPress={() => navigation.navigate(item.route)}>
                        <View style={styles.thumb}>
                            <Feather name={item.icon} size={24} color={Theme.colors.primary500} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.listTitle}>{item.title}</Text>
                            <Text style={styles.listSubtitle}>{item.subtitle}</Text>
                        </View>
                        <Feather name="chevron-right" size={22} color="#A9A9B8" />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
