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
    input: {
        height: 52,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#D9D9E3",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.body,
        color: Theme.colors.neutralBlack,
    },
});
