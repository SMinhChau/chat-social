import { SafeAreaView, StyleSheet, StyleShet, Text, View } from "react-native";

import { headerBar, primaryColor } from "../../utils/color";
import Header from "../components/Header";
import AccountItem from "./AccountItem";

function AccountSercuriery({ navigation }) {
  return (
    <SafeAreaView>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.title}>Tài khoản và bảo mật </Text>
      </Header>
      <Text style={styles.title_item}>Tài khoản</Text>
      <AccountItem
        text="Đổi mật khẩu"
        onPress={() => navigation.navigate("ChangePass")}
      ></AccountItem>
      <View style={styles.line}></View>
    </SafeAreaView>
  );
}

export default AccountSercuriery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    paddingLeft: 20,
    fontSize: 22,
    fontWeight: "500",
    color: `${primaryColor}`,
  },
  title_item: {
    fontSize: 18,
    fontWeight: "500",
    color: `${headerBar}`,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
