import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';


import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppRoutes } from './AppRoutes';
import { Theme } from "./shared/Themes"



export function App() {

  const [loaded, error] = useFonts({
    poppinsRegular: Poppins_400Regular,
    poppinsBold: Poppins_700Bold,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.neutralWhite }}>
      <StatusBar style="light" />
      <AppRoutes />
    </SafeAreaView>
  );
}