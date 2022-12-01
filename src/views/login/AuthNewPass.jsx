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

function AuthNewPass({ navigation }) {
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

  // Valid
  const Schema = Yup.object().shape({
    changepassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Xác nhận mật khẩu chưa đúng!"
      ),
    }),
    oldPassword: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const onFinish = async (values) => {
    Alert.alert("Đổi mật khẩu thành công");
    navigation.navigate("Login");
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      validationSchema: Schema,
      initialValues: { password: "", changepassword: "", oldPassword: "" },
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
        <Text style={styles.title}>Đổi mật khẩu </Text>
      </Header>
      {/* Form */}
      <View style={styles.content_Bottom}>
        <View style={{ width: "100%" }}>
          {/* Change pass */}
          <View style={{ width: "100%" }}>
            <Text style={styles.title_pass}>Nhập mật khẩu mới</Text>
          </View>
          <View
            style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
          >
            <TextInput
              ref={password}
              icon="key"
              placeholder="Nhập mật khẩu mới"
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
          <View
            style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
          >
            <TextInput
              icon="key"
              placeholder="Nhập lại mật khẩu"
              autoCompleteType="changepassword"
              onChangeText={handleChange("changepassword")}
              onBlur={handleBlur("changepassword")}
              error={errors.changepassword}
              touched={touched.changepassword}
              values={values.changepassword}
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              secureTextEntry={getPassVisible ? false : true}
            />

            {touched.changepassword && errors.changepassword && (
              <Text style={{ color: "red" }}>{errors.changepassword}</Text>
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

export default AuthNewPass;

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
