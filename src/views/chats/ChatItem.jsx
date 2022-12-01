import React, { useLayoutEffect, useState } from "react";

import TopBarChat from "./chatContent/TopBarChat";
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
} from "react-native";

import InputMessage from "./chatContent/InputMessage/InputMessage";
import ContentMessage from "./chatContent/ContentMessage";
import ContentMyMessage from "./chatContent/ContentMyMessage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ChatItem({ navigation, route }) {
  const { userIdCurrent } = route.params;
  const { avatar } = route.params;
  const { conversationId } = route.params;
  const { admin } = route.params;
  const { name } = route.params;
  const { userCurrentId } = route.params;
  const { conversationType } = route.params;
  const { userChatconversation } = route.params;

  // Get all chat conversation
  const { userChat } = useSelector((state) => state.userChat);
  const { chat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  // Remove Message
  const revertChat = (messageId) => {
    console.log("revertChatId", messageId);
    const chatMessage = {
      messageId,
      accessToken: user.accessToken,
    };
    stompClient.send(
      "/app/chat.revertMessage",
      {},
      JSON.stringify(chatMessage)
    );
  };

  // React message
  const handleReaction = (messageId, type) => {
    const chatMessage = {
      messageId,
      typeReact: actionReact.indexOf(type),
      accessToken: user.accessToken,
    };

    stompClient.send("/app/chat.reactMessage", {}, JSON.stringify(chatMessage));
  };

  const renderItem = ({ item }) => (
    <>
      {item.senderId === user.id ? (
        <ContentMyMessage
          message={item}
          avatar={userChatconversation.avatar}
          revertChat={revertChat}
        />
      ) : (
        <ContentMessage
          message={item}
          avatar={userChatconversation.avatar}
          receiverId={item.senderId}
        />
      )}
    </>
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 10}
        >
          <View style={styles.body}>
            <TopBarChat
              nameChat={name}
              navigation={navigation}
              userId={userIdCurrent}
              avatarGroup={avatar}
              conversationId={conversationId}
              adminId={admin}
              userChatId={userIdCurrent}
              conversationType={conversationType}
            />
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
