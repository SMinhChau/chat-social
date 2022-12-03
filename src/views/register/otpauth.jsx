import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { OtpVerify } from "../../redux/slices/OtpSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { primaryColor } from "../../utils/color";

export default function OtpAuth({ navigation, route }) {
  const phone = route.params.phoneNumber;
  const [otpCode, setOtpCode] = useState("");
  // const dispatch = useDispatch();

  // const {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   message: messages,
  //   otps,
  // } = useSelector((state) => state.otps);

  // const onFinish = async (values) => {
  //   dispatch(OtpVerify(values));
  // };

  // const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
  //   useFormik({
  //     // validationSchema: LoginSchema,
  //     initialValues: {otp: "", phoneNumber:""},
  //     onSubmit: (values) => {
  //       onFinish(values);
  //       console.log(values);
  //     },
  //   });

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigation.navigate("Register");
  //     console.log(messages);
  //   }
  //   if (isError) {
  //     console.log(messages);
  //     Alert.alert("Thông báo", messages);
  //   }
  // }, [isLoading, isSuccess, isError]);

  const handleOptAuth = async () => {
    axios
      .post(`${URL}/api/auth/verify-otp-phone-number`, {
        phoneNumber: phone,
        otp: otpCode,
      })
      .then((res) => {
        if (res.data.data) {
          navigation.navigate("Register", { phoneRes: phone });
        } else {
          Alert.alert("Mã OTP không đúng!");
        }
      })
      .catch((err) => {
        console.log(err.response.status);
        Alert.alert("Mã OTP không đúng!");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar styles="auto" />

      <Header
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.title}>Xác nhận OTP</Text>
      </Header>

      <View style={styles.otpContainer}>
        <Text style={styles.noteText}>Nhập mã OTP vừa gửi đến số {phone}</Text>

        {/* <TextInput style={styles.inputCode}
                     keyboardType='numeric'
                     onChangeText={handleChange("otp")}
                     onBlur={handleBlur("otp")}
                     values={values.otp}
                     touched={touched.otp}
                     autoCapitalize="none"
                     keyboardAppearance="dark"
                     returnKeyType="next"
                     returnKeyLabel="next"
                     placeholder='Code'/> */}

        <TextInput
          style={styles.inputCode}
          keyboardType="numeric"
          value={otpCode}
          onChangeText={(text) => {
            setOtpCode(text);
          }}
        />

        <TouchableOpacity
          style={styles.OtpButton}
          onPress={() => {
            handleOptAuth();
          }}
        >
          <Text style={styles.textButton}>Xác Nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputCode: {
    borderWidth: 1,
    borderColor: "#0573ff",
    width: 140,
    height: 55,
    textAlign: "center",
    borderRadius: 15,
    fontSize: 25,
    marginTop: 10,
  },

  container: {
    flex: 1,
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

  imgIcon: {
    height: 29,
    width: 29,
  },

  otpContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  noteText: {
    fontSize: 19,
    // width:'90%',
    paddingVertical: 10,
    borderRadius: 10,
    fontWeight: "bold",
  },

  OtpButton: {
    backgroundColor: "#0573ff",
    width: "50%",
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },

  textButton: {
    color: "white",
    fontSize: 20,
  },

  otpInputContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
  },

  otpBox: {
    borderRadius: 5,
    borderColor: "#0573ff",
    borderWidth: 0.5,
    marginHorizontal: 5,
  },

  title: {
    paddingLeft: 20,
    fontSize: 22,
    fontWeight: "500",
    color: `${primaryColor}`,
  },
});
