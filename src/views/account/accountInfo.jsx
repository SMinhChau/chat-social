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
import * as ImagePicker from "expo-image-picker";
import { images } from "../../imgs/index";
import { ImagePickerModal } from "../components/Model/ImagePickerModal";
import { URL } from "../../utils/constant";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/UserSlice";
import { getToken } from "../../utils/function";
import { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function AccountInfo() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user.user);

  const [avatarUrl, setAvatarUrl] = useState();
  const [imageUri, setImageUri] = useState(user.avatar);
  const [visibleBG, setVisibleBG] = useState(false);
  const [coverUri, setCoverUri] = useState(user.coverImage);
  const [coverUrl, setCoverUrl] = useState();
  const [checkAvatar, setCheckAvatar] = useState("");
  const [checkCover, setCheckCover] = useState("");
  const [gender, setGender] = useState("");

  const onAvatarLibrary = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });

    console.log("avatar image", result.uri);
    setCheckAvatar(result.uri);
    //   onCheckImg();
    setAvatarUrl(result.base64);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  }, []);

  const onBacgroundLibrary = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 4],
      quality: 1,
      base64: true,
    });

    console.log("cover image", result.uri);
    setCheckCover(result.uri);
    // onCheckCover();
    setCoverUrl(result.base64);

    if (!result.cancelled) {
      setCoverUri(result.uri);
    }
  }, []);

  const handleUpdateAvatar = async (name, avatar, coverImage, id) => {
    axios
      .put(
        `${URL}/api/user/update`,
        {
          name: user.name,
          avatar: checkAvatar + avatarUrl,
          coverImage: user.coverImage,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Res", res);
        console.log("cập nhật avatar thành công");
        dispatch(updateUser(res.data.data));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateCover = async (name, avatar, coverImage, id) => {
    axios
      .put(
        `${URL}/api/user/update`,
        {
          name: user.name,
          avatar: user.avatar,
          coverImage: checkCover + coverUrl,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Res", res);
        console.log("cập nhật ảnh bìa thành công");
        dispatch(updateUser(res.data.data));
      })
      .catch((err) => console.log(err));
  };

  //camera
  // const permisionFunction = async () => {
  //     // here is how you can get the camera permission

  //     const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
  //     console.log(imagePermission.status);

  //     setGalleryPermission(imagePermission.status === 'granted');

  //     if (imagePermission.status !== 'granted') {
  //       alert('Permission for media access needed.');
  //     }
  //   };

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
      {/* cover image */}
      <View style={styles.backgroundImg}>
        {coverUri ? (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: coverUri }}
          />
        ) : (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={images.cover}
          />
        )}
        <View style={styles.buttonCover}>
          <TouchableOpacity
            style={styles.btnCover}
            onPress={() => {
              setVisibleBG(true);
            }}
          >
            <Text style={styles.textCover}>Tải lên</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCover}
            onPress={() => {
              handleUpdateCover();
            }}
          >
            <Text style={styles.textCover}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* avatar image */}
      <View style={styles.containerImg}>
        {imageUri ? (
          <Image style={styles.avatar} source={{ uri: imageUri }} />
        ) : (
          <Image style={styles.avatar} source={images.avatar} />
        )}
        <TouchableOpacity
          style={styles.buttonAvatar}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.textAvatar}>Tải lên</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonAvatar}
          onPress={() => handleUpdateAvatar()}
        >
          <Text style={styles.textAvatar}>Cập Nhật</Text>
        </TouchableOpacity>
      </View>

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

      {/* Modal option */}
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onAvatarLibrary}
      />
      <ImagePickerModal
        isVisible={visibleBG}
        onClose={() => setVisibleBG(false)}
        onImageLibraryPress={onBacgroundLibrary}
      />

      <View style={styles.containerBtnEdit}>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => {
            navigation.navigate("EditAccountInfo");
          }}
        >
          <Text style={styles.textBtnName}>Chỉnh sửa</Text>
          <Ionicons style={{ fontSize: 25 }} name="create-outline"></Ionicons>
        </TouchableOpacity>
      </View>

      {/* button back */}
      <View style={styles.title}>
        <TouchableOpacity
          style={styles.touchBack}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image
            source={require("../../imgs/left-arrow.png")}
            style={styles.imgIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImg: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderBottomWidth: 2,
  },

  containerImg: {
    width: 100,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  avatarBorder: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#000",
    borderWidth: 2,
    marginHorizontal: 20,
  },

  touchBack: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    width: 35,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    margin: 10,
    left: 0,
  },

  imgIcon: {
    height: 30,
    width: 30,
  },

  textNameUser: {
    fontSize: 18,
    fontWeight: "bold",
  },

  editAvatar: {
    width: 25,
    height: 25,
  },

  editBackground: {
    width: 30,
    height: 30,
  },

  buttonAvatar: {
    width: 100,
    height: 35,
    backgroundColor: "#0573ff",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  editAvatar: {
    width: 25,
    height: 25,
  },

  editBackground: {
    width: 30,
    height: 30,
  },

  buttonAvatar: {
    width: 100,
    height: 35,
    backgroundColor: "#0573ff",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  textAvatar: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },

  buttonCover: {
    position: "absolute",
    right: 5,
    bottom: 12,
    flexDirection: "row",
    width: 170,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  btnCover: {
    height: 20,
    width: 75,
    marginRight: 10,
    borderWidth: 1,
    backgroundColor: "#0573ff",
    borderRadius: 5,
  },

  textCover: {
    width: 75,
    textAlign: "center",
    color: "white",
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
});
