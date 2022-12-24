import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { getChatByConversationID } from "../../redux/slices/ChatSlice";
import { saveUserChat } from "../../redux/slices/UserChatSlice";
import React from "react";
import moment from "moment";
import { AvatarDefault } from "../../utils/constant";
function ItemConservation({
  navigation,
  userChatconversation,
  name,
  listMember = [],
  avatar,
  type,
  userIdCurrent,
  conversationId,
  id,
  userCurrentId,
  lastMessage,
  conversationAdmin,
  conversationType,
}) {
  const dispatch = useDispatch();

  const getNameConversation = () => {
    if (type) {
      return name;
    }
    if (listMember.length)
      return listMember.find((m) => m.id !== userIdCurrent)?.name;
    else return "Chưa xác định";
  };

  const getAvatar = () => {
    if (type) {
      return avatar;
    }
    if (listMember.length)
      return listMember.find((m) => m.id !== userIdCurrent)?.avatar;
  };

  const handleChangeChat = () => {
    navigation.navigate("Chats", {
      name: getNameConversation(),
      userIdCurrent,
      avatar: getAvatar(),
      userCurrentId,
      conversationId,
      admin: conversationAdmin,
      conversationType,
      userChatconversation,
    });
    dispatch(getChatByConversationID(id));
    dispatch(
      saveUserChat({
        userChat: {
          id,
          name: getNameConversation(),
          listMember,
          avatar: getAvatar(),
          type,
        },
      })
    );
  };

  return (
    <TouchableOpacity
      style={styles.buttonMessage}
      onPress={() => {
        handleChangeChat();
      }}
    >
      {getAvatar() ? (
        <Image source={{ uri: getAvatar() }} style={styles.imgMessage} />
      ) : (
        <Image source={{ uri: AvatarDefault }} style={styles.imgMessage} />
      )}

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1} textAlignVertical="top">
          {getNameConversation()}
        </Text>

        <Text
          style={styles.textdiscrible}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {lastMessage?.content[0] ? lastMessage.content : ""}
        </Text>
      </View>
      <View style={styles.viewTime}>
        <Text style={styles.textdiscrible_time}>
          {lastMessage?.timeSend
            ? moment(new Date(lastMessage.timeSend)).fromNow()
            : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default ItemConservation;

const styles = StyleSheet.create({
  buttonMessage: {
    flex: 1,
    height: 90,
    paddingVertical: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3E8ED",
    borderRadius: 10,
    borderBottomWidth: 2,
  },

  imgMessage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 15,
  },
  //
  content: {
    width: "50%",
    height: "100%",
    justifyContent: "space-around",
  },

  //
  textdiscrible: {
    width: "100%",
    color: "#6e6e6e",
    height: "50%",
    fontSize: 14,
    paddingTop: 3,
  },
  textdiscrible_time: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    color: "#6e6e6e",
    fontSize: 14,
    paddingTop: 3,
  },
  name: {
    width: "100%",
    height: "50%",
    color: "#000",
    fontSize: 20,
  },
  // viewTime
  viewTime: {
    width: "20%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 5,
  },
});
