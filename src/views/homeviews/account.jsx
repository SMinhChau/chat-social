import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector} from 'react-redux';

export default function Account() {

  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchComponent}>
        <TouchableOpacity style={styles.buttonSearch}>
          <Ionicons
            name="search-outline"
            style={{ fontSize: 25, marginHorizontal: 10, color: "white" }}
          />
          <Text style={styles.textSearch}>Tìm kiếm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSetting}>
          <Ionicons
            name="settings-outline"
            style={{ fontSize: 25, color: "white" }}
          />
        </TouchableOpacity>
      </View>
    
      <TouchableOpacity style={styles.buttonAccount} onPress={() => {navigation.navigate('AccountInfo')}}>
        <Image
          source={{uri: user.avatar}}
          style={styles.imgAccount}
        />
        <View>
          <Text style={{ fontSize: 17 }}>{user.name}</Text>
          <Text style={{ color: "#6e6e6e" }}>Xem trang cá nhân</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonOption}>
        <Ionicons name="wallet-outline" style={styles.iconButton} />
        <View style={styles.textAccount}>
          <Text style={{ fontSize: 17 }}>Ví QR</Text>
          <Text style={{ color: "#6e6e6e" }}>
            Lưu trữ và xuất trình các mã QR quan trọng
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonOption}>
        <Ionicons name="cloud-outline" style={styles.iconButton} />
        <View style={styles.textAccount}>
          <Text style={{ fontSize: 17 }}>Cloud của tôi</Text>
          <Text style={{ color: "#6e6e6e" }}>
            Lưu trữ các tin nhắn quan trọng
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonOption}>
        <Ionicons name="key-outline" style={styles.iconButton} />
        <View style={styles.textAccount}>
          <Text style={{ fontSize: 17 }}>Tài khoản và bảo mật</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonOption}>
        <Ionicons name="lock-closed-outline" style={styles.iconButton} />
        <View style={styles.textAccount}>
          <Text style={{ fontSize: 17 }}>Quyền riêng tư</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  searchComponent: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSearch: {
    flexDirection: "row",
    flex: 9,
    backgroundColor: "#0068FF",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttonSetting: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "#0068FF",
  },

  textSearch: {
    fontSize: 16,
    color: "#bebebe",
  },

  buttonAccount: {
    width: "100%",
    height: 80,
    borderBottomWidth: 8,
    borderColor: "#dbdbdb",
    flexDirection: "row",
    alignItems: "center",
  },

  imgAccount: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginHorizontal: 10,
    marginLeft: 15,
  },

  buttonOption: {
    width: "100%",
    height: 60,
    borderBottomWidth: 0.2,
    borderColor: "#bdbdbd",
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    fontSize: 25,
    marginHorizontal: 10,
    marginLeft: 15,
  },
});
