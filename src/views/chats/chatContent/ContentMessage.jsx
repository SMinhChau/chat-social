import Item from "antd/lib/list/Item";
import { Text, View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import { useEffect } from "react";
import { getConversationAllByToken } from "../../../redux/slices/ConversationSlice";
import { saveUserChat } from "../../../redux/slices/UserChatSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function ContentMessage({ message, navigation }) {
  const { userChat } = useSelector((state) => state.userChat);

  return (
    <>
      <View style={styles.content}>
        <Image
          style={styles.content__Avatar}
          source={require("../../../../assets/chau.jpg")}
        />
        <View style={styles.message}>
          <View style={styles.message_Item}>
            <View style={styles.message_Item__content}>
              <Text style={styles.content__User}>{userChat.name}</Text>
              <Text style={styles.message__Text}>{message.content[0]}</Text>
              <View style={styles.message__Time}>
                <Text style={styles.createAt}>
                  {" "}
                  {moment(new Date(message.timeSend)).format("LT")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 4,
    marginHorizontal: 4,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  message: {
    display: "flex",
    width: "85%",
    alignContent: "flex-end",
  },
  message_Item: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  message_Item__content: {
    backgroundColor: "#fff",
    padding: 8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    borderColor: "#d2c3c3",
    borderWidth: 1,
  },
  message__Text: {
    minWidth: 32,
    maxWidth: "100%",
    fontSize: 16,
  },
  message__Time: {},
  createAt: {
    marginTop: 4,
    fontSize: 14,
    color: "#939ab7",
  },
  // content__Avatar
  content__Avatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginRight: 5,
  },

  content__User: {
    fontSize: 16,
    color: "#24cd8c",
  },
});
export default ContentMessage;
