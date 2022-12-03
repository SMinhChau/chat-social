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
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";

import axios from "axios";
import { URL } from "../../utils/constant";
import { getToken } from "../../utils/function";
import { updateUser } from "../../redux/slices/UserSlice";
import Header from "../components/Header";
import { headerBar, primaryColor } from "../../utils/color";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import RadioForm from "react-native-simple-radio-button";
import { updateUserChat } from "../../redux/slices/UserChatSlice";

export default function EditAccountInfo({ route, navigation }) {
  const user = useSelector((state) => state.user.user);
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [visibale, setVisable] = useState(false);

  const { imageAvatar } = route.params;
  const { imageCover } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    setName(user.name);
    setGender(user.gender === true ? "Nam" : "Nu");
    setSelectedDate(getFormatedDate(user.dateOfBirth, "DD/MM/YYYY"));
  }, [dispatch]);

  //Convert dateOfBirth
  const convertDateOfBirth = (date) => {
    const milliseconds = date;
    const dateObject = new Date(milliseconds);
    const result =
      dateObject.getDate() +
      "/" +
      dateObject.getMonth() +
      "/" +
      dateObject.getFullYear();
    return result;
  };

  const handleModel = () => {
    setVisable(!visibale);
  };

  const handleUpdateInfo = async () => {
    console.log("====userID", user.id);
    console.log("fullName", name);
    console.log("gender", gender);
    console.log("date", moment(selectedDate, ["YYYY/MM/DD"]));

    axios
      .put(
        `${URL}/api/user/update`,
        {
          id: user.id,
          name: name,
          gender: gender,
          dateOfBirth: moment(selectedDate, ["YYYY/MM/DD"]),
          avatar: imageAvatar,
          coverImage: imageCover,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        Alert.alert("Thông báo", "Cập nhật thành công");
        navigation.navigate("AccountInfo");
        dispatch(updateUser(res.data));
      })
      .catch((error) => {
        Alert.alert("Thông báo", "Cập nhật thất bại");
        console.log(error);
      });
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
          navigation.navigate("AccountInfo");
        }}
      >
        <Text style={styles.title}>Thay đổi thông tin</Text>
      </Header>

      {/* edit infomation */}
      <View style={styles.componentInput}>
        <Text style={styles.txt_input}>Tên:</Text>

        <TextInput
          style={styles.inputName}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />

        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={() => {
            setName("");
          }}
        >
          <Ionicons style={{ fontSize: 30 }} name="close-outline"></Ionicons>
        </TouchableOpacity>
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

      <View style={styles.componentInput}>
        <Text style={styles.txt_input}> Ngày sinh:</Text>
        <View style={styles.date_input}>
          <Text style={styles.date}>{selectedDate}</Text>
          <TouchableOpacity onPress={handleModel}>
            <Fontisto style={{ fontSize: 24 }} name="date" />
          </TouchableOpacity>
        </View>
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
      {/* model */}
      {visibale ? (
        <>
          <View style={styles.inputDate}>
            <View style={styles.date_content}>
              <DatePicker
                mode="calendar"
                selected={getFormatedDate(user.dateOfBirth, "DD/MM/YYYY")}
                selectorStartingYear={1967}
                selectorEndingYear={2012}
                onSelectedChange={(date) => setSelectedDate(date)}
                locale="vie"
              />
            </View>
          </View>
        </>
      ) : null}
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
    width: "80%",
    height: 40,
    fontSize: 16,
  },

  componentInput: {
    width: "90%",
    marginVertical: 10,
    height: 50,
    justifyContent: "flex-start",
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
    width: "100%",

    flexDirection: "row",
  },
  date: {
    fontSize: 18,
    marginLeft: 8,
  },
  txt_input: {
    fontSize: 18,
    fontWeight: "600",
    color: `${headerBar}`,
    marginRight: 10,
  },
  date_content: {
    width: "100%",
    height: 100,
  },
  radio_input: {
    width: "50%",
    flexDirection: "row",
  },
  componentInput_gender: {
    width: "90%",
    marginVertical: 10,
    height: 50,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  date_input: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
