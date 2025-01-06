import { useAuth } from "@/hooks/useAuth";
import useGroup from "@/hooks/useGroup";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/Button"; // Import the custom button
import FontAwesome from "@expo/vector-icons/FontAwesome";

type ItemProps = { item: { name: string; id: string } };

const Dashboard = () => {
  const { logout } = useAuth();
  const { groups, createGroup, getGroups } = useGroup();
  const { userInfo } = useAuth();

  useEffect(() => {
    getGroups();
  }, []);

  const onCreateGroupPress = () => {
    Alert.prompt("Group Name", "", (name) => {
      createGroup(name, "");
    });
  };

  const Item = ({ item }: ItemProps) => (
    <Link
      asChild
      push
      href={{
        pathname: "/main/group/(tabs)/members",
        params: { id: item.id, name: item.name },
      }}
    >
      <Pressable className="flex flex-row items-center justify-between px-4 py-3 rounded-lg border my-2 shadow-sm bg-white">
        <Text className="text-lg font-medium">{item.name}</Text>
        <View className="flex flex-row items-center gap-4">
          <Text className="text-sm text-gray-500">
            You
            {item.balance < 0
              ? ` owe ₹${item.balance * -1}`
              : ` get ₹${item.balance}`}
          </Text>
          <FontAwesome name="chevron-right" size={15} />
        </View>
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView className="p-4 flex-1 bg-gray-100">
      <Stack.Screen options={{ title: "Dashboard" }} />
      <Text className="mb-4 text-2xl font-semibold text-green-500">
        Hello, {userInfo?.name}
      </Text>

      <FlatList
        refreshControl={
          <RefreshControl onRefresh={getGroups} refreshing={false} />
        }
        data={groups || []}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        className="mb-6"
      />

      <View className="flex items-center p-4 gap-2">
        <Button
          style="w-full"
          title="Create Group"
          onPress={onCreateGroupPress}
          color="bg-green-500" // Green color
        />
        <Button
          title="Logout"
          onPress={logout}
          color="bg-red-500" // Red color
          type="text"
          textColor="text-red-500"
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
