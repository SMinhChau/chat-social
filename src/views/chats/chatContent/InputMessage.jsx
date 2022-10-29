import React, { useEffect, useState } from "react";
import { Platform, TextInput } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { updateContentChat } from "../../../redux/slices/ChatSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { updateSortConversations } from "../../../redux/slices/ConversationSlice";
import { URL } from "../../../utils/constant";
import { useDispatch } from "react-redux";

function InputMessage({ conversationId }) {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSetInput = (value) => {
    setMessage(value);
  };

  const { user } = useSelector((state) => state.user);

  const sendMessage = () => {
    var chatMessage = {
      conversationId: conversationId,
      content: [message],
      type: 0,
      accessToken: user.accessToken,
    };
    try {
      global.stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
    } catch (error) {
      console.log(error);
    }
    dispatch(updateSortConversations(conversationId));
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
          onChangeText={handleSetInput}
          style={[styles.input, styles.rowCenter]}
          multiline
        />
      </View>

      <Ionicons
        onPress={sendMessage}
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
