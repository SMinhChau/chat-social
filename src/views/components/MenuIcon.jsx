import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { border } from "../../utils/color";

function MenuIcon({ icon, title, color, onPress }) {
  return (
    <TouchableOpacity style={styles.body} onPress={onPress}>
      {/* <Ionicons name={icon} size={20} /> */}
      {icon}
      <Text style={[styles.title, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: `${border}`,
  },
  title: {
    fontSize: 14,
    padding: 8,
  },
});
export default MenuIcon;
