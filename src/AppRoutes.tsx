import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer, NavigationProp } from '@react-navigation/native';

import { Home } from './pages/Home';
import { Theme } from './shared/Themes';




type TScreenDefinitions = {
    Home: undefined
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
                            fontWeight: "700"
                        },
                        bold: {
                            fontFamily: Theme.fonts.poppinsBold,
                            fontWeight: "400"
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
            </Stack.Navigator>

        </NavigationContainer>
    );
}

export type TSScreenDefinitionsProps = NavigationProp<TScreenDefinitions>