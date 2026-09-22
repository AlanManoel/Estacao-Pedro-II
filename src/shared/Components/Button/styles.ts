import { StyleSheet } from "react-native";

import { Theme } from "@/shared/Themes";

const base = {
    height: 52,
    borderRadius: 26,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingHorizontal: 24,
};

export const styles = StyleSheet.create({
    primary: {
        ...base,
        backgroundColor: Theme.colors.primary500,
    },
    outline: {
        ...base,
        borderWidth: 2,
        borderColor: Theme.colors.primary500,
    },
    link: {
        ...base,
        height: 44,
    },
    disabled: {
        opacity: 0.6,
    },
    textPrimary: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.body,
        color: Theme.colors.neutralWhite,
    },
    textSecondary: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.body,
        color: Theme.colors.primary500,
    },
});
