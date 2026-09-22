import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Theme } from "@/shared/Themes";
import { styles } from "./styles";

type Props = {
    title: string;
    right?: React.ReactNode;
};

export const ScreenHeader = ({ title, right }: Props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} accessibilityLabel="Voltar">
                <Feather name="arrow-left" size={24} color={Theme.colors.neutralBlack} />
            </TouchableOpacity>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <View style={styles.right}>{right}</View>
        </View>
    );
};
