import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { errorMessage } from "@/hooks/useRequest";
import { ApiError } from "@/services/api";
import {
    createAttraction,
    getAttraction,
    updateAttraction,
    type AttractionInput,
    type AttractionType,
    type TrailLevel,
} from "@/services/attractionsApi";
import { Button } from "@/shared/Components/Button";
import { ChipSelect } from "@/shared/Components/ChipSelect";
import { Input } from "@/shared/Components/Input";
import { ScreenHeader } from "@/shared/Components/ScreenHeader";
import { Theme } from "@/shared/Themes";
import { adminStyles as styles } from "../styles";

type FormState = {
    name: string;
    description: string;
    latitude: string;
    longitude: string;
    tips: string;
    howToGet: string;
    trailDistance: string;
    trailTime: string;
    trailLevel: TrailLevel | null;
    openingHours: string;
    price: string;
};

const EMPTY: FormState = {
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    tips: "",
    howToGet: "",
    trailDistance: "",
    trailTime: "",
    trailLevel: null,
    openingHours: "",
    price: "",
};

const TYPE_OPTIONS = [
    { value: "CACHOEIRA" as const, label: "Cachoeira" },
    { value: "PONTO_TURISTICO" as const, label: "Ponto turístico" },
];

const LEVEL_OPTIONS = [
    { value: "FACIL" as const, label: "Fácil" },
    { value: "MEDIA" as const, label: "Média" },
    { value: "DIFICIL" as const, label: "Difícil" },
];

function orUndefined(value: string) {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
}

function toInput(type: AttractionType, form: FormState): AttractionInput {
    const base: AttractionInput = {
        name: form.name.trim(),
        description: form.description.trim(),
        latitude: Number(form.latitude.replace(",", ".")),
        longitude: Number(form.longitude.replace(",", ".")),
        tips: orUndefined(form.tips),
        howToGet: orUndefined(form.howToGet),
    };
    if (type === "CACHOEIRA") {
        return {
            ...base,
            trailDistance: form.trailDistance.trim(),
            trailTime: form.trailTime.trim(),
            trailLevel: form.trailLevel ?? undefined,
        };
    }
    return { ...base, openingHours: orUndefined(form.openingHours), price: orUndefined(form.price) };
}

export const AdminAttractionForm = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { id } = useRoute().params as { id?: string };
    const isEditing = Boolean(id);

    const [type, setType] = useState<AttractionType | null>(null);
    const [form, setForm] = useState<FormState>(EMPTY);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        getAttraction(id)
            .then((a) => {
                setType(a.type);
                setForm({
                    name: a.name,
                    description: a.description,
                    latitude: String(a.latitude),
                    longitude: String(a.longitude),
                    tips: a.tips ?? "",
                    howToGet: a.howToGet ?? "",
                    trailDistance: a.trailDistance ?? "",
                    trailTime: a.trailTime ?? "",
                    trailLevel: a.trailLevel,
                    openingHours: a.openingHours ?? "",
                    price: a.price ?? "",
                });
            })
            .catch((err) => setError(errorMessage(err)))
            .finally(() => setLoading(false));
    }, [id]);

    const set = (field: keyof FormState) => (value: string) => setForm((f) => ({ ...f, [field]: value }));

    async function handleSave() {
        if (!type) {
            setFieldErrors({ type: "Escolha o tipo" });
            return;
        }
        setSaving(true);
        setError(null);
        setFieldErrors({});
        try {
            const input = toInput(type, form);
            if (id) {
                await updateAttraction(id, input);
                navigation.goBack();
            } else {
                const created = await createAttraction(type, input);
                navigation.replace("AdminPhotos", { kind: "attraction", id: created.id });
            }
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

    return (
        <View style={styles.screen}>
            <ScreenHeader title={isEditing ? "Editar atração" : "Nova atração"} />
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <ChipSelect
                    label="Tipo"
                    options={TYPE_OPTIONS}
                    value={type}
                    onChange={setType}
                    disabled={isEditing}
                    error={fieldErrors.type}
                />
                <Input label="Nome" value={form.name} onChangeText={set("name")} error={fieldErrors.name} />
                <Input
                    label="Descrição"
                    value={form.description}
                    onChangeText={set("description")}
                    multiline
                    error={fieldErrors.description}
                />
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Input
                            label="Latitude"
                            value={form.latitude}
                            onChangeText={set("latitude")}
                            keyboardType="numbers-and-punctuation"
                            placeholder="-4.4265"
                            error={fieldErrors.latitude}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input
                            label="Longitude"
                            value={form.longitude}
                            onChangeText={set("longitude")}
                            keyboardType="numbers-and-punctuation"
                            placeholder="-41.4594"
                            error={fieldErrors.longitude}
                        />
                    </View>
                </View>
                <Input label="Dicas e cuidados" value={form.tips} onChangeText={set("tips")} multiline error={fieldErrors.tips} />
                <Input label="Como chegar" value={form.howToGet} onChangeText={set("howToGet")} multiline error={fieldErrors.howToGet} />

                {type === "CACHOEIRA" && (
                    <>
                        <Input label="Distância da trilha" value={form.trailDistance} onChangeText={set("trailDistance")} placeholder="2,3km" error={fieldErrors.trailDistance} />
                        <Input label="Tempo da trilha" value={form.trailTime} onChangeText={set("trailTime")} placeholder="45min" error={fieldErrors.trailTime} />
                        <ChipSelect
                            label="Nível"
                            options={LEVEL_OPTIONS}
                            value={form.trailLevel}
                            onChange={(level) => setForm((f) => ({ ...f, trailLevel: level }))}
                            error={fieldErrors.trailLevel}
                        />
                    </>
                )}

                {type === "PONTO_TURISTICO" && (
                    <>
                        <Input label="Horário" value={form.openingHours} onChangeText={set("openingHours")} placeholder="08:00 às 17:00" error={fieldErrors.openingHours} />
                        <Input label="Preço" value={form.price} onChangeText={set("price")} placeholder="Entrada gratuita" error={fieldErrors.price} />
                    </>
                )}

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Button title={isEditing ? "Salvar" : "Criar e adicionar fotos"} onPress={handleSave} loading={saving} />
            </ScrollView>
        </View>
    );
};
