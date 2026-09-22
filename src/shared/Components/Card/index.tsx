import { Image, Text, TouchableOpacity, View, type ImageSourcePropType } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

import { styles } from "./styles";

type Props = {
    image?: ImageSourcePropType;
    title: string;
    distance?: string;
    time?: string;
    date?: string,
    level?: string;
    price?: string;
    address?: string;
    buttonText?: string;
    onPress: () => void;
};

export const Card = ({ image, title, distance, time, date, buttonText, level, price, address, onPress }: Props) => {
    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>

                {image ? (
                    <Image source={image} style={styles.image} />
                ) : (
                    <View style={[styles.image, styles.imagePlaceholder]}>
                        <Feather name="image" size={40} color="#A9A9B8" />
                    </View>
                )}

                {level && (
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
                )}

            </View>

            <View style={styles.content}>

                <Text style={styles.title}>
                    {title}
                </Text>

                <View style={styles.info}>

                    {distance && (
                        <View style={styles.infoItem}>
                            <Feather name="map" size={16} color="#0087F7" />
                            <Text style={styles.infoText}>{distance}</Text>
                        </View>
                    )}

                    {time && (
                        <View style={styles.infoItem}>
                            <Feather name="clock" size={16} color="#0087F7" />
                            <Text style={styles.infoText}>{time}</Text>
                        </View>
                    )}
                    
                    {date && (
                        <View style={styles.infoItem}>
                            <MaterialIcons name="date-range" size={24} color="#0087F7" />
                            <Text style={styles.infoText}>{date}</Text>
                        </View>
                    )}

                    {price && (
                        <View style={styles.infoItem}>
                            <Feather name="dollar-sign" size={16} color="#0087F7" />
                            <Text style={styles.infoText}>{price}</Text>
                        </View>
                    )}

                    {address && (
                        <View style={[styles.infoItem, { flexShrink: 1 }]}>
                            <Feather name="map-pin" size={16} color="#0087F7" />
                            <Text style={[styles.infoText, { flexShrink: 1 }]} numberOfLines={1}>{address}</Text>
                        </View>
                    )}

                </View>


                <View style={styles.footer}>

                    <TouchableOpacity onPress={onPress}>
                        <Text style={styles.link}>
                            {buttonText}
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
