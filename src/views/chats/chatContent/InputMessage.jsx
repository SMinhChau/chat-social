import React, { useState } from "react";
import { Platform, TextInput } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function InputMessage(conversationId) {
  const [isWrite, setIsWrite] = useState(false);
  const [message, setMessage] = useState("");

  const handleWriteText = (value) => {
    setMessage(value);
    if (value.length > 0) {
      setIsWrite(true);
    } else {
      setIsWrite(false);
    }
  };

  const handleSendMessage = () => {
    alert("send");
    // const data = { content: message, senderID: userInfo._id, conversationID: conversationId };
    setMessage("");
  };

  return (
    <View style={styles.contentTop}>
      <FontAwesome
        style={styles.iconLeft}
        name="smile-o"
        size={30}
        color="#0068FF"
      />
      <View style={[styles.inputView, styles.rowCenter]}>
        <TextInput
          placeholder="Nhập tin nhắn"
          value={message}
          style={[
            styles.input,
            styles.rowCenter,
            { paddingTop: Platform.OS === "ios" ? 10 : 0 },
          ]}
          multiline
          onChangeText={handleWriteText}
        />
      </View>

      <Ionicons
        onPress={handleSendMessage}
        style={styles.icon}
        name="ios-paper-plane-outline"
        size={24}
        color="#0068FF"
      />
      <Ionicons
        style={styles.iconRight}
        name="image"
        size={24}
        color="#0068FF"
      />
    </View>
  );
}

export default InputMessage;

const styles = StyleSheet.create({
  contentTop: {
    height: 45,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputView: {
    width: "75%",
    height: "100%",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 18,
    paddingLeft: 8,
    paddingRight: 8,
  },
  icon: {
    width: "10%",
  },
  iconRight: {},
});
