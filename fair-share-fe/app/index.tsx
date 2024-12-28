import { Link, Redirect, useRouter } from "expo-router";
import { Text, SafeAreaView, Button } from "react-native";

const Intro = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Button
        onPress={() => router.replace("/(auth)/register")}
        title="Get Started"
      />
    </SafeAreaView>
  );
};
export default Intro;
