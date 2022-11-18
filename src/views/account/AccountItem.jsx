import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  bgborder,
  headerBar,
  primaryColor,
  subprimaryColor,
  textTitle,
} from "../../utils/color";
function AccountItem({ onPress, navigation, children, text }) {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.left}>
          <Text style={styles.left__title}> {text}</Text>
          {children}
        </View>
        <View style={styles.right}>
          <Ionicons
            name="ios-chevron-forward"
            style={[styles.icon, { fontSize: 24, color: "gray" }]}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

export default AccountItem;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    borderBottomColor: `${bgborder}`,
    borderBottomWidth: 2,
  },
  left: {
    width: "70%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  right: {
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  left__title: {
    fontSize: 16,
    color: "#000",
  },
});
