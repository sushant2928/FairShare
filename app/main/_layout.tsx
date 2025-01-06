import { useAuth } from "@/hooks/useAuth";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1">
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#4CAF50", // Green background color
          },
          headerTintColor: "#ffffff", // White text color
          headerTitleStyle: {
            fontSize: 18, // Increase font size
            fontWeight: "bold", // Make the title bold
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="group/(tabs)" />
      </Stack>
    </SafeAreaView>
  );
}
