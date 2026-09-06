import { Text, View } from "react-native";

import { Chip } from "@/shared/Components/Chip";
import { styles } from "./styles";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
    label: string;
    options: Option<T>[];
    value: T | null;
    onChange: (value: T) => void;
    disabled?: boolean;
    error?: string;
};

export function ChipSelect<T extends string>({ label, options, value, onChange, disabled = false, error }: Props<T>) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.chips, disabled && styles.disabled]}>
                {options.map((option) => (
                    <Chip
                        key={option.value}
                        title={option.label}
                        selected={option.value === value}
                        onPress={() => !disabled && onChange(option.value)}
                    />
                ))}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}
