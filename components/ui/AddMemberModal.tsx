import { useAuthContext } from "@/hooks/useAuthContext";
import useExpense from "@/hooks/useExpense";
import useGroup from "@/hooks/useGroup";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddMemberModal = ({ visible, onClose, groupId }) => {
  const { addMembers } = useGroup();
  const { getUserInfo } = useAuthContext();
  const [searchText, setSearchText] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    if (searchText) {
      getUserInfo(searchText, "email").then((res) => {
        setMembers(res?.user || []);
      });
    }
  }, [searchText]);

  const handleItemPress = useCallback((id) => {
    setSelectedMembers((prev) => {
      if (prev.indexOf(id) === -1) {
        prev.push(id);
      } else prev = prev.filter((elem) => elem !== id);
      return [...prev];
    });
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView
        className={`flex-1 justify-center items-center bg-gray-100`}
      >
        <View className={`w-4/5 p-5 bg-white rounded-lg gap-4 h-5/6`}>
          <Text className={`text-lg font-bold text-center mb-4`}>
            Add Expense
          </Text>
          {/* Search Bar */}
          <TextInput
            className={`h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4`}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            keyboardType="email-address"
          />
          {/* FlatList to display data */}
          <FlatList
            data={members}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => {
              const isSelected = selectedMembers.includes(item.uid);
              return (
                <TouchableOpacity
                  className={`p-4 mb-2 ${
                    isSelected ? "bg-gray-100" : "bg-white"
                  } rounded-lg shadow`}
                  onPress={() => handleItemPress(item.uid)}
                >
                  <Text className={`text-lg text-gray-800`}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Text className={`text-center text-gray-500 mt-4`}>
                No items found.
              </Text>
            }
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
                addMembers(groupId, selectedMembers);
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

export default AddMemberModal;
