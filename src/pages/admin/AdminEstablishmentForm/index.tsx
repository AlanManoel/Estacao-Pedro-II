import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { errorMessage } from "@/hooks/useRequest";
import { ApiError } from "@/services/api";
import {
    createEstablishment,
    getEstablishment,
    updateEstablishment,
    type EstablishmentInput,
    type EstablishmentType,
    type PriceRange,
} from "@/services/establishmentsApi";
import { Button } from "@/shared/Components/Button";
import { ChipSelect } from "@/shared/Components/ChipSelect";
import { Input } from "@/shared/Components/Input";
import { ScreenHeader } from "@/shared/Components/ScreenHeader";
import { Theme } from "@/shared/Themes";
import { adminStyles as styles } from "../styles";

type FormState = {
    name: string;
    description: string;
    address: string;
    latitude: string;
    longitude: string;
    whatsapp: string;
    instagram: string;
    openingHours: string;
    priceRange: PriceRange | null;
    highlights: string;
};

const EMPTY: FormState = {
    name: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
    whatsapp: "",
    instagram: "",
    openingHours: "",
    priceRange: null,
    highlights: "",
};

const TYPE_OPTIONS = [
    { value: "HOSPEDAGEM" as const, label: "Hospedagem" },
    { value: "RESTAURANTE" as const, label: "Restaurante" },
];

const PRICE_OPTIONS = [
    { value: "BAIXO" as const, label: "$" },
    { value: "MEDIO" as const, label: "$$" },
    { value: "ALTO" as const, label: "$$$" },
];

function orUndefined(value: string) {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
}

export const AdminEstablishmentForm = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { id } = useRoute().params as { id?: string };
    const isEditing = Boolean(id);

    const [type, setType] = useState<EstablishmentType | null>(null);
    const [form, setForm] = useState<FormState>(EMPTY);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        getEstablishment(id)
            .then((e) => {
                setType(e.type);
                setForm({
                    name: e.name,
                    description: e.description,
                    address: e.address,
                    latitude: String(e.latitude),
                    longitude: String(e.longitude),
                    whatsapp: e.whatsapp,
                    instagram: e.instagram ?? "",
                    openingHours: e.openingHours ?? "",
                    priceRange: e.priceRange,
                    highlights: e.highlights ?? "",
                });
            })
            .catch((err) => setError(errorMessage(err)))
            .finally(() => setLoading(false));
    }, [id]);

    const set = (field: keyof FormState) => (value: string) => setForm((f) => ({ ...f, [field]: value }));

    async function handleSave() {
        const errors: Record<string, string> = {};
        if (!type) errors.type = "Escolha o tipo";
        if (!form.priceRange) errors.priceRange = "Escolha a faixa de preço";
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        const input: EstablishmentInput = {
            name: form.name.trim(),
            description: form.description.trim(),
            address: form.address.trim(),
            latitude: Number(form.latitude.replace(",", ".")),
            longitude: Number(form.longitude.replace(",", ".")),
            whatsapp: form.whatsapp.trim(),
            instagram: orUndefined(form.instagram),
            openingHours: orUndefined(form.openingHours),
            priceRange: form.priceRange as PriceRange,
            highlights: orUndefined(form.highlights),
        };

        setSaving(true);
        setError(null);
        setFieldErrors({});
        try {
            if (id) {
                await updateEstablishment(id, input);
                navigation.goBack();
            } else {
                const created = await createEstablishment(type as EstablishmentType, input);
                navigation.replace("AdminPhotos", { kind: "establishment", id: created.id });
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
            <ScreenHeader title={isEditing ? "Editar estabelecimento" : "Novo estabelecimento"} />
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <ChipSelect label="Tipo" options={TYPE_OPTIONS} value={type} onChange={setType} disabled={isEditing} error={fieldErrors.type} />
                <Input label="Nome" value={form.name} onChangeText={set("name")} error={fieldErrors.name} />
                <Input label="Descrição" value={form.description} onChangeText={set("description")} multiline error={fieldErrors.description} />
                <Input label="Endereço" value={form.address} onChangeText={set("address")} placeholder="Rua, número, bairro" error={fieldErrors.address} />
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Input label="Latitude" value={form.latitude} onChangeText={set("latitude")} keyboardType="numbers-and-punctuation" placeholder="-4.4247" error={fieldErrors.latitude} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input label="Longitude" value={form.longitude} onChangeText={set("longitude")} keyboardType="numbers-and-punctuation" placeholder="-41.4586" error={fieldErrors.longitude} />
                    </View>
                </View>
                <Input label="WhatsApp" value={form.whatsapp} onChangeText={set("whatsapp")} keyboardType="phone-pad" placeholder="+55 (86) 99999-0000" error={fieldErrors.whatsapp} />
                <Input label="Instagram" value={form.instagram} onChangeText={set("instagram")} autoCapitalize="none" placeholder="@usuario" error={fieldErrors.instagram} />
                <Input label="Horário" value={form.openingHours} onChangeText={set("openingHours")} placeholder="Seg a Sáb, 11h às 22h" error={fieldErrors.openingHours} />
                <ChipSelect
                    label="Faixa de preço"
                    options={PRICE_OPTIONS}
                    value={form.priceRange}
                    onChange={(priceRange) => setForm((f) => ({ ...f, priceRange }))}
                    error={fieldErrors.priceRange}
                />
                <Input label="Destaques" value={form.highlights} onChangeText={set("highlights")} multiline placeholder="Cozinha regional, música ao vivo" error={fieldErrors.highlights} />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Button title={isEditing ? "Salvar" : "Criar e adicionar fotos"} onPress={handleSave} loading={saving} />
            </ScrollView>
        </View>
    );
};
