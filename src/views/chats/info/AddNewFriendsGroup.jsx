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
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AvatarDefault, URL } from "../../../utils/constant";
import * as ImagePicker from "expo-image-picker";
import { headerBar, subprimaryColor } from "../../../utils/color";
import { Formik } from "formik";

import { useDispatch } from "react-redux";
import { getMyFriends } from "../../../redux/slices/FriendSlice";

import { useEffect } from "react";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../../../utils/function";
import AddFriendGroup from "../../components/Model/group/AddFriendGroup";
import AddNewFriendItem from "./AddNewFriendItem";
import { updateUserChat } from "../../../redux/slices/UserChatSlice";
import { getConversationAllByToken } from "../../../redux/slices/ConversationSlice";

function AddNewFriendsGroup({ navigation, route }) {
  const [isloading, setIsloading] = useState(false);

  const [listFriend, setLisFriend] = useState([]);
  const [listFriendSource, setLisFriendSource] = useState([]);
  const [listIdMemberCreate, setListIdMemberCreate] = useState([]);
  const [isFriend, setIsFriend] = useState([]);

  const dispatch = useDispatch();
  const { haveFriends } = route.params;
  const { conversationId } = route.params;

  // Get list Friend
  useEffect(() => {
    setIsloading(true);
    dispatch(getMyFriends()).then((data) => {
      setLisFriend(data.payload);
      setLisFriendSource(data.payload);
      setIsloading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    setIsFriend(listFriend);
  }, [isFriend]);

  const getListIdMemberCreate = (checked, id) => {
    console.log("====> member adđ: " + checked + "-" + id);
    let listTemp = listIdMemberCreate;
    if (checked) {
      listTemp.push(id);
    } else {
      listTemp = listTemp.filter((x) => x != id);
    }
    setListIdMemberCreate([...listTemp]);
    console.log("====> List member add: " + listIdMemberCreate);
  };

  const handleSuccess = () => {
    navigation.navigate("Home");
  };
  const handleAddFriendGroup = async () => {
    console.log("HandleAddFriendGroup");
    try {
      const { data } = await axios.post(
        `${URL}/api/conversation/add-member-conversation-group`,
        {
          conversationId: conversationId,
          listMemberId: listIdMemberCreate,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            Accept: "application/json",
          },
        }
      );
      dispatch(updateUserChat(data.data));
      dispatch(getConversationAllByToken(await getToken()));
      Alert.alert("Thông báo", "Thêm thành viên thành công");
      handleSuccess();
    } catch (error) {
      Alert.alert("Thông báo", "Thêm  thành viên thất bại");
    }
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
        <Text style={styles.title}>Thêm thành viên</Text>
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

      <View style={[styles.box, { height: "60%" }]}>
        <Text style={styles.box_title}>Danh bạ</Text>
        {isloading ? (
          <View style={[]}>
            <ActivityIndicator size={"small"} />
          </View>
        ) : (
          <>
            {/* List Friend */}

            {listFriend ? (
              <FlatList
                style={[styles.contentFlatList]}
                data={listFriend}
                renderItem={({ item, index }) => (
                  <AddNewFriendItem
                    key={index}
                    data={listFriend}
                    navigation={navigation}
                    name={item.name}
                    avatar={item.avatar}
                    idItem={item.id}
                    getListIdMemberCreate={getListIdMemberCreate}
                    haveFriends={haveFriends}
                    keyExtractor={(item, index) => index}
                  />
                )}
              />
            ) : (
              <Text style={styles.text_friend}>Chưa có bạn bè</Text>
            )}
          </>
        )}
      </View>
      {listIdMemberCreate.length > 0 ? (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={handleAddFriendGroup} style={styles.btn}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Thêm vào nhóm
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

export default AddNewFriendsGroup;
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
  btn: {
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
    fontSize: 14,
  },
});
