import { StyleSheet } from "react-native";

import { Theme } from "@/shared/Themes";

export const styles = StyleSheet.create({
    container: {
        gap: 6,
    },
    label: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.button,
        color: Theme.colors.neutralBlack,
    },
    chips: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    disabled: {
        opacity: 0.6,
    },
    error: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.caption,
        color: "#C62828",
    },
});
