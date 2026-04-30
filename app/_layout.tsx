import { AlertProvider } from '@/template';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { AppProvider } from '@/contexts/AppContext';
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_700Bold_Italic,
  PlayfairDisplay_800ExtraBold_Italic,
} from '@expo-google-fonts/playfair-display';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import {
  Caveat_400Regular,
  Caveat_700Bold,
} from '@expo-google-fonts/caveat';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
    PlayfairDisplay_800ExtraBold_Italic,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Caveat_400Regular,
    Caveat_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  return (
    <AlertProvider>
      <SafeAreaProvider>
        <AppProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="recipe/[id]" options={{ headerShown: false }} />
          </Stack>
        </AppProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
