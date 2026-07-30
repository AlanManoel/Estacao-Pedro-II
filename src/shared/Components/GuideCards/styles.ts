import { Theme } from "@/shared/Themes";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    card: {
        marginTop: 8,
        justifyContent: "space-between",
        paddingHorizontal: 16,
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: Theme.colors.neutralWhite,
        height: 100,
        width: 340,
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
    imageCard: {
        height: 52,
        width: 52,
        borderRadius: 100
    },
    nameCard: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.body,
        maxWidth: 80
    },
    containterPrimaryCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        justifyContent: "center"
    },
    containterIcons:{
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})