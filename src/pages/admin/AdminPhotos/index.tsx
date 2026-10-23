import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { errorMessage, useRequest } from "@/hooks/useRequest";
import {
    deletePhoto,
    getAttraction,
    imageUrl,
    setCover,
    uploadPhoto,
    updatePhotoCredit,
    type AttractionPhoto,
} from "@/services/attractionsApi";
import {
    deleteEventPhoto,
    getEvent,
    setEventCover,
    uploadEventPhoto,
    updateEventPhotoCredit,
} from "@/services/eventsApi";
import {
    deleteEstablishmentPhoto,
    getEstablishment,
    setEstablishmentCover,
    uploadEstablishmentPhoto,
    updateEstablishmentPhotoCredit,
} from "@/services/establishmentsApi";
import { Button } from "@/shared/Components/Button";
import { ScreenHeader } from "@/shared/Components/ScreenHeader";
import { Theme } from "@/shared/Themes";
import { adminStyles as styles } from "../styles";

export type PhotoOwnerKind = "attraction" | "event" | "establishment";

type OwnerDetail = {
    name: string;
    coverUrl: string | null;
    photos: AttractionPhoto[];
};

type PhotoSource = {
    get: (id: string) => Promise<OwnerDetail>;
    upload: (
        id: string,
        uri: string,
        mimeType: string,
        fileName: string,
        credit?: string,
    ) => Promise<unknown>;
    remove: (id: string, photoId: string) => Promise<void>;
    setCover: (id: string, photoId: string) => Promise<unknown>;
    updateCredit: (
        id: string,
        photoId: string,
        credit: string | null,
    ) => Promise<unknown>;
};

const SOURCES: Record<PhotoOwnerKind, PhotoSource> = {
    attraction: {
        get: getAttraction,
        upload: uploadPhoto,
        remove: deletePhoto,
        setCover,
        updateCredit: updatePhotoCredit,
    },
    event: {
        get: getEvent,
        upload: uploadEventPhoto,
        remove: deleteEventPhoto,
        setCover: setEventCover,
        updateCredit: updateEventPhotoCredit,
    },
    establishment: {
        get: getEstablishment,
        upload: uploadEstablishmentPhoto,
        remove: deleteEstablishmentPhoto,
        setCover: setEstablishmentCover,
        updateCredit: updateEstablishmentPhotoCredit,
    },
};

export const AdminPhotos = () => {
    const { kind, id } = useRoute().params as {
        kind: PhotoOwnerKind;
        id: string;
    };

    const source = SOURCES[kind];

    const {
        data: owner,
        loading,
        error,
        reload,
    } = useRequest(() => source.get(id), [kind, id]);

    const [busy, setBusy] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    // Foto selecionada para envio
    const [pendingPhoto, setPendingPhoto] =
        useState<ImagePicker.ImagePickerAsset | null>(null);
    const [credit, setCredit] = useState("");

    // Foto e crédito que estão sendo editados
    const [editingPhoto, setEditingPhoto] =
        useState<AttractionPhoto | null>(null);
    const [editingCredit, setEditingCredit] = useState("");

    async function run(action: () => Promise<unknown>) {
        setBusy(true);
        setActionError(null);

        try {
            await action();
            await reload();
        } catch (err) {
            setActionError(errorMessage(err));
        } finally {
            setBusy(false);
        }
    }

    async function pickAndUpload() {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            setActionError("Permissão para acessar as fotos negada.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.8,
        });

        if (result.canceled || result.assets.length === 0) return;

        setPendingPhoto(result.assets[0]);
        setCredit("");
        setEditingPhoto(null);
        setActionError(null);
    }

    async function confirmUpload() {
        if (!pendingPhoto) return;

        const asset = pendingPhoto;
        const mimeType = asset.mimeType ?? "image/jpeg";
        const fileName =
            asset.fileName ?? `foto.${mimeType.split("/")[1] ?? "jpg"}`;

        await run(async () => {
            await source.upload(
                id,
                asset.uri,
                mimeType,
                fileName,
                credit.trim() || undefined,
            );

            setPendingPhoto(null);
            setCredit("");
        });
    }

    function openActions(photo: AttractionPhoto) {
        const isCover = owner?.coverUrl === photo.url;

        Alert.alert("Foto", isCover ? "Esta é a capa." : undefined, [
            {
                text: "Editar crédito",
                onPress: () => {
                    setEditingPhoto(photo);
                    setEditingCredit(photo.credit ?? "");
                    setPendingPhoto(null);
                    setActionError(null);
                },
            },
            ...(isCover
                ? []
                : [
                      {
                          text: "Definir como capa",
                          onPress: () =>
                              run(() => source.setCover(id, photo.id)),
                      },
                  ]),
            {
                text: "Remover",
                style: "destructive" as const,
                onPress: () =>
                    Alert.alert(
                        "Remover foto",
                        "Remover esta foto? Isso não pode ser desfeito.",
                        [
                            { text: "Cancelar", style: "cancel" },
                            {
                                text: "Remover",
                                style: "destructive",
                                onPress: () =>
                                    run(() => source.remove(id, photo.id)),
                            },
                        ],
                    ),
            },
            { text: "Cancelar", style: "cancel" },
        ]);
    }

    async function saveCredit() {
        if (!editingPhoto) return;

        const photo = editingPhoto;

        await run(async () => {
            await source.updateCredit(
                id,
                photo.id,
                editingCredit.trim() || null,
            );

            setEditingPhoto(null);
            setEditingCredit("");
        });
    }

    return (
        <View style={styles.screen}>
            <ScreenHeader title={owner ? `Fotos: ${owner.name}` : "Fotos"} />

            <ScrollView contentContainerStyle={styles.content}>
                <Button
                    title="Selecionar foto"
                    onPress={pickAndUpload}
                    loading={busy}
                />

                {pendingPhoto && (
                    <View style={{ gap: 10, marginTop: 16 }}>
                        <Text style={styles.feedbackText}>
                            Foto selecionada. Informe o crédito, se necessário.
                        </Text>

                        <Image
                            source={{ uri: pendingPhoto.uri }}
                            style={{
                                width: "100%",
                                height: 180,
                                borderRadius: 10,
                            }}
                            resizeMode="cover"
                        />

                        <Text style={styles.feedbackText}>
                            Crédito da foto (opcional)
                        </Text>

                        <TextInput
                            value={credit}
                            onChangeText={setCredit}
                            placeholder="Ex.: Prefeitura de Pedro II"
                            maxLength={120}
                            editable={!busy}
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                padding: 12,
                                color: Theme.colors.neutralBlack,
                            }}
                        />

                        <Button
                            title="Enviar foto"
                            onPress={confirmUpload}
                            loading={busy}
                        />

                        <Button
                            title="Cancelar"
                            variant="outline"
                            onPress={() => {
                                setPendingPhoto(null);
                                setCredit("");
                            }}
                        />
                    </View>
                )}

                {editingPhoto && (
                    <View style={{ gap: 10, marginTop: 16 }}>
                        <Text style={styles.feedbackText}>
                            Editar crédito da foto
                        </Text>

                        <TextInput
                            value={editingCredit}
                            onChangeText={setEditingCredit}
                            placeholder="Ex.: Prefeitura de Pedro II"
                            maxLength={120}
                            editable={!busy}
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                padding: 12,
                                color: Theme.colors.neutralBlack,
                            }}
                        />

                        <Button
                            title="Salvar crédito"
                            onPress={saveCredit}
                            loading={busy}
                        />

                        <Button
                            title="Cancelar"
                            variant="outline"
                            onPress={() => {
                                setEditingPhoto(null);
                                setEditingCredit("");
                            }}
                        />
                    </View>
                )}

                {actionError && (
                    <Text style={styles.errorText}>{actionError}</Text>
                )}

                {loading && (
                    <ActivityIndicator
                        size="large"
                        color={Theme.colors.primary500}
                    />
                )}

                {error && (
                    <View style={styles.center}>
                        <Text style={styles.feedbackText}>{error}</Text>
                        <Button
                            title="Tentar de novo"
                            variant="outline"
                            onPress={reload}
                        />
                    </View>
                )}

                {owner && owner.photos.length === 0 && !loading && (
                    <Text style={styles.feedbackText}>
                        Nenhuma foto ainda. A primeira enviada vira a capa.
                    </Text>
                )}

                <View style={styles.photoGrid}>
                    {owner?.photos.map((photo) => {
                        const isCover = owner.coverUrl === photo.url;

                        return (
                            <TouchableOpacity
                                key={photo.id}
                                style={styles.photoTile}
                                onPress={() => openActions(photo)}
                                disabled={busy}
                            >
                                <Image
                                    source={{ uri: imageUrl(photo.url) }}
                                    style={styles.photoImage}
                                />

                                {isCover && (
                                    <View style={styles.coverBadge}>
                                        <Text style={styles.coverBadgeText}>
                                            Capa
                                        </Text>
                                    </View>
                                )}

                                {!!photo.credit && (
                                    <Text
                                        style={{
                                            padding: 6,
                                            fontSize: 12,
                                            color: Theme.colors.neutralBlack,
                                        }}
                                    >
                                        Crédito: {photo.credit}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
};