import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/services/api";
import { Button } from "@/shared/Components/Button";
import { Input } from "@/shared/Components/Input";
import { authFormStyles as styles } from "../AuthForm.styles";

export const SignIn = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setError(null);
        setLoading(true);
        try {
            await signIn(email.trim(), password);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Não foi possível conectar ao servidor");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Entrar</Text>

            <View style={styles.form}>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="voce@exemplo.com"
                />
                <Input
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Sua senha"
                />
                {error && <Text style={styles.error}>{error}</Text>}
            </View>

            <Button title="Entrar" onPress={handleSubmit} loading={loading} disabled={!email || !password} />
            <Button title="Ainda não tenho conta" variant="link" onPress={() => navigation.navigate("SignUp")} />
        </ScrollView>
    );
};
