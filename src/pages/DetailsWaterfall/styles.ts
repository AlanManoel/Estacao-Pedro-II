import { Theme } from "@/shared/Themes";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    imageContainer: {
        position: "relative",
    },
    image: {
        width: "100%",
        height: 400,
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 120,
    },
    title: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h3,
        color: Theme.colors.neutralBlack,
        lineHeight: 40,
        maxWidth: 340,
    },
    containerDescription: {
        marginTop: 20,
        marginBottom: 40,
        paddingHorizontal: 20,
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
        justifyContent: "center"
    },
    containerCards: {
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 24
    },
    cardsInfo: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: Theme.colors.neutralWhite,
        height: 100,
        width: 100,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.7)",
        shadowColor: "#A9A9B8",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 6,
    },
    subitleTextCard: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.caption
    },
    textCard: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h5,
        textAlign: "center",
        lineHeight: 28
    },
    containerInfo: {
        marginTop: 24,
        marginBottom: 24,
        gap: 24
    },
    titleInfo: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h6
    },
    subitleTextInfo: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.body
    }
})