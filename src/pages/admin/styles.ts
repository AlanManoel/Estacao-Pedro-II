import { StyleSheet } from "react-native";

import { Theme } from "@/shared/Themes";

export const adminStyles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        gap: 16,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: 24,
    },
    feedbackText: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.body,
        color: Theme.colors.neutralBlack,
        textAlign: "center",
    },
    errorText: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.button,
        color: "#C62828",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
    },
    thumb: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: "#E4E2EC",
        alignItems: "center",
        justifyContent: "center",
    },
    listTitle: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.body,
        color: Theme.colors.neutralBlack,
    },
    listSubtitle: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.caption,
        color: "#6B6B7B",
    },
    iconButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
    },
    photoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    photoTile: {
        width: "47%",
        aspectRatio: 1,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#E4E2EC",
    },
    photoImage: {
        width: "100%",
        height: "100%",
    },
    coverBadge: {
        position: "absolute",
        top: 8,
        left: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: Theme.colors.primary500,
    },
    coverBadgeText: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.caption,
        color: Theme.colors.neutralWhite,
    },
});
