import React, { useState } from "react";

import TopBarChat from "./chatContent/TopBarChat";
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  action,
  TouchableWithoutFeedback,
  View,
  Image,
  Platform,
} from "react-native";

import InputMessage from "./chatContent/InputMessage";
// redux
import ContentMessage from "./chatContent/ContentMessage";
import ContentMyMessage from "./chatContent/ContentMyMessage";
import { useDispatch } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AvatarDefault, URL } from "../../utils/constant";
import { updateContentChat } from "../../redux/slices/ChatSlice";
import { updateSortConversations } from "../../redux/slices/ConversationSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ChatItem({ route, memberGroup, navigation }) {
  const { name } = route.params;

  const { userChat } = useSelector((state) => state.userChat);
  const { chat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  var sock = new SockJS(`${URL}/ws`);
  let stompClient = Stomp.over(sock);
  const { user } = useSelector((state) => state.user);

  const messages = [
    {
      id: 0,
      action: "hello Chau!jhjghjhjgh",
      time: "21:10",
    },
    {
      id: 0,
      action: "hello Chau!",
      time: "21:10",
    },
    {
      id: 0,
      action:
        "English Grammar in Use là một cuốn sách tham khảo và luyện tập tự học dành cho sinh viên tiếng Anh từ trình độ trung cấp đến cao cấp.",
      time: "21:10",
    },
    {
      id: 0,
      action: "Good luck!!",
      time: "21:10",
    },
    {
      id: 0,
      action: "trình độ trung cấp đến cao cấp.",
      time: "21:10",
    },
    {
      id: 0,
      action: "Good luck!!",
      time: "21:10",
    },
  ];

  useEffect(() => {
    sock.onopen = function () {
      console.log("open");
    };
    stompClient.connect({}, function (frame) {
      stompClient.subscribe(`/user/${user.id}/chat`, function (chat) {
        const message = JSON.parse(chat.body);
        dispatch(updateContentChat(message));
      });
    });
  }, []);

  const renderItem = ({ message }) => (
    <>
      <ContentMyMessage message={message} />
    </>
  );

  return (
    <View style={styles.container}>
      <TopBarChat name={name} navigation={navigation} />

      <KeyboardAvoidingView style={{ flex: 1 }}>
        <FlatList
          style={styles.content}
          data={chat}
          renderItem={renderItem}
          inverted
          keyExtractor={(item, index) => item.id || index.toString()}
          contentContainerStyle={{ flexDirection: "column-reverse" }}
        />

        <InputMessage />
      </KeyboardAvoidingView>
    </View>
  );
}

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    height: "90%",
  },
});
