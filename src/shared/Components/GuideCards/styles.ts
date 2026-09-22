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
        width: "100%",
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
    imagePlaceholder: {
        backgroundColor: "#E4E2EC",
        alignItems: "center",
        justifyContent: "center",
    },
    texts: {
        flex: 1,
        gap: 2,
    },
    nameCard: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.body,
    },
    descriptionCard: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.caption,
        color: "#6B6B7B",
    },
    containterPrimaryCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        justifyContent: "flex-start"
    },
    containterIcons:{
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})