import { Theme } from "@/shared/Themes";
import { StyleSheet } from "react-native";




export const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.colors.neutralWhite,
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 20,
        shadowColor: Theme.colors.neutralBlack,
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
        width: 348
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: "100%",
        height: 248,
    },
    badge: {
        position: "absolute",
        top: 12,
        left: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: Theme.colors.neutralBlack,
        borderRadius: 20,
    },
    badgeText: {
        color: Theme.colors.neutralWhite,
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.caption,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: Theme.fontSize.h5,
        fontFamily: Theme.fonts.poppinsBold,
        color: Theme.colors.neutralBlack,
    },
    info: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    infoText: {
        fontFamily: Theme.fonts.poppinsRegular,
        color: Theme.colors.neutralBlack,
    },
    footer: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderColor: "#E8E8E8",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    link: {
        color: Theme.colors.primary500,
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.body,
    },
    button: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Theme.colors.primary500,
        justifyContent: "center",
        alignItems: "center",
    },

});