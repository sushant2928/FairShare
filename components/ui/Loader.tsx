import { useLoader } from "@/hooks/useLoader";
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null; // Don't render the loader if it's not active.

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});

export default Loader;
