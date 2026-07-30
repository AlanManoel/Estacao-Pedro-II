import { Image, Text, View } from "react-native"

import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { styles } from "./styles";


type Props = {
    image: any;
    name: string;
}
export const GuideCards = ({ image, name }: Props) => {
    return (
        <View style={styles.card}>
            <View style={styles.containterPrimaryCard}>
                <Image style={styles.imageCard} source={image} />
                <Text style={styles.nameCard}>{name}</Text>
            </View>
            <View style={styles.containterIcons}>
                <FontAwesome5 name="whatsapp" size={40} color="#171717" />
                <Entypo name="instagram" size={36} color="#171717" />
            </View>
        </View>
    )
}