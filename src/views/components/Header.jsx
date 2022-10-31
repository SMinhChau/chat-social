import { View, StyleSheet } from "react-native";
import { headerBar } from "../../utils/color";
import Ionicons from "react-native-vector-icons/Ionicons";
function Header({ children, onPress }) {
  return (
    <View style={styles.body}>
      <Ionicons
        name="chevron-back-outline"
        style={[styles.icon, { fontSize: 30, color: "white" }]}
        onPress={onPress}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    backgroundColor: `${headerBar}`,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    alignItems: "center",
    marginLeft: 10,
  },
});
export default Header;
