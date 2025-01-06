import AddExpenseModal from "@/components/ui/AddExpenseModal";
import Button from "@/components/ui/Button";
import useExpense from "@/hooks/useExpense";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Expense = () => {
  const { groupId } = useLocalSearchParams();
  const [expenses, setExpenses] = useState([]);
  const { getExpenses } = useExpense();
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const fetchExpenses = () => {
    getExpenses(Number(groupId)).then((res) => {
      setExpenses(res);
    });
  };

  useEffect(() => {
    fetchExpenses();

    return () => {
      setShowAddExpenseModal(false);
    };
  }, [groupId]);

  const Item = ({ item }) => {
    console.log(JSON.stringify({ item }));
    return (
      <Link
        asChild
        href={{
          pathname: "/main/group/expense-details", // Correct syntax with colon
          params: {
            description: item.description,
            amount: item.amount,
            expenseId: item.id,
          },
        }}
      >
        <TouchableOpacity className="flex flex-row items-center justify-between px-4 py-3 rounded-lg border my-2 shadow-sm ">
          <Text className="text-lg font-semibold">{item.description}</Text>
          <View className="flex flex-row items-center gap-4">
            <Text className="text-gray-500">₹{item.amount}</Text>
            <FontAwesome name="chevron-right" size={15} />
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View className="p-4 flex-1 ">
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={fetchExpenses} refreshing={false} />
        }
        data={expenses || []}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
      <View className="flex items-center p-4 gap-2">
        <Button
          title="Add Expense"
          onPress={() => {
            setShowAddExpenseModal(true);
          }}
          type="text"
          textColor="text-green-500"
        />
      </View>
      <AddExpenseModal
        visible={showAddExpenseModal}
        onClose={() => {
          setShowAddExpenseModal(false);
        }}
        groupId={Number(groupId)}
      />
    </View>
  );
};

export default Expense;
