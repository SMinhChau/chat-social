import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView, Alert,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { URL } from "../../utils/constant";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { primaryColor } from "../../utils/color";

export default function RegisterPhone() {
  const navigation = useNavigation();
  const [phoneNum, setPhoneNum] = useState("");
  const [checkValidPhone, setCheckValidPhone] = useState(false);

  const handleCheckPhone = (text) => {
    let regex = /^0[1-9][0-9]{8}$/;

    setPhoneNum(text);
    if (regex.test(text)) {
      setCheckValidPhone(false);
    } else {
      setCheckValidPhone(true);
    }
  };

  const handleSubPhoneNumber = async () => {
    axios.get(`${URL}/api/user/existed/${phoneNum}`).then((res) => {
      if(res.data.data) {
        Alert.alert("Số điện thoại này đăng ký tài khoản");
      } else {
        axios
          .post(
            `${URL}/api/auth/send-otp-verify-phone-number/${phoneNum}`
          )
          .then((res) => {
            console.log("Res: ", res);
            console.log("Đã gửi SĐT đi");
            AsyncStorage.setItem("res.data.data", JSON.stringify(res.data.data));
            navigation.navigate("OtpAuth",{'phoneNumber':phoneNum});
          })
          .catch((err) => Alert.alert("Đã có lỗi xảy ra!"));
      }

    }).catch((err) => {
      Alert.alert("Đã có lỗi xảy ra!");
    })
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.title}>Đăng ký</Text>
      </Header>

      <View style={styles.noteText}>
        <Text>Xác thực số điện thoại</Text>
      </View>

      <KeyboardAvoidingView style={styles.formRegis}>
        <Text style={styles.textPhone}>Số điện thoại:</Text>
        <TextInput
          style={styles.inputPhoneNumber}
          keyboardType="numeric"
          placeholder="Vui lòng nhập số điện thoại"
          value={phoneNum}
          onChangeText={(text) => {
            handleCheckPhone(text);
          }}
        />

        {checkValidPhone ? (
          <Text style={{ height: 20, color: "red" }}>
            Số điện thoại không hợp lệ
          </Text>
        ) : (
          <Text style={{ height: 20 }}> </Text>
        )}

        {/* <TouchableOpacity style={styles.buttonSub} onPress={() => {handleSubPhoneNumber(phoneNum)}}>
          <Text style={styles.textNext}>Tiếp theo</Text>
          <Ionicons name='chevron-forward-outline' style={{fontSize:25, color:'white', flex:2}}/>
        </TouchableOpacity> */}

        {phoneNum == "" || checkValidPhone == true ? (
          <TouchableOpacity
            disabled
            style={styles.buttonSubDisable}
            // onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.textNext}>Tiếp theo</Text>
            <Ionicons
              name="chevron-forward-outline"
              style={{ fontSize: 25, color: "white", flex: 2 }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonSub}
            onPress={handleSubPhoneNumber}
          >
            <Text style={styles.textNext}>Tiếp theo</Text>
            <Ionicons
              name="chevron-forward-outline"
              style={{ fontSize: 25, color: "white", flex: 2 }}
            />
          </TouchableOpacity>
        )}

        <View style={styles.loginLink}>
          <Text>Bạn đã có tài khoản? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "#0573ff", fontStyle: "italic" }}>
              Đăng nhập.
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    paddingLeft: 20,
    fontSize: 22,
    fontWeight: "500",
    color: `${primaryColor}`,
  },

  imgIcon: {
    height: 29,
    width: 29,
  },

  textTitle: {
    fontSize: 22,
    color: "white",
    height: 40,
    width: "62%",
    paddingTop: 4,
  },

  touchBack: {
    width: "12%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  noteText: {
    width: "100%",
    height: 30,
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    paddingLeft: 8,
  },

  formRegis: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    marginTop: 30,
  },

  inputPhoneNumber: {
    borderWidth: 1,
    width: "90%",
    height: 45,
    fontSize: 17,
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 10,
    borderColor: "#0573ff",
  },

  buttonSub: {
    width: "50%",
    height: 43,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0573ff",
    borderRadius: 50,
    marginTop: 35,
  },

  buttonSubDisable: {
    width: "50%",
    height: 43,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderRadius: 50,
    marginTop: 35,
  },

  textNext: {
    fontSize: 18,
    color: "#fff",
    flex: 12,
    textAlign: "center",
  },

  textPhone: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    width: "90%",
    color: "#0573ff",
  },

  loginLink: {
    width: "100%",
    marginTop: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
});
