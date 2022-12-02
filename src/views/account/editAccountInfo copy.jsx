import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import Ionicons from "react-native-vector-icons/Ionicons";
import RadioGroup from "react-native-radio-buttons-group";
import axios from "axios";
import { URL } from "../../utils/constant";
import { getToken } from "../../utils/function";
import { updateUser } from "../../redux/slices/UserSlice";
import Header from "../components/Header";
import { bgborder, bgColor, primaryColor } from "../../utils/color";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

const radioButtonsData = [
  {
    id: "1",
    label: "Nam",
    value: "true",
    color: "#0357ff",
  },
  {
    id: "2",
    label: "Nữ",
    value: "false",
    color: "#0357ff",
  },
];

export default function EditAccountInfo({ route, navigation }) {
  const user = useSelector((state) => state.user.user);
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { imageAvatar } = route.params;
  const { imageCover } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    setName(user.name);
    setGender(user.gender === true ? "Nam" : "Nu");
    setPhoneNumber(user.phoneNumber);
    setSelectedDate(user.dateOfBirth);
  }, [dispatch]);

  const handleUpdateInfo = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  //selected
  const options = [
    { label: "Nam", value: false },
    { label: "Nữ", value: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.title}>Thay đổi thông tin</Text>
      </Header>

      {/* edit infomation */}
      <View style={styles.componentInput}>
        <Text style={styles.txt_input}>Tên</Text>
        <TextInput
          style={styles.inputName}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        ></TextInput>

        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={() => {
            setName("");
          }}
        >
          <Ionicons style={{ fontSize: 30 }} name="close-outline"></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.componentInput}>
        <Text style={styles.txt_input}> Ngày sinh:</Text>
        <View style={styles.inputDate}>
          <Text style={styles.date}>{selectedDate}</Text>
        </View>
      </View>

      <View style={styles.componentInput}>
        {/* <RadioGroup
          radioButtons={radioButtonsData} //pass in our array
          onPress={(value) => setValue(value)}
          layout="row"
        /> */}
        {/* <Text>{radioButtons}</Text> */}
      </View>

      {name == "" ? (
        <TouchableOpacity disabled style={styles.buttonUpdateDis}>
          <Text style={styles.textBtnName}>Cập nhật</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonUpdate}
          onPress={() => {
            handleUpdateInfo();
          }}
        >
          <Text style={styles.textBtnName}>Cập nhật</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  inputName: {
    borderBottomWidth: 1,
    width: "70%",
    height: 40,
    fontSize: 16,
  },

  componentInput: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    flexDirection: "row",
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

  touchBack: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  imgIcon: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
  },

  textTitle: {
    fontSize: 22,
    color: "white",
    height: 40,
    width: "62%",
    paddingTop: 4,
  },

  buttonUpdate: {
    width: "80%",
    height: 35,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0573ff",
    marginTop: 15,
  },

  buttonUpdateDis: {
    width: "80%",
    height: 35,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#afafaf",
    marginTop: 15,
  },

  textBtnName: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },

  buttonIcon: {
    left: -23,
  },
  title: {
    paddingLeft: 20,
    fontSize: 22,
    fontWeight: "500",
    color: `${primaryColor}`,
  },
  inputDate: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "700",
  },
  txt_input: {
    fontSize: 18,
    fontWeight: "500",
    color: `${bgborder}`,
    marginRight: 10,
  },
});
