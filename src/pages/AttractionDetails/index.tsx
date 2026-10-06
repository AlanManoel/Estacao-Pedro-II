
import { ActivityIndicator, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { useRequest } from "@/hooks/useRequest";
import { getAttraction } from "@/services/attractionsApi";
import { Button } from "@/shared/Components/Button";
import { Theme } from "@/shared/Themes";

import { WaterfallDetails } from "./WaterfallDetails";
import { TouristSpotDetails } from "./TouristSpotDetails";

export const AttractionDetails = () => {
    const navigation = useNavigation<TSScreenDefinitionsProps>();

    const { id } = useRoute().params as { id: string };

    const {
        data: attraction,
        loading,
        error,
        reload,
    } = useRequest(() => getAttraction(id), [id]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator
                    size="large"
                    color={Theme.colors.primary500}
                />
            </View>
        );
    }

    if (error || !attraction) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>
                    {error ?? "Atração não encontrada"}
                </Text>

                <Button
                    title="Tentar de novo"
                    variant="outline"
                    onPress={reload}
                />

                <Button
                    title="Voltar"
                    variant="link"
                    onPress={() => navigation.goBack()}
                />
            </View>
        );
    }

    if (attraction.type === "CACHOEIRA") {
        return <WaterfallDetails attraction={attraction} />;
    }

    return <TouristSpotDetails attraction={attraction} />;
};