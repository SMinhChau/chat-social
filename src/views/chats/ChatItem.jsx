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

import InputMessage from "./chatContent/InputMessage";
import ContentMessage from "./chatContent/ContentMessage";
import ContentMyMessage from "./chatContent/ContentMyMessage";
import { useDispatch } from "react-redux";
import { AvatarDefault, URL } from "../../utils/constant";
import { updateContentChat } from "../../redux/slices/ChatSlice";
import { updateSortConversations } from "../../redux/slices/ConversationSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { TextInput } from "react-native-web";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";

function ChatItem({ route, memberGroup, navigation }) {
  // Get all chat conversation
  const { userChat } = useSelector((state) => state.userChat);
  const { chat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  // const messages = [
  //   {
  //     id: 0,
  //     action: "hello Chau!jhjghjhjgh",
  //     time: "21:10",
  //   },
  //   {
  //     id: 0,
  //     action: "hello Chau!",
  //     time: "21:10",
  //   },
  //   {
  //     id: 0,
  //     action:
  //       "English Grammar in Use là một cuốn sách tham khảo và luyện tập tự học dành cho sinh viên tiếng Anh từ trình độ trung cấp đến cao cấp.",
  //     time: "21:10",
  //   },
  //   {
  //     id: 0,
  //     action: "Good luck!!",
  //     time: "21:10",
  //   },
  //   {
  //     id: 0,
  //     action: "trình độ trung cấp đến cao cấp.",
  //     time: "21:10",
  //   },
  //   {
  //     id: 0,
  //     action: "Good luck!!",
  //     time: "21:10",
  //   },
  // ];

  //use your link here

  const renderItem = ({ item }) => (
    <>
      {item.senderId === user.id ? (
        <ContentMyMessage message={item} />
      ) : (
        <ContentMessage message={item} />
      )}
    </>
  );

  return (
    <>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 10}
      >
        <View style={styles.body}>
          <TopBarChat name={userChat.name} navigation={navigation} />
          <FlatList
            data={chat.content}
            renderItem={renderItem}
            initialNumToRender={20}
            inverted
            keyExtractor={(item, index) => item._id || index.toString()}
            contentContainerStyle={{ flexDirection: "column-reverse" }}
          />
        </View>
        <InputMessage conversationId={userChat.id} />
      </KeyboardAvoidingView> */}

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 10}
      >
        <View style={styles.body}>
          <TopBarChat name={userChat.name} navigation={navigation} />
          <ScrollView style={styles.scrollView}>
            <FlatList
              data={chat.content}
              renderItem={renderItem}
              initialNumToRender={20}
              inverted
              keyExtractor={(item, index) => item._id || index.toString()}
              contentContainerStyle={{ flexDirection: "column-reverse" }}
            />
          </ScrollView>
        </View>

        <InputMessage conversationId={userChat.id} />
      </KeyboardAvoidingView>

      {/* <View style={styles.chatscreen}>
        <TopBarChat name={userChat.name} navigation={navigation} />
        <KeyboardAvoidingView
          behavior="padding"

          // behavior={Platform.OS === "ios" ? "position" : null}
          // keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}
        >
          <View style={styles.inner}>
            {chat.content ? (
              <FlatList
                initialNumToRender={4}
                data={chat.content}
                renderItem={renderItem}
                inverted
                keyExtractor={(item, index) => item.id || index.toString()}
                contentContainerStyle={{ flexDirection: "column-reverse" }}
              />
            ) : (
              <View style={styles.chatemptyContainer}>
                <Text style={styles.chatemptyText}>Loading....</Text>
              </View>
            )}

            <InputMessage conversationId={userChat.id} />
          </View>
        </KeyboardAvoidingView>
      </View> */}
    </>
  );
}

export default ChatItem;

const styles = StyleSheet.create({
  chatscreen: {
    backgroundColor: "#F7F7F7",
    flex: 1,
    // display: "flex",
    // justifyContent: "flex-end",
  },
  // inner: {
  //   width: " 100%",
  //   height: "80%",
  // },
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
