import Item from "antd/lib/list/Item";
import { Text, View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import { useEffect } from "react";
import { getConversationAllByToken } from "../../../redux/slices/ConversationSlice";
import { saveUserChat } from "../../../redux/slices/UserChatSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { AvatarDefault } from "../../../utils/constant";

function ContentMessage({ message, navigation, avatar, sender }) {
  const { userChat } = useSelector((state) => state.userChat);
  useEffect(() => {
    console.log(sender);
  }, [sender]);
  const ImageMessage = () => {
    return (
      <>
        {/* <Text> {message.content[0]}</Text> */}
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: message.content[0] }}
        />
      </>
    );
  };
  return (
    <>
      <View style={styles.content}>
        {userChat.avatar ? (
          <Image
            style={styles.content__Avatar}
            source={{ uri: userChat.avatar }}
          />
        ) : (
          <Image
            style={styles.content__Avatar}
            source={{ uri: AvatarDefault }}
          />
        )}
        <View style={styles.message}>
          <View style={styles.message_Item}>
            {message && (
              <View style={styles.message_Item__content}>
                <Text style={styles.content__User}>{sender}</Text>
                {message.type === 1 ? (
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: message.content[0] }}
                  />
                ) : (
                  <Text style={styles.message__Text}>{message.content[0]}</Text>
                )}

                <View style={styles.message__Time}>
                  <Text style={styles.createAt}>
                    {" "}
                    {moment(new Date(message.timeSend)).format("LT")}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

export default ContentMessage;

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

