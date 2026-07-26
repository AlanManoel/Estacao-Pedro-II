import { Theme } from "@/shared/Themes";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        borderColor: Theme.colors.primary500,
        borderWidth: 2,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 18,
        
    },
    text: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.button,
        color: Theme.colors.primary500
    },
    containerSelected: {
        alignSelf: "flex-start",
        borderWidth: 2,
        borderColor: Theme.colors.primary500,
        backgroundColor: Theme.colors.primary500,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 18,
    },
    textSelected: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.button,
        color: Theme.colors.neutralWhite
    },
})