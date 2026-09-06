import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { errorMessage, useRequest } from "@/hooks/useRequest";
import {
    ATTRACTION_TYPE_LABEL,
    deleteAttraction,
    imageUrl,
    listAttractions,
    type AttractionSummary,
} from "@/services/attractionsApi";
import { Button } from "@/shared/Components/Button";
import { ScreenHeader } from "@/shared/Components/ScreenHeader";
import { Theme } from "@/shared/Themes";
import { adminStyles as styles } from "../styles";

export const AdminAttractions = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { data, loading, error, reload } = useRequest(() => listAttractions(), []);
    const [actionError, setActionError] = useState<string | null>(null);

    // Recarrega ao voltar do formulário ou das fotos.
    useFocusEffect(useCallback(() => { reload(); }, [reload]));

    function confirmDelete(item: AttractionSummary) {
        Alert.alert("Apagar atração", `Apagar "${item.name}" e todas as fotos? Isso não pode ser desfeito.`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Apagar",
                style: "destructive",
                onPress: async () => {
                    setActionError(null);
                    try {
                        await deleteAttraction(item.id);
                        reload();
                    } catch (err) {
                        setActionError(errorMessage(err));
                    }
                },
            },
        ]);
    }

    return (
        <View style={styles.screen}>
            <ScreenHeader title="Atrações" />
            <ScrollView contentContainerStyle={styles.content}>
                <Button title="Nova atração" onPress={() => navigation.navigate("AdminAttractionForm", {})} />

                {actionError && <Text style={styles.errorText}>{actionError}</Text>}
                {loading && <ActivityIndicator size="large" color={Theme.colors.primary500} />}
                {error && (
                    <View style={styles.center}>
                        <Text style={styles.feedbackText}>{error}</Text>
                        <Button title="Tentar de novo" variant="outline" onPress={reload} />
                    </View>
                )}

                {data?.map((item) => (
                    <View key={item.id} style={styles.listItem}>
                        <TouchableOpacity
                            style={[styles.row, { flex: 1 }]}
                            onPress={() => navigation.navigate("AdminAttractionForm", { id: item.id })}
                        >
                            {item.coverUrl ? (
                                <Image source={{ uri: imageUrl(item.coverUrl) }} style={styles.thumb} />
                            ) : (
                                <View style={styles.thumb}>
                                    <Feather name="image" size={24} color="#A9A9B8" />
                                </View>
                            )}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.listTitle} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.listSubtitle}>{ATTRACTION_TYPE_LABEL[item.type]}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate("AdminAttractionPhotos", { id: item.id })}
                            accessibilityLabel="Fotos"
                        >
                            <Feather name="camera" size={22} color={Theme.colors.primary500} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => confirmDelete(item)}
                            accessibilityLabel="Apagar"
                        >
                            <Feather name="trash-2" size={22} color="#C62828" />
                        </TouchableOpacity>
                    </View>
                ))}

                {data?.length === 0 && !loading && (
                    <Text style={styles.feedbackText}>Nenhuma atração cadastrada.</Text>
                )}
            </ScrollView>
        </View>
    );
};
