import { StyleSheet } from "react-native";

import { Theme } from "@/shared/Themes";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingTop: 24,
        paddingBottom: 12,
        gap: 8,
    },
    back: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        flex: 1,
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h6,
        color: Theme.colors.neutralBlack,
    },
    right: {
        minWidth: 44,
        alignItems: "flex-end",
    },
});
