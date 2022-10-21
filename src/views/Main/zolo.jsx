import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function Zolo({ navigation }) {
  return (
    <ImageBackground
      source={require("../../imgs/background.png")}
      style={styles.image}
    >
      <View style={styles.component}>
        <View style={styles.component}>
          <Text style={styles.zalotitle}>ZULO</Text>
        </View>

        <View style={styles.component}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.textTouch}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegis}
            onPress={() => {
              navigation.navigate("RegisterPhone");
            }}
          >
            <Text style={styles.textTouch2}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },

  component: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  zalotitle: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#0573ff",
  },

  buttonRegis: {
    backgroundColor: "#D1D1D1",
    width: 250,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 30,
  },

  buttonLogin: {
    backgroundColor: "#0573ff",
    width: 250,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 30,
  },

  textTouch: {
    fontSize: 18,
    color: "white",
  },

  textTouch2: {
    fontSize: 18,
    color: "#000",
  },
});
