import Loader from "@/components/ui/Loader";
import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Alert from "@/components/ui/Alert";
import Providers from "@/components/ui/Providers";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function hideSplash() {
      try {
        if (loaded) {
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.warn("Error hiding splash screen:", error);
      }
    }
    hideSplash();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Providers>
        {/* Display a loader at the top level for consistent user experience */}
        <Loader />
        <Alert />
        {/* Stack for navigation */}
        <Stack screenOptions={{ headerShown: false }} />
        {/* StatusBar for theme integration */}
        {/* <StatusBar style="auto" /> */}
        <StatusBar
          style="light" // or "dark"
          backgroundColor="transparent" // Optional customization
          translucent
        />
      </Providers>
    </SafeAreaProvider>
  );
}
