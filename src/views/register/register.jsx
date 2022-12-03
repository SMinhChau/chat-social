import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import RadioForm from "react-native-simple-radio-button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { URL } from "../../utils/constant";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateContentChat } from "../../redux/slices/ChatSlice";
import { SignUpUser } from "../../redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Header from "../components/Header";
import { headerBar, primaryColor } from "../../utils/color";
import Fontisto from "react-native-vector-icons/Fontisto";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import TextInput from "../components/TextInput";
import { useRef } from "react";

export default function Register({ route, navigation }) {
  const { phoneRes } = route.params;
  console.log("phone", phoneRes);

  const [getPassVisible, setPassVisible] = useState(false);
  const dispatch = useDispatch();
  const name = useRef(null);

  //selected
  const options = [
    { label: "Nam", value: false },
    { label: "Nữ", value: true },
  ];

  //Register
  const [gender, setGender] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [visibale, setVisable] = useState(false);

  const {
    isLoading,
    isSuccess,
    isError,
    message: messages,
    user,
  } = useSelector((state) => state.user);

  const onError = (error) => {
    console.log("Could not connect" + error);
  };

  const handleModel = () => {
    setVisable(!visibale);
  };

  // Valid
  const Schema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên"),
    password: Yup.string()
      .min(8, "Mật khẩu nhiều hơn 8 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      validationSchema: Schema,
      initialValues: { name: "", password: "" },
      onSubmit: (values) => {
        const form = {
          name: values.name,
          password: values.password,
          phoneNumber: phoneRes,
          dateOfBirth: moment(selectedDate, ["YYYY/MM/DD"]),
          gender,
        };
        console.log("form", form);
        dispatch(SignUpUser(form)).then((res) => {
          Alert.alert("Thông báo", "Đăng ký thành công");
          navigation.navigate("Login");
        });
      },
    });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={{ justifyContent: "flex-start", flex: 1 }}
        >
          <Header
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.title}>Đăng ký</Text>
          </Header>

          <View style={styles.noteText}>
            <Text>Sử dụng tên thật để bạn bè dễ nhận ra bạn </Text>
          </View>

          <View style={styles.formRegis}>
            <Text style={styles.titleSubmit}>Tên hiển thị:</Text>
            <View
              style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
            >
              <TextInput
                icon="user"
                ref={name}
                placeholder="Nhập tên"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                error={errors.name}
                values={values.name}
                touched={touched.name}
                onSubmitEditing={() => name.current?.focus()}
              />

              {touched.name && errors.name && (
                <Text style={{ color: "red" }}>{errors.name}</Text>
              )}
            </View>

            <View style={styles.inputComponent}>
              <Text style={styles.txt_input}> Ngày sinh:</Text>
              <View style={styles.date_input}>
                <Text style={styles.date}>{selectedDate}</Text>
                <TouchableOpacity onPress={handleModel}>
                  <Fontisto style={{ fontSize: 24 }} name="date" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.componentInput_gender}>
              <Text style={styles.txt_input}> Giới tính:</Text>
              <View style={styles.radio_input}>
                <RadioForm
                  radio_props={options}
                  initial={gender}
                  formHorizontal={true}
                  onPress={(value) => {
                    setGender(value);
                  }}
                />
              </View>
            </View>

            <Text style={styles.titleSubmit}>Mật khẩu:</Text>
            <View
              style={{ paddingHorizontal: 32, marginBottom: 16, width: "100%" }}
            >
              <TextInput
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

            <TouchableOpacity style={styles.buttonSub} onPress={handleSubmit}>
              <Text style={styles.textRegis}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
          {/* model */}

          {visibale ? (
            <>
              <View style={styles.inputDate}>
                <View style={styles.date_content}>
                  <DatePicker
                    mode="calendar"
                    selected={getFormatedDate(selectedDate, "DD/MM/YYYY")}
                    selectorStartingYear={1967}
                    selectorEndingYear={2012}
                    onSelectedChange={(date) => setSelectedDate(date)}
                    locale="vie"
                  />
                </View>
              </View>
            </>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
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
    alignItems: "center",
    justifyContent: "flex-start",
  },

  inputComponent: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },

  inputDateOfBirth: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "flex-start",
    width: "83%",
    height: 35,
  },

  textDate: {
    fontSize: 15,
    borderWidth: 1,
    width: 100,
    height: 35,
    textAlign: "center",
    borderRadius: 10,
    borderColor: "#0573ff",
  },

  buttonDate: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: "#0573ff",
    borderRadius: 5,
  },

  input: {
    borderWidth: 1,
    width: "90%",
    height: 40,
    fontSize: 17,
    marginLeft: 15,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: "#0537ff",
  },

  buttonSub: {
    width: "55%",
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0573ff",
    borderRadius: 20,
    marginTop: 30,
  },

  txtHide: {
    fontSize: 16,
    bottom: 5,
    right: "55%",
    width: 40,
    textAlign: "right",
    color: "#0573ff",
  },

  textRegis: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#0573ff",
  },

  titleSubmit: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    paddingLeft: 15,
    width: "90%",
    color: "#0573ff",
  },

  titleGender: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 12,
    color: "#0573ff",
  },
  date_input: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  componentInput_gender: {
    width: "90%",

    height: 50,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  txt_input: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "600",
    color: `${headerBar}`,
    marginRight: 10,
  },

  inputDate: {
    width: "100%",
    flexDirection: "row",
  },
  date_content: {
    width: "100%",
    height: 100,
  },
});
