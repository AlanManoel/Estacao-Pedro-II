import { Image, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { styles } from "./styles";

type Props = {
    image: any;
    title: string;
    distance: string;
    time: string;
    level: string;
    onPress: () => void;
};

export const Card = ({ image, title, distance, time, level, onPress }: Props) => {
    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>

                <Image source={image} style={styles.image} />

                <View style={styles.badge}>

                    <MaterialCommunityIcons
                        name="signal"
                        size={14}
                        color="white"
                    />
                    <Text style={styles.badgeText}>
                        {level}
                    </Text>

                </View>

            </View>

            <View style={styles.content}>

                <Text style={styles.title}>
                    {title}
                </Text>

                <View style={styles.info}>

                    <View style={styles.infoItem}>
                        <Feather
                            name="map"
                            size={16}
                            color="#0087F7"
                        />
                        <Text style={styles.infoText}>
                            {distance}
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Feather
                            name="clock"
                            size={16}
                            color="#0087F7"
                        />
                        <Text style={styles.infoText}>
                            {time}
                        </Text>
                    </View>

                </View>

                <View style={styles.footer}>

                    <TouchableOpacity onPress={onPress}>
                        <Text style={styles.link}>
                            Ver detalhes da trilha
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
                    >
                        <Feather
                            name="arrow-right"
                            size={20}
                            color="#F3F0FA"
                        />
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}
