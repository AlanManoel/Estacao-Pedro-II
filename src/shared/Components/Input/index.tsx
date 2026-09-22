import { Text, TextInput, View, type TextInputProps } from "react-native";

import { styles } from "./styles";

type Props = TextInputProps & {
    label: string;
    error?: string;
};

export const Input = ({ label, error, style, ...inputProps }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, inputProps.multiline && styles.multiline, error && styles.inputError, style]}
                placeholderTextColor="#9A9AA8"
                {...inputProps}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};
