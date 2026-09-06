import { StyleSheet } from "react-native";

import { Theme } from "@/shared/Themes";

export const styles = StyleSheet.create({
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
    mapContainer: {
        position: "relative",
    },
    map: {
        width: "100%",
        height: 320,
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 120,
    },
    buttonBack: {
        position: "absolute",
        left: 20,
        top: 40,
        zIndex: 10,
        height: 48,
        width: 48,
        backgroundColor: Theme.colors.primary500,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        marginTop: 20,
        marginBottom: 40,
        paddingHorizontal: 20,
        gap: 24,
    },
    title: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h3,
        color: Theme.colors.neutralBlack,
        lineHeight: 40,
    },
    photosContainer: {
        gap: 12,
    },
    photo: {
        width: 311,
        height: 311,
        borderRadius: 5,
    },
    trailCards: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 24,
    },
    trailCard: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: Theme.colors.neutralWhite,
        height: 100,
        width: 100,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.7)",
        shadowColor: "#A9A9B8",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 6,
    },
    trailCardLabel: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.caption,
    },
    trailCardValue: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h6,
        textAlign: "center",
        lineHeight: 26,
    },
    sectionTitle: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h6,
    },
    sectionText: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.body,
    },
});
