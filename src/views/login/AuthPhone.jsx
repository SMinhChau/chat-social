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

function AuthPhone({ navigation }) {
  const [getPassVisible, setPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const phoneNumberRef = useRef(null);
  const dispatch = useDispatch();

  // Valid
  const Schema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Vui lòng nhập mật khẩu của bạn!")
      .matches(/^0[0-9]{9}$/, "Số điện thoại chưa đúng định dạng!"),
  });

  const onFinish = async (values) => {
    setIsLoading(true);
    navigation.navigate("AuthPhoneOTP");
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      validationSchema: Schema,
      initialValues: { phoneNumber: "" },
      onSubmit: (values) => {
        onFinish(values);
      },
    });

  return (
    <SafeAreaView>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.title}>Xác nhận số điện thoại </Text>
      </Header>
      {/* Form */}
      <View style={styles.content_Bottom}>
        <View style={{ width: "100%" }}>
          {/* Check phone */}
          <View style={{ width: "100%" }}>
            <Text style={styles.title_pass}>Nhập số điện thoại</Text>
          </View>
          <View
            style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
          >
            <TextInput
              ref={phoneNumberRef}
              icon="phone"
              placeholder="Nhập số điện thoại"
              autoCompleteType="phoneNumber"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
              values={values.phoneNumber}
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              secureTextEntry={getPassVisible ? false : true}
            />

            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
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

export default AuthPhone;

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
