import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

import { useFormik } from "formik";
import { useRef } from "react";
import { SignInUser } from "../../redux/slices/UserSlice";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { updateContentChat } from "../../redux/slices/ChatSlice";
import { URL } from "../../utils/constant";
export default function Login({ navigation }) {
  const [getPassVisible, setPassVisible] = useState(false);
  const password = useRef(null);
  const dispatch = useDispatch();

  const {
    isLoading,
    isSuccess,
    isError,
    message: messages,
    user,
  } = useSelector((state) => state.user);

  const LoginSchema = Yup.object().shape({
    phoneNumber: Yup.string().matches(
      /^0[0-9]{9}$/,
      "Vui lòng nhập số điện thoại của bạn!"
    ),
    password: Yup.string().required("Vui lòng nhập mật khẩu của bạn!"),
  });

  const onFinish = async (values) => {
    dispatch(SignInUser({ user: values }));
  };
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { phoneNumber: "", password: "" },
      onSubmit: (values) => {
        onFinish(values);
        console.log(values);
      },
    });

  //   Connect Socket
  const onError = (error) => {
    console.log("Could not connect" + error);
  };
  const onConnected = () => {
    console.log(" ======== connected ==========: ");
    global.stompClient.subscribe(`/user/${user.id}/chat`, function (chat) {
      const message = JSON.parse(chat.body);
      dispatch(updateContentChat(message));
    });
  };

  useEffect(() => {
    if (isSuccess) {
      var sock = new SockJS(`${URL}/ws`);
      global.stompClient = Stomp.over(sock);

      navigation.navigate("Home");
      console.log(messages);

      console.log(" ======== stompClient.connect ==========: ");
      global.stompClient.connect(onError, onConnected);
    }
    if (isError) {
      console.log(messages);
      Alert.alert("Thông báo", messages);
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity
          style={styles.touchBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../../imgs/left-arrow.png")}
            style={styles.imgIcon}
          />
        </TouchableOpacity>

        <Text style={styles.textTitle}>Đăng nhập</Text>
      </View>

      <View style={styles.noteText}>
        <Text>Kết nối với bạn bè ngay!</Text>
      </View>

      {/* Form */}

      <View style={{ width: "100%" }}>
        <View
          style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
        >
          <TextInput
            icon="phone"
            placeholder="Nhập số điện thoại"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange("phoneNumber")}
            onBlur={handleBlur("phoneNumber")}
            error={errors.phoneNumber}
            values={values.phoneNumber}
            touched={touched.phoneNumber}
            onSubmitEditing={() => password.current?.focus()}
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
          )}
        </View>

        <View
          style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
        >
          <TextInput
            ref={password}
            icon="key"
            placeholder="Nhập mật khẩu"
            autoCompleteType="password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            values={values.password}
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            secureTextEntry={getPassVisible ? false : true}
          />

          {touched.password && errors.password && (
            <Text style={{ color: "red" }}>{errors.password}</Text>
          )}
        </View>
      </View>

      <Button label="ĐĂNG NHẬP" disabled={isLoading} onPress={handleSubmit} />

      {/* <View style={styles.formLogin}>
        <TextInput
          style={styles.inputNumber}
          value={phoneNumber}
          keyboardType="numeric"
          placeholder="Số điện thoại"
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <View style={styles.formPass}>
          <TextInput
            style={styles.inputPass}
            value={password}
            placeholder="Mật khẩu"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={getPassVisible ? false : true}
          />

          <TouchableOpacity
            style={{ fontSize: 26, right: "50%" }}
            onPress={() => {
              setPassVisible(!getPassVisible);
            }}
          >
            {getPassVisible ? (
              <Text style={styles.txtHide}>Ẩn</Text>
            ) : (
              <Text style={styles.txtHide}>Hiện</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonSub} onPress={handleSubmit}>
          <Text style={styles.textLogin}>Đăng nhập</Text>
        </TouchableOpacity>
 */}
      <View style={styles.regisLink}>
        <Text>Bạn không có tài khoản? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegisterPhone");
          }}
        >
          <Text style={{ color: "#0573ff", fontStyle: "italic" }}>
            Đăng Ký.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    width: "100%",
    height: 40,
    backgroundColor: "#0573ff",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  imgIcon: {
    height: 29,
    width: 29,
  },

  textTitle: {
    fontSize: 22,
    color: "white",
    height: 40,
    width: "30%",
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

    paddingHorizontal: 15,
    marginHorizontal: 15,
  },

  formLogin: {
    width: "90%",
    height: "47%",
    justifyContent: "flex-start",
    marginTop: 50,
  },

  formPass: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  inputName: {
    borderBottomWidth: 1,
    width: "90%",
    height: 35,
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10,
  },

  inputNumber: {
    borderBottomWidth: 1,
    width: "90%",
    height: 35,
    fontSize: 15,
    marginLeft: 15,
    marginVertical: 10,
  },

  inputPass: {
    borderBottomWidth: 1,
    width: "90%",
    height: 35,
    fontSize: 15,
    marginLeft: 15,
  },

  buttonSub: {
    width: "60%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0573ff",
    borderRadius: 20,
    marginTop: 30,
    left: "20%",
  },

  txtHide: {
    fontSize: 16,

    backgroundColor: "pink",

    textAlign: "right",
  },

  textLogin: {
    fontSize: 18,
    color: "#fff",
  },

  titleSubmit: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },

  regisLink: {
    width: "100%",
    marginTop: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
});
