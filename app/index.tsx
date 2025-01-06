import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Intro = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.navigate("/main");
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-green-500">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-white text-3xl font-bold mb-6">
          Welcome to FairShare
        </Text>
        <Text className="text-white text-lg text-center mb-8">
          Simplify shared expenses and ensure fairness in every split. Get
          started today!
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/auth/register")}
          className="bg-white px-6 py-3 rounded-lg shadow-md"
        >
          <Text className="text-green-500 font-semibold text-lg">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Intro;
