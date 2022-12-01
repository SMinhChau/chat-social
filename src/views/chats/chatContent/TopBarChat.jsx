import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { bgColor, primaryColor, subprimaryColor } from "../../../utils/color";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../components/Header";

function TopBarChat({
  nameChat,
  navigation,
  userId,
  idGroup,
  avatarGroup,
  conversationId,
  adminId,
  userChatId,
  conversationType,
}) {
  return (
    <Header
      onPress={() => {
        navigation.goBack();
      }}
    >
      <View style={styles.content__left}>
        <View style={[styles.cotentText, styles.rowCenter]}>
          <Text
            style={styles.nameText}
            numberOfLines={1}
            textAlignVertical="top"
          >
            {nameChat}
          </Text>
          <Text style={styles.timeView}>2 phút</Text>
        </View>
      </View>
      <View style={[styles.rightBar, styles.row]}>
        {/* Call */}
        <TouchableOpacity>
          <Ionicons name="call-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        {/* Video */}
        <TouchableOpacity>
          <Ionicons name="videocam-outline" size={24} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("InfoChat", {
              InfoChat: nameChat,
              idGroup,
              avatarGroup,
              userId,
              conversationId,
              adminId,
              userChatId,
              conversationType,
            });
          }}
        >
          <Ionicons name="list-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Header>
  );
}

export default TopBarChat;

const styles = StyleSheet.create({
  content__left: {
    paddingLeft: 10,
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  // buttonBack: {
  //   paddingRight: 5,
  // },
  rightBar: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    width: "38%",
    height: "100%",
  },
  // row: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   alignItems: "center",
  // },
  icon: {
    paddingLeft: 10,
    fontWeight: "500",
    color: "#fff",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "500",
    color: `${bgColor}`,
  },
  timeView: {
    paddingTop: 3,
    fontSize: 14,
    color: `${subprimaryColor}`,
  },
});
