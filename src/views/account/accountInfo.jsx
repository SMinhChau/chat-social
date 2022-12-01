import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useCallback } from "react";
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

export default function AccountInfo() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.user.user);

  const [avatarUrl, setAvatarUrl] = useState();
  const [imageUri, setImageUri] = useState(user.avatar);
  const [visibleBG, setVisibleBG] = useState(false);
  const [coverUri, setCoverUri] = useState(user.coverImage);
  const [gender, setGender] = useState("");

  // Avatar
  const [imageAvatar, setImageAvatar] = useState(null);
  const [imageCover, setImageCover] = useState(null);
  const [visible, setVisible] = useState(false);

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
  const [DateFormat, setDateFormat] = useState();
  const convertDateOfBirth = () => {
    const milliseconds = user.dateOfBirth;
    const dateObject = new Date(milliseconds);
    setDateFormat(
      dateObject.getDate() +
        "/" +
        dateObject.getMonth() +
        "/" +
        dateObject.getFullYear()
    );
  };

  //convert gender
  const covertGender = () => {
    if (user.gender === "true" || user.gender === true) {
      setGender("Nam");
    } else if (user.gender === "false" || user.gender === false) {
      setGender("Nữ");
    } else {
      setGender("Khác");
    }
  };

  const [data, setData] = useState();
  async function FreshData() {
    axios
      .get(`${URL}/api/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        dispatch(setData(res.data));
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }

  useEffect(() => {
    FreshData();
    covertGender();
    convertDateOfBirth();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.title}>Trang cá nhân</Text>
      </Header>

      {/* cover image */}
      <View style={styles.cover_image}>
        {coverUri ? (
          <Image style={styles.img} source={{ source: AvatarDefault }} />
        ) : (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={images.cover}
          />
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
            onPress={() => setVisible(!visible)}
          >
            <Text style={styles.text_remove}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content - Info */}

      <View style={styles.infoContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.titleInfo}>Tên hiển thị:</Text>
          <Text style={styles.titleName}>{user.name}</Text>
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
          <Text style={styles.titleName}>{user.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.containerBtnEdit}>
        {visible ? (
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => {
              navigation.navigate("EditAccountInfo");
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
});
