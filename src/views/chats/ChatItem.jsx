import React, { useLayoutEffect, useState } from "react";

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
  Dimensions,
  Button,
  Text,
  Pressable,
  VirtualizedList,
  ScrollView,
} from "react-native";

import InputMessage from "./chatContent/InputMessage/InputMessage";
import ContentMessage from "./chatContent/ContentMessage";
import ContentMyMessage from "./chatContent/ContentMyMessage";
import { fetchUserById } from "../../redux/slices/UserSlice";
import { getToken } from "../../utils/function";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function ChatItem({ route, memberGroup, navigation }) {
  // Get all chat conversation
  const { userChat } = useSelector((state) => state.userChat);
  const { chat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const renderItem = ({ item }) => (
    <>
      {item.senderId === user.id ? (
        <ContentMyMessage message={item} avatar={userChat.avatar} />
      ) : (
        <ContentMessage
          message={item}
          avatar={userChat.avatar}
          receiverId={item.senderId}
        />
      )}
    </>
  );

  // useEffect(() => {
  //   console.log(chat.content);
  // }, [chat.content]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 10}
        >
          <View style={styles.body}>
            <TopBarChat name={userChat.name} navigation={navigation} />
            {/* <ScrollView style={styles.scrollView}> */}
            <FlatList
              style={{ paddingHorizontal: 10, paddingVertical: 5 }}
              data={chat.content}
              renderItem={renderItem}
              initialNumToRender={20}
              inverted
              keyExtractor={(item, index) => item._id || index.toString()}
              contentContainerStyle={{ flexDirection: "column-reverse" }}
            />
            {/* </ScrollView> */}
          </View>

          <InputMessage conversationId={userChat.id} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

export default ChatItem;

const styles = StyleSheet.create({
  chatscreen: {
    backgroundColor: "#F7F7F7",
    flex: 1,
  },
  content__FlatList: {},
  chatemptyContainer: {
    alignItems: "center",
    opacity: 0.5,
    justifyContent: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  messageView: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  scrollView: {
    height: 380,
  },
});
