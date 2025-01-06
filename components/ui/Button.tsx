import React from "react";
import { Text, ActivityIndicator, TouchableOpacity, View } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string; // Optional color customization
  loading?: boolean; // Show loading spinner
  style?: string; // Tailwind className for custom styling
  type?: "filled" | "outlined" | "text";
  textColor?: string;
};

const Button = ({
  title,
  onPress,
  color = "bg-green-500", // Default to green
  loading = false,
  style = "",
  type = "filled",
  textColor = "white",
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        type !== "text" && (loading ? "bg-gray-500" : color)
      } px-6 py-3 rounded-lg flex items-center justify-center ${style}`}
      disabled={loading}
      activeOpacity={0.7} // Set opacity when pressed
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text
          className={`${type === "text" ? textColor : "text-white"}`}
          style={{ fontSize: 16, fontWeight: "600" }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
