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

function ChatItem({ route, memberGroup, navigation }) {
  const [action, setaction] = useState("");

  const { name } = route.params;

  // alert(JSON.stringify(route.params));

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

  const renderItem = ({ item }) => (
    <>
      <ContentMessage message={item} />
    </>
  );

  return (
    <View style={styles.container}>
      <TopBarChat name={name} navigation={navigation} />

      <KeyboardAvoidingView style={{ flex: 1 }}>
        <FlatList
          style={styles.content}
          data={messages}
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
