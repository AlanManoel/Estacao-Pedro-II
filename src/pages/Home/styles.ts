import { Theme } from "@/shared/Themes";
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 36,
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 48,
    },
    containerLogo: {
        flex: 1,
        flexDirection: "row",
        gap: 12,
    },
    headerButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
    },
    feedback: {
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 20,
    },
    feedbackText: {
        fontFamily: Theme.fonts.poppinsRegular,
        fontSize: Theme.fontSize.body,
        color: Theme.colors.neutralBlack,
        textAlign: "center",
    },
    title: {
        fontSize: Theme.fontSize.body,
        fontFamily: Theme.fonts.poppinsRegular,
        lineHeight: 18,
    },
    subtitle: {
        fontSize: Theme.fontSize.h6,
        fontFamily: Theme.fonts.poppinsBold
    },
    description: {
        fontFamily: Theme.fonts.poppinsBold,
        fontSize: Theme.fontSize.h5,
        marginBottom: 20
    },
    categoriesContaine: {
        gap: 8,
        paddingHorizontal: 20
    },
    containerCards: {
        marginTop: 20,
        alignItems: "center",
        gap: 12,
        marginBottom: 40
    }
});
