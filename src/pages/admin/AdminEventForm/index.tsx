import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { errorMessage } from "@/hooks/useRequest";
import { ApiError } from "@/services/api";
import { createEvent, getEvent, updateEvent, type EventInput } from "@/services/eventsApi";
import { Button } from "@/shared/Components/Button";
import { Input } from "@/shared/Components/Input";
import { ScreenHeader } from "@/shared/Components/ScreenHeader";
import { Theme } from "@/shared/Themes";
import { adminStyles as styles } from "../styles";

type FormState = {
    name: string;
    description: string;
    startsAt: string;
    endsAt: string;
    dateNote: string;
    latitude: string;
    longitude: string;
    address: string;
    tips: string;
};

const EMPTY: FormState = {
    name: "",
    description: "",
    startsAt: "",
    endsAt: "",
    dateNote: "",
    latitude: "",
    longitude: "",
    address: "",
    tips: "",
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function orUndefined(value: string) {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
}

/** "2027-07-01" → ISO no fuso local, início (00:00:00) ou fim (23:59:59) do dia. Devolve null se inválida. */
function toIso(date: string, endOfDay: boolean): string | null {
    if (!DATE_RE.test(date)) return null;
    const value = new Date(`${date}T${endOfDay ? "23:59:59" : "00:00:00"}`);
    return Number.isNaN(value.getTime()) ? null : value.toISOString();
}

/** ISO → "AAAA-MM-DD" no fuso local. */
function toDateInput(iso: string): string {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const AdminEventForm = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { id } = useRoute().params as { id?: string };
    const isEditing = Boolean(id);

    const [form, setForm] = useState<FormState>(EMPTY);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        getEvent(id)
            .then((e) => {
                setForm({
                    name: e.name,
                    description: e.description,
                    startsAt: toDateInput(e.startsAt),
                    endsAt: toDateInput(e.endsAt),
                    dateNote: e.dateNote ?? "",
                    latitude: String(e.latitude),
                    longitude: String(e.longitude),
                    address: e.address ?? "",
                    tips: e.tips ?? "",
                });
            })
            .catch((err) => setError(errorMessage(err)))
            .finally(() => setLoading(false));
    }, [id]);

    const set = (field: keyof FormState) => (value: string) => setForm((f) => ({ ...f, [field]: value }));

    async function handleSave() {
        const startsAt = toIso(form.startsAt, false);
        const endsAt = toIso(form.endsAt, true);
        const dateErrors: Record<string, string> = {};
        if (!startsAt) dateErrors.startsAt = "Use o formato AAAA-MM-DD";
        if (!endsAt) dateErrors.endsAt = "Use o formato AAAA-MM-DD";
        if (Object.keys(dateErrors).length > 0) {
            setFieldErrors(dateErrors);
            return;
        }

        const input: EventInput = {
            name: form.name.trim(),
            description: form.description.trim(),
            startsAt: startsAt as string,
            endsAt: endsAt as string,
            dateNote: orUndefined(form.dateNote),
            latitude: Number(form.latitude.replace(",", ".")),
            longitude: Number(form.longitude.replace(",", ".")),
            address: orUndefined(form.address),
            tips: orUndefined(form.tips),
        };

        setSaving(true);
        setError(null);
        setFieldErrors({});
        try {
            if (id) {
                await updateEvent(id, input);
                navigation.goBack();
            } else {
                const created = await createEvent(input);
                navigation.replace("AdminPhotos", { kind: "event", id: created.id });
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
            <ScreenHeader title={isEditing ? "Editar evento" : "Novo evento"} />
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Input label="Nome" value={form.name} onChangeText={set("name")} error={fieldErrors.name} />
                <Input label="Descrição" value={form.description} onChangeText={set("description")} multiline error={fieldErrors.description} />
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Input label="Início" value={form.startsAt} onChangeText={set("startsAt")} placeholder="2027-07-01" error={fieldErrors.startsAt} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input label="Fim" value={form.endsAt} onChangeText={set("endsAt")} placeholder="2027-07-31" error={fieldErrors.endsAt} />
                    </View>
                </View>
                <Input label="Nota de data" value={form.dateNote} onChangeText={set("dateNote")} placeholder="Todo ano em julho" error={fieldErrors.dateNote} />
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Input label="Latitude" value={form.latitude} onChangeText={set("latitude")} keyboardType="numbers-and-punctuation" placeholder="-4.4247" error={fieldErrors.latitude} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input label="Longitude" value={form.longitude} onChangeText={set("longitude")} keyboardType="numbers-and-punctuation" placeholder="-41.4586" error={fieldErrors.longitude} />
                    </View>
                </View>
                <Input label="Endereço" value={form.address} onChangeText={set("address")} placeholder="Centro, Pedro II" error={fieldErrors.address} />
                <Input label="Dicas" value={form.tips} onChangeText={set("tips")} multiline error={fieldErrors.tips} />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Button title={isEditing ? "Salvar" : "Criar e adicionar fotos"} onPress={handleSave} loading={saving} />
            </ScrollView>
        </View>
    );
};
