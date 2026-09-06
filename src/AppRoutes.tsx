import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer, NavigationProp } from '@react-navigation/native';

import { Home } from './pages/Home';
import { DetailsWaterfall } from './pages/DetailsWaterfall'
import { DetailsAttraction } from './pages/DetailsAttraction'
import { Theme } from './shared/Themes';



type TScreenDefinitions = {
    Home: undefined,
    DetailsWaterfall: {
        id: number;
    };
    DetailsAttraction: {
        id: number
    };
}

const Stack = createStackNavigator<TScreenDefinitions>();

export function AppRoutes() {
    return (
        <NavigationContainer
            theme={
                {
                    ...DefaultTheme,
                    fonts: {
                        ...DefaultTheme.fonts,
                        regular: {
                            fontFamily: Theme.fonts.poppinsRegular,
                            fontWeight: "400"
                        },
                        bold: {
                            fontFamily: Theme.fonts.poppinsBold,
                            fontWeight: "700"
                        }
                    },
                    colors: {
                        ...DefaultTheme.colors,
                        background: Theme.colors.neutralWhite,
                        primary: Theme.colors.primary500,
                        text: Theme.colors.neutralBlack
                    }
                }
            }>

            <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="DetailsWaterfall" component={DetailsWaterfall} />
                <Stack.Screen name='DetailsAttraction' component={DetailsAttraction} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}

export type TSScreenDefinitionsProps = NavigationProp<TScreenDefinitions>
