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
import { formatPeriod, listEvents } from '@/services/eventsApi';
import { Theme } from '@/shared/Themes';

import { styles } from './styles';
import { Images } from '@/shared/Assets';
import { Button } from '@/shared/Components/Button';
import { Chip } from '@/shared/Components/Chip';
import { Card } from '@/shared/Components/Card';
import { categories } from "@/data/categories"

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
    const isEvents = selectedCategory === "Eventos";

    const attractions = useRequest(
        () => (type ? listAttractions(type) : Promise.resolve([])),
        [type],
    );
    const events = useRequest(
        () => (isEvents ? listEvents() : Promise.resolve([])),
        [isEvents],
    );

    const active = type ? attractions : isEvents ? events : null;
    const isEmpty = active !== null && !active.loading && !active.error && active.data?.length === 0;

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
                            onPress={() => navigation.navigate("AdminMenu")}
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
                {active?.loading && (
                    <ActivityIndicator size="large" color={Theme.colors.primary500} />
                )}

                {active?.error && (
                    <View style={styles.feedback}>
                        <Text style={styles.feedbackText}>{active.error}</Text>
                        <Button title="Tentar de novo" variant="outline" onPress={active.reload} />
                    </View>
                )}

                {isEmpty && (
                    <Text style={styles.feedbackText}>
                        {isEvents ? "Nenhum evento programado." : "Nenhuma atração cadastrada ainda."}
                    </Text>
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

                {isEvents && events.data?.map(item => (
                    <Card
                        key={item.id}
                        image={item.coverUrl ? { uri: imageUrl(item.coverUrl) } : undefined}
                        title={item.name}
                        date={formatPeriod(item.startsAt, item.endsAt)}
                        buttonText="Ver detalhes do evento"
                        onPress={() => navigation.navigate("EventDetails", { id: item.id })}
                    />
                ))}

                {active === null && (
                    <Text style={styles.feedbackText}>Em breve.</Text>
                )}
            </View>
        </ScrollView>
    );
}
