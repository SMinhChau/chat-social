import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { getChatByConversationID } from "../../redux/slices/ChatSlice";
import { saveUserChat } from "../../redux/slices/UserChatSlice";
import React from "react";
function ItemConservation({
  navigation,
  name,
  listMember = [],
  avatar,
  type,
  userIdCurrent,
  id,
  lastMessage,
  isLoading,
}) {
  const dispatch = useDispatch();
  const getNameConversation = () => {
    console.log(listMember);
    // console.log(userIdCurrent);

    if (type) {
      return name;
    }
    if (listMember.length)
      return listMember.find((m) => m.id !== userIdCurrent)?.name;
    else return "Chưa xác định";
  };

  const handleChangeChat = () => {
    navigation.navigate("Chats", { name: getNameConversation() });
    dispatch(getChatByConversationID(id));
    dispatch(
      saveUserChat({
        userChat: {
          id,
          name: getNameConversation(),
          listMember,
          avatar,
          type,
        },
      })
    );
  };

  return (
    <TouchableOpacity
      style={styles.buttonMessage}
      onPress={() => {
        navigation.navigate("Chats", { name: getNameConversation() });
      }}
    >
      <Image
        source={require("../../../assets/chau.jpg")}
        style={styles.imgMessage}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{getNameConversation()}</Text>

        <Text style={styles.textdiscrible}>{lastMessage?.content[0]}</Text>
      </View>

      <View style={styles.viewTime}>
        <Text style={styles.textdiscrible}>2 phút</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ItemConservation;

const styles = StyleSheet.create({
  buttonMessage: {
    width: "100%",
    height: 80,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
    flexDirection: "row",
    alignItems: "center",
  },
  imgMessage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  //
  content: {
    width: "60%",
    height: "70%",
    justifyContent: "space-around",
  },

  //
  textdiscrible: {
    color: "#6e6e6e",
    fontSize: 17,
  },
  name: {
    color: "#000",
    fontSize: 20,
  },
  // viewTime
  viewTime: {
    width: "20%",
    height: "55%",
  },
});
