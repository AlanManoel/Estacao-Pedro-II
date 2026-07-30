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

export const Home = () => {

    const navigation = useNavigation<TSScreenDefinitionsProps>();

    const [isDark, setIsDark] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(
        categories[0]
    );

    function toggleDark() {
        //Função de mudar o icone de lua para sol 
        setIsDark(!isDark);
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

                    <TouchableOpacity onPress={toggleDark}>
                        {isDark ? (
                            <Feather name="sun" size={36} color="black" />
                        ) : (
                            <FontAwesome name="moon-o" size={40} color="#171717" />
                        )}
                    </TouchableOpacity>

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

                {waterfalls.map(tourism => (
                    <Card
                        key={tourism.id}
                        image={tourism.image}
                        title={tourism.name}
                        distance={tourism.distance}
                        time={tourism.time}
                        level={tourism.level}
                        onPress={() =>
                            navigation.navigate("DetailsWaterfall", { id: tourism.id })
                        }
                    />
                ))}

            </View>
        </ScrollView>
    );
}
