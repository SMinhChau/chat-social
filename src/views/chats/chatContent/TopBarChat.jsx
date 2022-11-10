import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bgColor, primaryColor, subprimaryColor } from "../../../utils/color";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Header from "../../components/Header";

function TopBarChat({ name, navigation }) {
  const [btnColor, setBtnColor] = useState("red");

  return (
    <Header
      onPress={() => {
        navigation.goBack();
      }}
    >
      <View style={styles.content__left}>
        <View style={[styles.cotentText, styles.rowCenter]}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.timeView}>2 phút</Text>
        </View>
      </View>
      <View style={[styles.rightBar, styles.row]}>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={24} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="videocam-outline" size={24} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="list-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Header>
  );
}

export default TopBarChat;

const styles = StyleSheet.create({
  // contentTop: {
  //   height: 50,
  //   width: "100%",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  //   flexDirection: "row",
  //   backgroundColor: "#0068FF",
  //   paddingHorizontal: 10,
  // },
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
