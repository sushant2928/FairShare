import Loader from "@/components/ui/Loader";
import "../global.css";
import AuthProvider from "@/context/AuthContext";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LoaderProvider } from "@/hooks/useLoader";
import { AlertProvider } from "@/hooks/useAlert";
import Alert from "@/components/ui/Alert";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
    <SafeAreaProvider>
      <LoaderProvider>
        <AlertProvider>
          <AuthProvider>
            {/* Display a loader at the top level for consistent user experience */}
            <Loader />
            <Alert />
            {/* Stack for navigation */}
            <Stack screenOptions={{ headerShown: false }} />
            {/* StatusBar for theme integration */}
            <StatusBar style="auto" />
          </AuthProvider>
        </AlertProvider>
      </LoaderProvider>
    </SafeAreaProvider>
  );
}
