import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { errorMessage, useRequest } from "@/hooks/useRequest";
import { ApiError } from "@/services/api";
import { imageUrl, listAttractions } from "@/services/attractionsApi";
import { createGuide, getGuide, updateGuide, uploadGuidePhoto, type GuideInput } from "@/services/guidesApi";
import { Button } from "@/shared/Components/Button";
import { Checklist } from "@/shared/Components/Checklist";
import { Input } from "@/shared/Components/Input";
import { ScreenHeader } from "@/shared/Components/ScreenHeader";
import { Theme } from "@/shared/Themes";
import { adminStyles as styles } from "../styles";

type FormState = {
    name: string;
    description: string;
    whatsapp: string;
    instagram: string;
};

type PendingPhoto = { uri: string; mimeType: string; fileName: string };

const EMPTY: FormState = { name: "", description: "", whatsapp: "", instagram: "" };

function orUndefined(value: string) {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
}

export const AdminGuideForm = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { id } = useRoute().params as { id?: string };
    const isEditing = Boolean(id);

    const attractions = useRequest(() => listAttractions(), []);

    const [form, setForm] = useState<FormState>(EMPTY);
    const [selectedIds, setSelectedIds] = useState<string[] | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [pendingPhoto, setPendingPhoto] = useState<PendingPhoto | null>(null);
    // Id do guia criado nesta tela. Se o upload da foto falhar depois de criar,
    // uma nova tentativa atualiza esse guia em vez de criar outro.
    const [createdId, setCreatedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        getGuide(id)
            .then((g) => {
                setForm({
                    name: g.name,
                    description: g.description ?? "",
                    whatsapp: g.whatsapp,
                    instagram: g.instagram ?? "",
                });
                setSelectedIds(g.attractionIds);
                setPhotoUrl(g.photoUrl);
            })
            .catch((err) => setError(errorMessage(err)))
            .finally(() => setLoading(false));
    }, [id]);

    // Na criação, todas as atrações começam marcadas assim que a lista chega.
    useEffect(() => {
        if (!isEditing && selectedIds === null && attractions.data) {
            setSelectedIds(attractions.data.map((a) => a.id));
        }
    }, [isEditing, selectedIds, attractions.data]);

    const set = (field: keyof FormState) => (value: string) => setForm((f) => ({ ...f, [field]: value }));

    async function pickPhoto() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            setError("Permissão para acessar as fotos negada.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], quality: 0.8, allowsEditing: true, aspect: [1, 1] });
        if (result.canceled || result.assets.length === 0) return;
        const asset = result.assets[0];
        const mimeType = asset.mimeType ?? "image/jpeg";
        setPendingPhoto({ uri: asset.uri, mimeType, fileName: asset.fileName ?? `foto.${mimeType.split("/")[1] ?? "jpg"}` });
    }

    async function handleSave() {
        const input: GuideInput = {
            name: form.name.trim(),
            description: orUndefined(form.description),
            whatsapp: form.whatsapp.trim(),
            instagram: orUndefined(form.instagram),
            attractionIds: selectedIds ?? [],
        };

        setSaving(true);
        setError(null);
        setFieldErrors({});
        try {
            const targetId = id ?? createdId;
            const saved = targetId ? await updateGuide(targetId, input) : await createGuide(input);
            setCreatedId(saved.id);
            if (pendingPhoto) {
                await uploadGuidePhoto(saved.id, pendingPhoto.uri, pendingPhoto.mimeType, pendingPhoto.fileName);
            }
            navigation.goBack();
        } catch (err) {
            if (err instanceof ApiError && err.details.length > 0) {
                setFieldErrors(Object.fromEntries(err.details.map((d) => [d.path, d.message])));
            } else {
                setError(errorMessage(err));
            }
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Theme.colors.primary500} />
            </View>
        );
    }

    const avatarUri = pendingPhoto?.uri ?? (photoUrl ? imageUrl(photoUrl) : null);

    return (
        <View style={styles.screen}>
            <ScreenHeader title={isEditing ? "Editar guia" : "Novo guia"} />
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <View style={styles.avatarRow}>
                    <View style={styles.avatar}>
                        {avatarUri ? (
                            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                        ) : (
                            <Feather name="user" size={36} color="#A9A9B8" />
                        )}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button title={avatarUri ? "Trocar foto" : "Escolher foto"} variant="outline" onPress={pickPhoto} />
                        {fieldErrors.file && <Text style={styles.errorText}>{fieldErrors.file}</Text>}
                    </View>
                </View>

                <Input label="Nome" value={form.name} onChangeText={set("name")} error={fieldErrors.name} />
                <Input label="Descrição" value={form.description} onChangeText={set("description")} multiline placeholder="Guia de trilhas há 10 anos" error={fieldErrors.description} />
                <Input label="WhatsApp" value={form.whatsapp} onChangeText={set("whatsapp")} keyboardType="phone-pad" placeholder="+55 (86) 99999-0000" error={fieldErrors.whatsapp} />
                <Input label="Instagram" value={form.instagram} onChangeText={set("instagram")} autoCapitalize="none" placeholder="@usuario" error={fieldErrors.instagram} />

                {attractions.loading && <ActivityIndicator color={Theme.colors.primary500} />}
                {attractions.error && <Text style={styles.errorText}>{attractions.error}</Text>}
                {attractions.data && (
                    <Checklist
                        label="Atrações em que atua"
                        items={attractions.data.map((a) => ({ id: a.id, label: a.name }))}
                        selected={selectedIds ?? []}
                        onChange={setSelectedIds}
                        error={fieldErrors.attractionIds}
                    />
                )}

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Button title="Salvar" onPress={handleSave} loading={saving} disabled={attractions.loading} />
            </ScrollView>
        </View>
    );
};
