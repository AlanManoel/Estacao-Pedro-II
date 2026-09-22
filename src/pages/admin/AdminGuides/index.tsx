import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { errorMessage, useRequest } from "@/hooks/useRequest";
import { imageUrl } from "@/services/attractionsApi";
import { deleteGuide, formatWhatsapp, listGuides, type Guide } from "@/services/guidesApi";
import { Button } from "@/shared/Components/Button";
import { ScreenHeader } from "@/shared/Components/ScreenHeader";
import { Theme } from "@/shared/Themes";
import { adminStyles as styles } from "../styles";

export const AdminGuides = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { data, loading, error, reload } = useRequest(() => listGuides(), []);
    const [actionError, setActionError] = useState<string | null>(null);

    useFocusEffect(useCallback(() => { reload(); }, [reload]));

    function confirmDelete(item: Guide) {
        Alert.alert("Apagar guia", `Apagar "${item.name}"? Isso não pode ser desfeito.`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Apagar",
                style: "destructive",
                onPress: async () => {
                    setActionError(null);
                    try {
                        await deleteGuide(item.id);
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
            <ScreenHeader title="Guias" />
            <ScrollView contentContainerStyle={styles.content}>
                <Button title="Novo guia" onPress={() => navigation.navigate("AdminGuideForm", {})} />

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
                            onPress={() => navigation.navigate("AdminGuideForm", { id: item.id })}
                        >
                            {item.photoUrl ? (
                                <Image source={{ uri: imageUrl(item.photoUrl) }} style={styles.thumb} />
                            ) : (
                                <View style={styles.thumb}>
                                    <Feather name="user" size={24} color="#A9A9B8" />
                                </View>
                            )}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.listTitle} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.listSubtitle}>
                                    {formatWhatsapp(item.whatsapp)} · {item.attractionIds.length} atração(ões)
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton} onPress={() => confirmDelete(item)} accessibilityLabel="Apagar">
                            <Feather name="trash-2" size={22} color="#C62828" />
                        </TouchableOpacity>
                    </View>
                ))}

                {data?.length === 0 && !loading && (
                    <Text style={styles.feedbackText}>Nenhum guia cadastrado.</Text>
                )}
            </ScrollView>
        </View>
    );
};
