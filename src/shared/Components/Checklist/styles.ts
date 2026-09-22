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
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 8,
    },
    itemLabel: {
        flex: 1,
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.body,
        color: Theme.colors.neutralBlack,
    },
    empty: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.caption,
        color: "#6B6B7B",
    },
    error: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.caption,
        color: "#C62828",
    },
});
