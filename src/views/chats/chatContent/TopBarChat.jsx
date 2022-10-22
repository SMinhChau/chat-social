import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function TopBarChat({ name, memberGroup, navigation }) {
  return (
    <View style={styles.contentTop}>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Ionicons name="arrow-back" style={{ fontSize: 28, color: "white" }} />
      </TouchableOpacity>
      <View style={[styles.cotentText, styles.rowCenter]}>
        <Text style={styles.nameText}>{name}</Text>
        {memberGroup && (
          <Text style={{ color: "#fff" }}>{`${memberGroup} người`}</Text>
        )}
      </View>
      {memberGroup && (
        <Text style={{ color: "#fff" }}>{`${memberGroup} người`}</Text>
      )}
      <View style={[styles.rightBar, styles.row]}>
        {memberGroup ? (
          <>
            <Icon name="video-outline" size={24} style={styles.icon} />
            <Icon name="magnify" size={24} style={styles.icon} />
          </>
        ) : (
          <>
            <Icon name="phone" size={24} style={styles.icon} />
            <Icon name="video-outline" size={24} style={styles.icon} />
          </>
        )}
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#0068FF",
    paddingLeft: 10,
    paddingRight: 10,
  },
  cotentText: {},
  rightBar: {
    width: "20%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    fontWeight: "500",
    color: "#fff",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
