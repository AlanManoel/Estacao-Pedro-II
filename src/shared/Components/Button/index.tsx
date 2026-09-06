import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { Theme } from "@/shared/Themes";
import { styles } from "./styles";

type Props = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "outline" | "link";
    loading?: boolean;
    disabled?: boolean;
};

export const Button = ({ title, onPress, variant = "primary", loading = false, disabled = false }: Props) => {
    const isPrimary = variant === "primary";
    const containerStyle =
        variant === "primary" ? styles.primary : variant === "outline" ? styles.outline : styles.link;
    const textStyle = isPrimary ? styles.textPrimary : styles.textSecondary;

    return (
        <TouchableOpacity
            style={[containerStyle, (disabled || loading) && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? Theme.colors.neutralWhite : Theme.colors.primary500} />
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};
