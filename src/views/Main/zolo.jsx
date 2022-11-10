import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import React from "react";
import { bgColor } from "../../utils/color";
import { useRef } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";
export default function Zolo({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={require("../../../assets/Vector.png")}
      >
        <View style={styles.line_top}>
          <Image
            style={[styles.logo, { marginTop: 15 }]}
            source={require("../../../assets/start_screen01.png")}
          />

          <Animated.View
            style={{
              opacity: fadeAnim,
            }}
          >
            <View style={styles.icon_View}>
              <TouchableOpacity style={styles.icon_logo}>
                <Ionicons
                  style={[styles.icon]}
                  name="chatbubble-ellipses-sharp"
                  size={100}
                  color="#0068FF"
                />
              </TouchableOpacity>
              <Text style={[styles.text, styles.text_shadow]}>
                Chào mừng bạn!
              </Text>
            </View>
          </Animated.View>

          <View style={styles.view_Icon}>
            <Image
              style={styles.logo}
              source={require("../../../assets/start_screen.png")}
            />
          </View>
        </View>
        <View style={styles.line}>
          <View style={styles._touchableOpacity}>
            <Animated.View
              style={{
                opacity: fadeAnim,
              }}
            >
              <Text style={[styles.text_start, styles.text_shadow]}>
                Khám phá ngay
              </Text>
            </Animated.View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Ionicons
                style={styles.iconBtn}
                name="chevron-forward-circle-outline"
                size={60}
                color="#0a937e"
              />
            </TouchableOpacity>
          </View>
          <Image
            style={[styles.logo]}
            source={require("../../../assets/start_screen_buttom.png")}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  icon_View: {
    justifyContent: "center",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon_logo: {
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 140,
    borderColor: "#36e60e",
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: "#36e60e",
    textShadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    textShadowRadius: 10,
    elevation: 5,
  },
  _touchableOpacity: {
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    height: "50%",
    width: "100%",
    justifyContent: "space-around",
  },
  line_top: {
    height: "50%",
    width: "100%",
    justifyContent: "space-around",
  },
  iconBtn: {
    alignItems: "center",
    shadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textShadowColor: "#0a937e",
  },

  view_Icon: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  logo: {
    marginHorizontal: 15,
  },
  text: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "#0068FF",
  },
  text_start: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "500",
    color: "#0a937e",
  },
  text_shadow: {
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textShadowColor: "#0068FF",
  },
});
