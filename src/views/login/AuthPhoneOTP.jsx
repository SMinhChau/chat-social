import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { primaryColor } from "../../utils/color";
import Header from "../components/Header";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useRef } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import axios from "axios";
import { URL } from "../../utils/constant";

function AuthPhoneOTP({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const phoneNumberRef = useRef(null);
  const dispatch = useDispatch();

  // Valid
  const Schema = Yup.object().shape({
    OTP: Yup.string()
      .required("Vui lòng nhập mã")
      .min(6, "Mã gồm 6 ký tự")
      .max(6, "Mã gồm 6 ký tự"),
  });

  const onFinish = async (values) => {
    setIsLoading(true);
    navigation.navigate("AuthNewPass", {
      phoneNumber: route.params.phoneNumber,
    });
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      validationSchema: Schema,
      initialValues: { OTP: "" },
      onSubmit: (values) => {
        axios
          .post(`${URL}/api/auth/verify-otp-phone-number`, {
            phoneNumber: route.params.phoneNumber,
            otp: values.OTP,
          })
          .then((res) => {
            if (res.data.data) {
              onFinish(values);
            } else {
              Alert.alert("Mã OTP không đúng!");
            }
          })
          .catch((err) => {
            console.log(err.response.status);
            Alert.alert("Mã OTP không đúng!");
          });
      },
    });

  return (
    <SafeAreaView>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.title}>Mã xác thực </Text>
      </Header>
      {/* Form */}
      <View style={styles.content_Bottom}>
        <View style={{ width: "100%" }}>
          {/* Check phone */}
          <View style={{ width: "100%" }}>
            <Text style={styles.title_pass}>Nhập mã xác thực</Text>
          </View>
          <View
            style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
          >
            <TextInput
              ref={phoneNumberRef}
              placeholder="Nhập mã OTP"
              onChangeText={handleChange("OTP")}
              onBlur={handleBlur("OTP")}
              error={errors.OTP}
              touched={touched.OTP}
              values={values.OTP}
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
            />

            {touched.OTP && errors.OTP && (
              <Text style={{ color: "red" }}>{errors.OTP}</Text>
            )}
          </View>
        </View>

        <View style={styles.regisLink}>
          <Button
            label="XÁC NHẬN"
            disabled={isLoading}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AuthPhoneOTP;

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
  regisLink: {
    justifyContent: "center",
    alignItems: "center",
  },

  content_Bottom: {
    height: "90%",
    marginTop: 20,
  },
  title_pass: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 10,
    marginBottom: 10,
  },
});
