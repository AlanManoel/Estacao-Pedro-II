import { useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { errorMessage, useRequest } from "@/hooks/useRequest";
import {
    deletePhoto,
    getAttraction,
    imageUrl,
    setCover,
    uploadPhoto,
    type AttractionPhoto,
} from "@/services/attractionsApi";
import { Button } from "@/shared/Components/Button";
import { ScreenHeader } from "@/shared/Components/ScreenHeader";
import { Theme } from "@/shared/Themes";
import { adminStyles as styles } from "../styles";

export const AdminAttractionPhotos = () => {
    const { id } = useRoute().params as { id: string };
    const { data: attraction, loading, error, reload } = useRequest(() => getAttraction(id), [id]);
    const [busy, setBusy] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    async function run(action: () => Promise<unknown>) {
        setBusy(true);
        setActionError(null);
        try {
            await action();
            reload();
        } catch (err) {
            setActionError(errorMessage(err));
        } finally {
            setBusy(false);
        }
    }

    async function pickAndUpload() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            setActionError("Permissão para acessar as fotos negada.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], quality: 0.8 });
        if (result.canceled || result.assets.length === 0) return;

        const asset = result.assets[0];
        const mimeType = asset.mimeType ?? "image/jpeg";
        const fileName = asset.fileName ?? `foto.${mimeType.split("/")[1] ?? "jpg"}`;
        await run(() => uploadPhoto(id, asset.uri, mimeType, fileName));
    }

    function openActions(photo: AttractionPhoto) {
        const isCover = attraction?.coverUrl === photo.url;
        Alert.alert("Foto", isCover ? "Esta é a capa." : undefined, [
            ...(isCover ? [] : [{ text: "Definir como capa", onPress: () => run(() => setCover(id, photo.id)) }]),
            {
                text: "Remover",
                style: "destructive" as const,
                onPress: () =>
                    Alert.alert("Remover foto", "Remover esta foto? Isso não pode ser desfeito.", [
                        { text: "Cancelar", style: "cancel" },
                        { text: "Remover", style: "destructive", onPress: () => run(() => deletePhoto(id, photo.id)) },
                    ]),
            },
            { text: "Cancelar", style: "cancel" as const },
        ]);
    }

    return (
        <View style={styles.screen}>
            <ScreenHeader title={attraction ? `Fotos: ${attraction.name}` : "Fotos"} />
            <ScrollView contentContainerStyle={styles.content}>
                <Button title="Adicionar foto" onPress={pickAndUpload} loading={busy} />

                {actionError && <Text style={styles.errorText}>{actionError}</Text>}
                {loading && <ActivityIndicator size="large" color={Theme.colors.primary500} />}
                {error && (
                    <View style={styles.center}>
                        <Text style={styles.feedbackText}>{error}</Text>
                        <Button title="Tentar de novo" variant="outline" onPress={reload} />
                    </View>
                )}

                {attraction && attraction.photos.length === 0 && !loading && (
                    <Text style={styles.feedbackText}>Nenhuma foto ainda. A primeira enviada vira a capa.</Text>
                )}

                <View style={styles.photoGrid}>
                    {attraction?.photos.map((photo) => {
                        const isCover = attraction.coverUrl === photo.url;
                        return (
                            <TouchableOpacity key={photo.id} style={styles.photoTile} onPress={() => openActions(photo)}>
                                <Image source={{ uri: imageUrl(photo.url) }} style={styles.photoImage} />
                                {isCover && (
                                    <View style={styles.coverBadge}>
                                        <Text style={styles.coverBadgeText}>Capa</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};
