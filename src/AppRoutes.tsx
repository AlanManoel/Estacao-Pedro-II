import { createStackNavigator, type StackNavigationProp } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@/contexts/AuthContext';
import { Home } from './pages/Home';
import { AttractionDetails } from './pages/AttractionDetails';
import { EventDetails } from './pages/EventDetails';
import { AdminMenu } from './pages/admin/AdminMenu';
import { AdminAttractions } from './pages/admin/AdminAttractions';
import { AdminAttractionForm } from './pages/admin/AdminAttractionForm';
import { AdminPhotos } from './pages/admin/AdminPhotos';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminEventForm } from './pages/admin/AdminEventForm';
import { AdminGuides } from './pages/admin/AdminGuides';
import { AdminGuideForm } from './pages/admin/AdminGuideForm';
import { Welcome } from './pages/Welcome';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Theme } from './shared/Themes';



type TScreenDefinitions = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Home: undefined;
    AttractionDetails: { id: string };
    EventDetails: { id: string };
    AdminMenu: undefined;
    AdminAttractions: undefined;
    AdminAttractionForm: { id?: string };
    AdminPhotos: { kind: "attraction" | "event"; id: string };
    AdminEvents: undefined;
    AdminEventForm: { id?: string };
    AdminGuides: undefined;
    AdminGuideForm: { id?: string };
}

const Stack = createStackNavigator<TScreenDefinitions>();

const navigationTheme = {
    ...DefaultTheme,
    fonts: {
        ...DefaultTheme.fonts,
        regular: {
            fontFamily: Theme.fonts.poppinsRegular,
            fontWeight: "400" as const
        },
        bold: {
            fontFamily: Theme.fonts.poppinsBold,
            fontWeight: "700" as const
        }
    },
    colors: {
        ...DefaultTheme.colors,
        background: Theme.colors.neutralWhite,
        primary: Theme.colors.primary500,
        text: Theme.colors.neutralBlack
    }
};

export function AppRoutes() {
    const { user, isGuest, isLoading } = useAuth();

    if (isLoading) return null;

    const hasSession = user !== null || isGuest;

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {hasSession ? (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="AttractionDetails" component={AttractionDetails} />
                        <Stack.Screen name="EventDetails" component={EventDetails} />
                        {user?.role === "ADMIN" && (
                            <>
                                <Stack.Screen name="AdminMenu" component={AdminMenu} />
                                <Stack.Screen name="AdminAttractions" component={AdminAttractions} />
                                <Stack.Screen name="AdminAttractionForm" component={AdminAttractionForm} />
                                <Stack.Screen name="AdminPhotos" component={AdminPhotos} />
                                <Stack.Screen name="AdminEvents" component={AdminEvents} />
                                <Stack.Screen name="AdminEventForm" component={AdminEventForm} />
                                <Stack.Screen name="AdminGuides" component={AdminGuides} />
                                <Stack.Screen name="AdminGuideForm" component={AdminGuideForm} />
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen name="SignIn" component={SignIn} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export type TSScreenDefinitionsProps = StackNavigationProp<TScreenDefinitions>
