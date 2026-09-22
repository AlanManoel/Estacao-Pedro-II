import { StyleSheet } from "react-native";

import { Theme } from "@/shared/Themes";

export const authFormStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
        gap: 24,
    },
    title: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h5,
        color: Theme.colors.neutralBlack,
    },
    form: {
        gap: 16,
    },
    error: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.button,
        color: "#C62828",
    },
});
