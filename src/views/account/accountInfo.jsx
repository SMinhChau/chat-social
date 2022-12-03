import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../imgs/index";
import * as ImagePicker from "expo-image-picker";
import { AvatarDefault, URL } from "../../utils/constant";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/UserSlice";
import { getToken } from "../../utils/function";
import { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { bgColor, headerBar, primaryColor } from "../../utils/color";

export default function AccountInfo({ navigation }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const [imageUri, setImageUri] = useState("");
  const [coverUri, setCoverUri] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [DateFormat, setDateFormat] = useState();

  useEffect(() => {
    setImageUri(user.avatar);
    setCoverUri(user.coverImage);
    setName(user.name);
    setGender(user.gender === true ? "Nữ" : "Nam");
    setPhoneNumber(user.phoneNumber);
    setDateFormat(convertDateOfBirth(user.dateOfBirth));
  }, [dispatch]);

  // Avatar
  const [imageAvatar, setImageAvatar] = useState(null);
  const [imageCover, setImageCover] = useState(null);
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    // console.log(result);
    if (!result.canceled) {
      setImageCover("data:image/jpeg;base64," + result.base64);
    }
  };

  const pickImageAvatar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    // console.log(result);
    if (!result.canceled) {
      setImageAvatar("data:image/jpeg;base64," + result.base64);
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.title}>Trang cá nhân</Text>
      </Header>
      {/* cover image */}
      <View style={styles.cover_image}>
        {coverUri ? (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ source: AvatarDefault }}
          />
        ) : (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={images.cover}
          />
        )}

        {imageCover && (
          <View style={styles.content__cover}>
            <Image
              source={{ uri: imageCover }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        )}

        <View style={styles.content_change_cover}>
          {visible ? (
            <View style={styles.content_chose}>
              <TouchableOpacity onPress={pickImage}>
                <Ionicons name="camera-sharp" size={30} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>

      {/* Avatar */}
      <View style={styles.content_avtar}>
        {imageUri ? (
          <Image style={styles.avatar} source={{ uri: imageUri }} />
        ) : (
          <Image style={styles.avatar} source={images.avatar} />
        )}

        <View style={styles.imageAvtar}>
          <Image source={{ uri: imageAvatar }} style={styles.avatar} />
        </View>

        <View style={styles.content_change_avtar}>
          <View style={styles.chose_View}>
            {visible ? (
              <View style={styles.content_chose}>
                <TouchableOpacity onPress={pickImageAvatar}>
                  <Ionicons name="camera-sharp" size={30} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <Text style={styles.text_remove}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content - Info */}
      <View style={styles.infoContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.titleInfo}>Tên hiển thị:</Text>
          <Text style={styles.titleName}>{name}</Text>
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.titleInfo}>Giới tính:</Text>
          <Text style={styles.titleName}>{gender}</Text>
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.titleInfo}>Ngày Sinh:</Text>
          <Text style={styles.titleName}>{DateFormat}</Text>
        </View>

        <View style={styles.itemInfo}>
          <Text style={styles.titleInfo}>Số điện thoại:</Text>
          <Text style={styles.titleName}>{phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.containerBtnEdit}>
        {visible ? (
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => {
              navigation.navigate("EditAccountInfo", {
                imageAvatar,
                imageCover,
              });
            }}
          >
            <Text style={styles.textBtnName}>Chỉnh sửa</Text>
            <Ionicons style={{ fontSize: 25 }} name="create-outline"></Ionicons>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  avatarBorder: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  infoContainer: {
    width: "100%",
    height: 170,
  },

  itemInfo: {
    width: "90%",
    height: 40,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  titleInfo: {
    width: 130,
    fontSize: 17,
    fontWeight: "bold",
  },

  titleName: {
    width: 250,
    fontSize: 17,
    marginLeft: 20,
  },

  buttonEdit: {
    width: "80%",
    height: 35,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c0c0c0",
  },

  containerBtnEdit: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  textBtnName: {
    fontSize: 17,
    marginHorizontal: 10,
  },
  title: {
    paddingLeft: 20,
    fontSize: 22,
    fontWeight: "500",
    color: `${primaryColor}`,
  },

  // cover_image
  cover_image: {
    width: "100%",
    height: 200,
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  content_change_cover: {
    paddingBottom: 10,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  content_change_avtar: {
    width: "100%",
    paddingTop: 70,
    paddingLeft: 50,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  content_chose: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    marginLeft: 5,
    height: 40,
    opacity: 0.5,
    borderRadius: 50,
    backgroundColor: `${bgColor}`,
  },
  btn: {
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    height: 30,
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: `${headerBar}`,
  },
  text_remove: {
    fontWeight: "500",
    color: "#fff",
  },
  //
  content_avtar: {
    width: "100%",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  avatar: {
    marginTop: 20,
    marginHorizontal: 20,
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  chose_View: {
    width: 50,
  },
  imageAvtar: {
    position: "absolute",
  },
  imageCover: {
    position: "absolute",
  },
  content__cover: {
    position: "absolute",
    width: "100%",
    height: 200,
  },
});
