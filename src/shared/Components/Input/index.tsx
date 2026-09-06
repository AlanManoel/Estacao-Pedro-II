import { Text, TextInput, View, type TextInputProps } from "react-native";

import { styles } from "./styles";

type Props = TextInputProps & {
    label: string;
};

export const Input = ({ label, ...inputProps }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} placeholderTextColor="#9A9AA8" {...inputProps} />
        </View>
    );
};
