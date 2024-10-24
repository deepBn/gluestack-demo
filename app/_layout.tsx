import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Client } from 'react-native-appwrite';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';
import "@/global.css";

let client: Client;

client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67174863000775f8f2b8')   // Your Project ID
  .setPlatform('com.dev.rajdeep.gluestackdemo');   // Your package name / bundle identifier

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
