import useExpense from "@/hooks/useExpense";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const ExpenseDetails = () => {
  const { description, expenseId } = useLocalSearchParams();
  const { getExpense } = useExpense();
  const [expense, setExpense] = useState();
  useEffect(() => {
    getExpense(expenseId as string).then((res) => {
      setExpense(res);
    });
  }, [expenseId]);

  return (
    <View className="p-4 flex h-full bg-gray-100 gap-4">
      <Stack.Screen
        options={{
          title: description as string,
        }}
      />
      <View className="gap-2 bg-white rounded-lg shadow-md p-4">
        <Text className="text-2xl font-semibold mb-2">Expense Details</Text>
        <Text className="text-xl text-gray-600">
          Description: {expense?.description}
        </Text>
        <Text className="text-xl text-gray-600">
          Amount: ₹{expense?.amount}
        </Text>
        <Text className="text-xl text-gray-600">
          Paid by: {expense?.payer?.name}
        </Text>
      </View>

      <View className=" bg-white rounded-lg shadow-md p-4 gap-2">
        <Text className="text-2xl font-semibold mb-2">
          Split among members:
        </Text>
        <View>
          {Array.isArray(expense?.ExpenseSplit) &&
            expense.ExpenseSplit.map((split) => (
              <Text className="text-lg text-gray-600">
                <Text className="font-bold text-gray-800">
                  {split?.user?.name}
                </Text>
                {split?.share >= 0
                  ? ` owes ${split?.share}`
                  : ` gets ${-1 * split?.share}`}
              </Text>
            ))}
        </View>
      </View>
    </View>
  );
};

export default ExpenseDetails;
