import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ label, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.elevation, styles.button]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text
        style={{ fontSize: 18, color: "white", textTransform: "uppercase" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0573ff",
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: "white",
  },

  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
});
