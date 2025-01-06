import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, Tabs } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function TabLayout() {
  const { id, name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: name as string,
        }}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#4CAF50", // Active tab color
          tabBarInactiveTintColor: "#8B8B8B", // Inactive tab color
          headerShown: false, // Hide the header for the tabs
        }}
      >
        <Tabs.Screen
          name="members"
          options={{
            title: "Members",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="users" color={color} />
            ),
          }}
          initialParams={{ groupId: id }}
        />
        <Tabs.Screen
          name="expense"
          options={{
            title: "Expense",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="money" color={color} />
            ),
          }}
          initialParams={{ groupId: id }}
        />
      </Tabs>
    </>
  );
}
