import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    openSansRegular: require("../assets/fonts/OpenSans-Regular.ttf"), 
    openSansBold: require("../assets/fonts/OpenSans-Bold.ttf"),
    openSansLight: require("../assets/fonts/OpenSans-Light.ttf"),
    poppinRegular: require("../assets/fonts/Poppins-Thin.ttf"),
    poppinBold: require("../assets/fonts/Poppins-Bold.ttf"),
    poppinLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
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
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
