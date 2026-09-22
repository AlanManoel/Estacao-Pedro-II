import { StyleSheet } from "react-native";

import { Theme } from "@/shared/Themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 48,
        justifyContent: "space-between",
    },
    hero: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },
    title: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h5,
        color: Theme.colors.neutralBlack,
    },
    subtitle: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.body,
        color: Theme.colors.neutralBlack,
        textAlign: "center",
    },
    actions: {
        gap: 12,
    },
});
