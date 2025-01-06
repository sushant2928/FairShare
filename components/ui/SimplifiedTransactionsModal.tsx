import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SimplifiedTransactionsModal = ({ visible, data, onClose }) => {
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
            Simplified Transactions
          </Text>

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View className={`p-4 mb-2 bg-white rounded-lg shadow`}>
                <Text
                  className={`text-lg text-gray-800`}
                >{`${item.from} pays ₹${item.amount} to ${item.to}`}</Text>
              </View>
            )}
          />

          <View className={`flex-row justify-between`}>
            <TouchableOpacity
              className={`bg-green-500 rounded-lg p-3 flex-1 ml-2`}
              onPress={() => {
                onClose();
              }}
            >
              <Text className={`text-white text-center font-bold`}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SimplifiedTransactionsModal;
