import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import axios from "axios";
import { URL, AvatarDefault } from "../../utils/constant";
import { getToken } from "../../utils/function";
import { bg_item_frient, border, headerBar } from "../../utils/color";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatusFriendsRequest } from "../../redux/slices/FriendSlice";
import { useEffect } from "react";

function AvatarFriendRequest({ name, avatar, idFriend }) {
  const [icon, setIcon] = useState(true);

  const dispatch = useDispatch();

  // Accept Friend Request
  const handleUpdateStatus = () => {
    const data = {
      id: idFriend,
      status: 1,
    };
    setIcon(false);
    dispatch(updateStatusFriendsRequest(data));
  };

  // Deny Friend Request
  const handleUpdateStatusDeny = () => {
    const data = {
      id: idFriend,
      status: -1,
    };
    setIcon(false);
    dispatch(updateStatusFriendsRequest(data));
  };

  return (
    <View style={styles.container}>
      {icon ? (
        <>
          <View style={styles.container__Left}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.imgMessage} />
            ) : (
              <Image
                source={{ uri: AvatarDefault }}
                style={styles.imgMessage}
              />
            )}
          </View>

          <View style={styles.container__Right}>
            <Text style={styles.container_name}>{name}</Text>
            <View style={styles.__Right}>
              <TouchableOpacity
                style={styles.content_title}
                onPress={handleUpdateStatusDeny}
              >
                <Text style={styles.text_friend}>Từ chối</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.content_title_access}
                onPress={handleUpdateStatus}
              >
                <Text style={styles.text_friend}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}

export default AvatarFriendRequest;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginVertical: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imgMessage: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  container_name: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    paddingBottom: 10,
  },
  container__Left: {
    width: "27%",
    flexDirection: "row",
    justifyCotent: "flex-start",
    alignItems: "center",
  },
  container__Right: {
    width: "70%",
    height: 80,
    flexDirection: "column",
    paddingRight: 10,
    color: "#068FF",
    borderBottomWidth: 2,
    justifyContent: "flex-enda",
    borderColor: `${bg_item_frient}`,
  },
  contentFlatList: {
    flex: 1,
  },
  icon: {
    color: "blue",
    paddingHorizontal: 10,
  },

  // btn
  content_title: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 33,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: `${border}`,
  },
  content_title_access: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 33,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: `${headerBar}`,
  },
  __Right: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  text_friend: {
    fontSize: 16,
  },
});
