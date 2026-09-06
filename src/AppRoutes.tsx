import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer, NavigationProp } from '@react-navigation/native';

import { useAuth } from '@/contexts/AuthContext';
import { Home } from './pages/Home';
import { DetailsWaterfall } from './pages/DetailsWaterfall'
import { DetailsAttraction } from './pages/DetailsAttraction'
import { Welcome } from './pages/Welcome';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Theme } from './shared/Themes';



type TScreenDefinitions = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Home: undefined,
    DetailsWaterfall: {
        id: number;
    };
    DetailsAttraction: {
        id: number
    };
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
                        <Stack.Screen name="DetailsWaterfall" component={DetailsWaterfall} />
                        <Stack.Screen name='DetailsAttraction' component={DetailsAttraction} />
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

export type TSScreenDefinitionsProps = NavigationProp<TScreenDefinitions>
