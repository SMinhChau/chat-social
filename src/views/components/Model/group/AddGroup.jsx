import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  CheckBox,
  Button,
  FlatList,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AvatarDefault, URL } from "../../../../utils/constant";
import * as ImagePicker from "expo-image-picker";
import { headerBar, subprimaryColor } from "../../../../utils/color";
import { Formik } from "formik";

import { useDispatch } from "react-redux";
import { getMyFriends } from "../../../../redux/slices/FriendSlice";

import { useEffect } from "react";
import AddFriendGroup from "./AddFriendGroup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../../../../utils/function";

function AddGroup({ navigation }) {
  const [image, setImage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [avatar, setAvater] = useState(null);

  const [listFriend, setLisFriend] = useState([]);
  const [listFriendSource, setLisFriendSource] = useState([]);
  const [listIdMemberCreate, setListIdMemberCreate] = useState([]);

  const dispatch = useDispatch();
  //👇🏻 Function that closes the Modal component
  const closeModal = () => {
    navigation.navigate("home");
  };

  //👇🏻 Logs the group name to the console
  const handleCreateRoom = ({ navigation }) => {
    console.log({ groupName });
    closeModal();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    console.log(result);
    if (!result.canceled) {
      setImage("data:image/jpeg;base64," + result.base64);
    }
  };

  // Get list Friend
  useEffect(() => {
    dispatch(getMyFriends()).then((data) => {
      setLisFriend(data.payload);
      setLisFriendSource(data.payload);
      console.log("listFriend", data.payload);
    });
  }, [dispatch]);

  const getListIdMemberCreate = (checked, id) => {
    console.log("====> member create: " + checked + "-" + id);
    let listTemp = listIdMemberCreate;
    if (checked) {
      listTemp.push(id);
    } else {
      listTemp = listTemp.filter((x) => x != id);
    }
    setListIdMemberCreate([...listTemp]);
    console.log("====> List member create: " + listIdMemberCreate);
  };

  const handleCreateConversationGroup = async () => {
    axios
      .post(
        `${URL}/api/conversation/create-group`,
        {
          avatar: image,
          name: groupName,
          listMemberId: listIdMemberCreate,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        Alert.alert("Thông báo", "Tạo nhóm thành công");
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Thông báo", "Đăng ký thất bại");
      });
  };

  const handelSearch = (textSearch) => {
    console.log("===> text search:" + textSearch);
    let listTemp = listFriendSource;
    listTemp = listTemp.filter((x) => {
      if (
        textSearch.search(x.name) != -1 ||
        textSearch.search(x.phoneNumber) != -1
      ) {
        return true;
      }
      return false;
    });
    if (textSearch.trim() == "") {
      setLisFriend([...listFriendSource]);
    } else {
      setLisFriend([...listTemp]);
    }
  };

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Nhóm mới</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.content_avatar}>
          {image ? (
            <Image source={{ uri: image }} style={styles.img} />
          ) : (
            <>
              {avatar ? (
                <Image style={styles.img} source={{ uri: AvatarDefault }} />
              ) : (
                <>
                  <TouchableOpacity onPress={pickImage}>
                    <Ionicons name="camera-sharp" size={30} />
                  </TouchableOpacity>
                </>
              )}
              {/* {image && <Image source={{ uri: image }} style={styles.img} />} */}
            </>
          )}
        </View>

        <View style={styles.content_name}>
          <TextInput
            style={styles.modalinput}
            placeholder="Nhập tên nhóm"
            onChangeText={(value) => setGroupName(value)}
          />
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons
          style={{ marginLeft: 20, fontWeight: "bold" }}
          name="md-search-sharp"
          size={35}
          color="black"
        />
        <View style={{ width: "80%" }}>
          <TextInput
            style={styles.input_search}
            placeholder="Tìm tên hoặc số điện thoại"
            onChangeText={(value) => {
              handelSearch(value);
            }}
          />
        </View>
      </View>

      <View style={{ w: "90%" }}>
        <View style={styles.line}></View>
      </View>
      {/* List Friend */}
      <View style={[styles.box, { height: "60%" }]}>
        <Text style={styles.box_title}>Danh bạ</Text>
        {listFriend ? (
          <FlatList
            style={[styles.contentFlatList]}
            data={listFriend}
            renderItem={({ item, index }) => (
              <AddFriendGroup
                key={index}
                data={listFriend}
                navigation={navigation}
                name={item.name}
                avatar={item.avatar}
                id={item.id}
                getListIdMemberCreate={getListIdMemberCreate}
                keyExtractor={(item, index) => index}
              />
            )}
          />
        ) : (
          <Text style={styles.text_friend}>Chưa có bạn bè</Text>
        )}
      </View>
      {listIdMemberCreate.length > 0 ? (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={handleCreateConversationGroup}
            style={{
              width: 100,
              backgroundColor: "blue",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Tạo
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

export default AddGroup;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
  },
  header: {
    width: "100%",
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "#E3E3E3",
  },
  title: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "500",
  },

  content: {
    width: "100%",
    paddingHorizontal: 10,
    height: 75,
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar: {
    width: "100%",
    paddingVertical: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  content_avatar: {
    height: 55,
    width: 55,
    alignItems: "center",
    backgroundColor: "#E3E3E3",
    justifyContent: "center",
    borderRadius: 50,
  },
  img: {
    height: 55,
    width: 55,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  content_name: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalinput: {
    width: "100%",
    height: 50,
    marginLeft: 10,
    paddingHorizontal: 10,
    fontSize: 22,
    color: `${subprimaryColor}`,
  },
  input_search: {
    width: "90%",
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    backgroundColor: "#E3E3E3",
    borderRadius: 10,
  },
  line: {
    marginTop: 10,
    width: "100%",
    height: 1,
    backgroundColor: "gray",
  },
  box: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  box_title: {
    fontSize: 20,
    color: `${headerBar}`,
    fontWeight: "600",
  },
});
