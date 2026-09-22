import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Theme } from "@/shared/Themes";
import { styles } from "./styles";

type Item = { id: string; label: string };

type Props = {
    label: string;
    items: Item[];
    selected: string[];
    onChange: (ids: string[]) => void;
    error?: string;
};

export const Checklist = ({ label, items, selected, onChange, error }: Props) => {
    function toggle(id: string) {
        onChange(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {items.map((item) => {
                const checked = selected.includes(item.id);
                return (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.row}
                        onPress={() => toggle(item.id)}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked }}
                    >
                        <Feather
                            name={checked ? "check-square" : "square"}
                            size={22}
                            color={checked ? Theme.colors.primary500 : "#A9A9B8"}
                        />
                        <Text style={styles.itemLabel}>{item.label}</Text>
                    </TouchableOpacity>
                );
            })}
            {items.length === 0 && <Text style={styles.empty}>Nenhuma atração cadastrada.</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};
