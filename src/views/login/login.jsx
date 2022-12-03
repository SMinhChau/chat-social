import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Swiper from "react-native-swiper";

import { useRef } from "react";
import { URL } from "../../utils/constant";
import { SignInUser } from "../../redux/slices/UserSlice";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { updateContentChat } from "../../redux/slices/ChatSlice";
import Header from "../components/Header";
import { bgborder, bgColor } from "../../utils/color";

export default function Login({ navigation }) {
  const [getPassVisible, setPassVisible] = useState(false);
  const password = useRef(null);
  const dispatch = useDispatch();
  const [conected, setConected] = useState(false);

  const {
    isLoading,
    isSuccess,
    isError,
    message: messages,
    user,
  } = useSelector((state) => state.user);

  // Valid
  const LoginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Vui lòng nhập mật khẩu của bạn!")
      .matches(/^0[0-9]{9}$/, "Số điện thoại chưa đúng định dạng!"),
    password: Yup.string().required("Vui lòng nhập mật khẩu của bạn!"),
  });
  // 0763879020
  const onFinish = async (values) => {
    dispatch(SignInUser({ user: values }));
  };
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { phoneNumber: "0795815992", password: "11111111" },
      onSubmit: (values) => {
        onFinish(values);
        console.log("Login form " + values);
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
      setConected(true);
      var sock = new SockJS(`${URL}/ws`);
      global.stompClient = Stomp.over(sock);

      navigation.navigate("Home");
      // console.log(messages);

      console.log(" ======== stompClient.connect ==========: ");
      global.stompClient.connect(onError, onConnected);
      setConected(false);
    }
    if (isError) {
      console.log(isError);
      Alert.alert("Thông báo", messages);
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
      >
        <View style={styles.content_Top}>
          <Header
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.title_Header}>Đăng nhập</Text>
          </Header>
          {/* Slide */}
          <View style={styles.content_Slide}>
            <Swiper style={styles.wrapper} showsButtons>
              <View style={styles.slide}>
                <Image
                  style={[styles.logo, { marginTop: 15 }]}
                  source={require("../../../assets/slide_1.png")}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  style={[styles.logo, { marginTop: 15 }]}
                  source={require("../../../assets/slide_z1.png")}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  style={[styles.logo, { marginTop: 15 }]}
                  source={require("../../../assets/slide_2.png")}
                />
              </View>
            </Swiper>
          </View>
        </View>

        {/* Form */}
        <View style={styles.content_Bottom}>
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

          <View style={styles.password_remember}>
            <TouchableOpacity onPress={() => navigation.navigate("AuthPhone")}>
              <Text style={{ color: "#0573ff", fontStyle: "italic" }}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.regisLink}>
            <Button
              label="ĐĂNG NHẬP"
              disabled={isLoading}
              onPress={handleSubmit}
            />
          </View>

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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },

  content_Top: {
    width: "100%",
    height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content_Bottom: {
    width: "100%",
    height: "40%",

    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
  //
  title_Header: {
    width: "80%",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
    color: `${bgColor}`,
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

  // content_Slide
  content_Slide: {
    marginVertical: 10,
    height: 300,
    width: "80%",
    borderColor: "transparent",
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: "#2b3a9d",
    textShadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    height: 300,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    resizeMode: "contain",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  password_remember: {
    paddingHorizontal: 20,
  },
});
