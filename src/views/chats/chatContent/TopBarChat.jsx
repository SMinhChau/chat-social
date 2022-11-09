import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { primaryColor, subprimaryColor } from "../../../utils/color";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

function TopBarChat({ name, navigation }) {
  const [btnColor, setBtnColor] = useState("red");

  return (
    <View style={styles.contentTop}>
      <View style={styles.content__left}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons
            name="arrow-back"
            style={{ fontSize: 28, color: "white" }}
          />
        </TouchableOpacity>

        <View style={[styles.cotentText, styles.rowCenter]}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.timeView}>2 phút</Text>
        </View>
      </View>
      <View style={[styles.rightBar, styles.row]}>
        <>
          <Ionicons name="call-outline" size={24} style={styles.icon} />
          <Ionicons name="videocam-outline" size={24} style={styles.icon} />
          <Ionicons name="list-outline" size={24} style={styles.icon} />
        </>
      </View>
    </View>
  );
}

export default TopBarChat;

const styles = StyleSheet.create({
  contentTop: {
    height: 45,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#0068FF",
    paddingHorizontal: 10,
  },
  content__left: {
    width: "70%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonBack: {
    paddingRight: 5,
  },
  rightBar: {
    width: "30%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  icon: {
    paddingLeft: 10,
    fontWeight: "500",
    color: "#fff",
  },
  nameText: {
    fontSize: 15,
    color: `${primaryColor}`,
  },
  timeView: {
    fontSize: 12,

    color: `${subprimaryColor}`,
  },
});
