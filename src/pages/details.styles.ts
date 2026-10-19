import { StyleSheet } from "react-native";

import { Theme } from "@/shared/Themes";

export const detailsStyles = StyleSheet.create({
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
    period: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.body,
        color: Theme.colors.primary500,
    },

    periodNote: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.button,
        color: Theme.colors.neutralBlack,
    },

    imageContainer: {
        height: 470,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#F3F0FA",
    },

    imageLabel: {
        position: "absolute",
        top: 12,
        left: 25,
        zIndex: 10,
        fontSize: 12,
        color: "#555",
    },

    mainPhoto: {
        width: "100%",
        height: 470,
        resizeMode: "cover",
    },

    thumbnailContainer: {
        position: "absolute",
        right: 25,
        bottom: 50,
        gap: 8,
        zIndex: 20,
    },

    thumbnail: {
        width: 72,
        height: 72,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: "#0087F7",
    },

    imageGradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 230,
        zIndex: 5,
    },

    singlePhotoContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    singlePhoto: {
        width: "100%",
        height: 300,
    },
    maker: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF6424",
        width: 32,
        height: 32,
        borderRadius: 19,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
    textMaps:{
        position: "absolute",
        bottom: 0,
        right: 8,
        fontSize: 10,
        color: "#373840",
        backgroundColor: "rgba(243,240,250,0.9)",
        paddingHorizontal: 5,
        paddingVertical: 3,
    }
});
