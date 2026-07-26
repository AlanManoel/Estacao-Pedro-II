import { Text, TouchableOpacity } from "react-native"
import { styles } from "./styles"



type Props = {
    title: string,
    selected: boolean,
    onPress: () => void,
}

export const Chip = ({ title, selected = false, onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={selected ? styles.containerSelected : styles.container}
        >
            <Text style={selected ? styles.textSelected : styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
