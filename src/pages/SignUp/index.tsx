import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/services/api";
import { Button } from "@/shared/Components/Button";
import { Input } from "@/shared/Components/Input";
import { authFormStyles as styles } from "../AuthForm.styles";

export const SignUp = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { signUp } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const canSubmit = name.trim().length >= 2 && email.length > 0 && password.length >= 8;

    async function handleSubmit() {
        setError(null);
        setLoading(true);
        try {
            await signUp(name.trim(), email.trim(), password);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Não foi possível conectar ao servidor");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Criar conta</Text>

            <View style={styles.form}>
                <Input label="Nome" value={name} onChangeText={setName} placeholder="Seu nome" />
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
                    placeholder="Mínimo de 8 caracteres"
                />
                {error && <Text style={styles.error}>{error}</Text>}
            </View>

            <Button title="Criar conta" onPress={handleSubmit} loading={loading} disabled={!canSubmit} />
            <Button title="Já tenho conta" variant="link" onPress={() => navigation.navigate("SignIn")} />
        </ScrollView>
    );
};
