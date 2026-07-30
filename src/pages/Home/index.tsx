import { useState } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from "@react-navigation/native"
import { TSScreenDefinitionsProps } from "@/AppRoutes";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';


import { styles } from './styles';
import { Images } from '@/shared/Assets';
import { Chip } from '@/shared/Components/Chip';
import { Card } from '@/shared/Components/Card';
import { categories } from "@/data/categories"
import { waterfalls } from '@/data/waterfalls'
import { touristAttractions } from '@/data/touristAttractions';

export const Home = () => {

    const navigation = useNavigation<TSScreenDefinitionsProps>();


    const [selectedCategory, setSelectedCategory] = useState(
        categories[0]
    );

    let data: any[] = [];
    let buttonText = "";

    if (selectedCategory === "Cachoeiras") {
        data = waterfalls;
        buttonText = "Ver detalhes da trilha";
    } else if (selectedCategory === "Pontos turísticos") {
        data = touristAttractions;
        buttonText = "Ver detalhes do ponto turístico";
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.header}>

                    <View style={styles.containerLogo}>
                        <Image source={Images.logoBlue} />
                        <View>
                            <Text style={styles.title}>Bem vindo(a) ao</Text>
                            <Text style={styles.subtitle}>Estação Pedro II</Text>
                        </View>
                    </View>

                </View>

                <Text style={styles.description}>
                    Explore cultura, natureza ou eventos.
                </Text>

            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContaine}

            >
                {categories.map(category => (
                    <Chip
                        key={category}
                        title={category}
                        selected={selectedCategory === category}
                        onPress={() => setSelectedCategory(category)}
                    />
                ))}
            </ScrollView>

            <View style={styles.containerCards}>
                {data.map(item => (
                    <Card
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        distance={item.distance}
                        time={item.time}
                        level={item.level}
                        buttonText={buttonText}
                        onPress={() =>
                            navigation.navigate("DetailsWaterfall", { id: item.id })
                        }
                    />
                ))}

            </View>
        </ScrollView>
    );
}
