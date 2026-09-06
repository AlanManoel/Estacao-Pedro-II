import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native"
import { TSScreenDefinitionsProps } from "@/AppRoutes";
import { useAuth } from '@/contexts/AuthContext';
import { useRequest } from '@/hooks/useRequest';
import {
    imageUrl,
    listAttractions,
    TRAIL_LEVEL_LABEL,
    type AttractionType,
} from '@/services/attractionsApi';
import { Theme } from '@/shared/Themes';

import { styles } from './styles';
import { Images } from '@/shared/Assets';
import { Button } from '@/shared/Components/Button';
import { Chip } from '@/shared/Components/Chip';
import { Card } from '@/shared/Components/Card';
import { categories } from "@/data/categories"
import { events } from '@/data/event';

const CATEGORY_TYPE: Record<string, AttractionType | undefined> = {
    "Cachoeiras": "CACHOEIRA",
    "Pontos turísticos": "PONTO_TURISTICO",
};

export const Home = () => {

    const navigation = useNavigation<TSScreenDefinitionsProps>();
    const { user, signOut } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const type = CATEGORY_TYPE[selectedCategory];

    const attractions = useRequest(
        () => (type ? listAttractions(type) : Promise.resolve([])),
        [type],
    );

    return (
        <ScrollView>
            <View style={styles.container}>

                <View style={styles.header}>

                    <View style={styles.containerLogo}>
                        <Image source={Images.logoBlue} />
                        <View>
                            <Text style={styles.title}>Bem vindo(a){user ? `, ${user.name}` : ""}</Text>
                            <Text style={styles.subtitle}>Estação Pedro II</Text>
                        </View>
                    </View>

                    {isAdmin && (
                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={() => navigation.navigate("AdminAttractions")}
                            accessibilityLabel="Administração"
                        >
                            <Feather name="settings" size={22} color={Theme.colors.primary500} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.headerButton} onPress={signOut} accessibilityLabel="Sair">
                        <Feather name="log-out" size={22} color={Theme.colors.primary500} />
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
                {type && attractions.loading && (
                    <ActivityIndicator size="large" color={Theme.colors.primary500} />
                )}

                {type && attractions.error && (
                    <View style={styles.feedback}>
                        <Text style={styles.feedbackText}>{attractions.error}</Text>
                        <Button title="Tentar de novo" variant="outline" onPress={attractions.reload} />
                    </View>
                )}

                {type && !attractions.loading && !attractions.error && attractions.data?.length === 0 && (
                    <Text style={styles.feedbackText}>Nenhuma atração cadastrada ainda.</Text>
                )}

                {type && attractions.data?.map(item => (
                    <Card
                        key={item.id}
                        image={item.coverUrl ? { uri: imageUrl(item.coverUrl) } : undefined}
                        title={item.name}
                        distance={item.trailDistance ?? undefined}
                        time={item.trailTime ?? undefined}
                        level={item.trailLevel ? TRAIL_LEVEL_LABEL[item.trailLevel] : undefined}
                        buttonText={type === "CACHOEIRA" ? "Ver detalhes da trilha" : "Ver detalhes do ponto turístico"}
                        onPress={() => navigation.navigate("AttractionDetails", { id: item.id })}
                    />
                ))}

                {selectedCategory === "Eventos" && events.map(item => (
                    <Card
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        date={item.date}
                        buttonText="Ver detalhes dos eventos"
                        onPress={() => {}}
                    />
                ))}

                {!type && selectedCategory !== "Eventos" && (
                    <Text style={styles.feedbackText}>Em breve.</Text>
                )}
            </View>
        </ScrollView>
    );
}
