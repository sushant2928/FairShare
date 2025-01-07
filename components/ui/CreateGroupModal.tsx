import useGroup from "@/hooks/useGroup";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateGroupModal = ({ visible, onClose }) => {
  const { createGroup } = useGroup();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
            Create Group
          </Text>

          <TextInput
            className={`border border-gray-300 rounded-lg p-3 mb-4`}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            className={`border border-gray-300 rounded-lg p-3 mb-4`}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
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
                createGroup(name, description);
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

export default CreateGroupModal;
