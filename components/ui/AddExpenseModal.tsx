import useExpense from "@/hooks/useExpense";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddExpenseModal = ({ visible, onClose, groupId }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("0");
  const { addExpense } = useExpense();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView
        className={`flex-1 justify-center items-center bg-black bg-opacity-50`}
      >
        <View className={`w-4/5 p-5 bg-white rounded-lg`}>
          <Text className={`text-lg font-bold text-center mb-4`}>
            Add Expense
          </Text>

          <TextInput
            className={`border border-gray-300 rounded-lg p-3 mb-4`}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            className={`border border-gray-300 rounded-lg p-3 mb-4`}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <View className={`flex-row justify-between`}>
            <TouchableOpacity
              className={`bg-red-500 rounded-lg p-3 flex-1 mr-2`}
              onPress={onClose}
            >
              <Text className={`text-white text-center font-bold`}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-green-500 rounded-lg p-3 flex-1 ml-2`}
              onPress={() => {
                addExpense(description, Number(amount), groupId);
                onClose();
              }}
            >
              <Text className={`text-white text-center font-bold`}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AddExpenseModal;
