import { useAlert } from "@/hooks/useAlert";
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const Alert = () => {
  const { message, onClose } = useAlert();
  return (
    <Modal transparent={true} visible={Boolean(message)} animationType="fade">
      <View
        className={"flex-1 justify-center items-center bg-black bg-opacity-50"}
      >
        <View className={"bg-white p-6 rounded-lg w-4/5"}>
          <Text className={"text-lg mb-4 "}>{message}</Text>
          <TouchableOpacity
            className={"bg-green-500 px-6 py-2 rounded-lg"}
            onPress={() => onClose()}
          >
            <Text className={"text-white text-center text-lg font-semibold"}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Alert;
