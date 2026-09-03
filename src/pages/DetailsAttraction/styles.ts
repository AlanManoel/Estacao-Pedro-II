import { Theme } from "@/shared/Themes";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    imageContainer: {
        position: "relative",
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
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
    map: {
        width: "100%",
        height: 400,
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
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    subitleTextCard: {
        marginTop: 12,
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.h6
    },
    photosContainer: {
        gap: 12,
    },
    photo: {
        width: 311,
        height: 311,
        borderRadius: 5,
    },
    titleInfo: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h6
    },
    subitleTextInfo: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.body
    },
    containerInfo: {
        marginTop: 24,
        marginBottom: 24,
        gap: 24
    },
})