import { Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { useAuth } from "@/contexts/AuthContext";
import { Images } from "@/shared/Assets";
import { Button } from "@/shared/Components/Button";
import { styles } from "./styles";

export const Welcome = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { continueAsGuest } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Image source={Images.logoBlue} />
                <Text style={styles.title}>Estação Pedro II</Text>
                <Text style={styles.subtitle}>Explore cultura, natureza e eventos da cidade.</Text>
            </View>

            <View style={styles.actions}>
                <Button title="Entrar" onPress={() => navigation.navigate("SignIn")} />
                <Button title="Criar conta" variant="outline" onPress={() => navigation.navigate("SignUp")} />
                <Button title="Continuar como convidado" variant="link" onPress={continueAsGuest} />
            </View>
        </View>
    );
};
