import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { URL, AvatarDefault } from "../../../utils/constant";
import { getToken } from "../../../utils/function";
import { useState } from "react";
import { bgborder } from "../../../utils/color";
import { useDispatch } from "react-redux";
import { handleSendToUser } from "../../../redux/slices/FriendSlice";

function AddFrientItem({ name, content, avatar, curentUser, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [icon, setIcon] = useState(true);
  const dispatch = useDispatch();
  // Send request to user

  const handleAddFriend = async () => {
    setIsLoading(true);

    dispatch(handleSendToUser(id)).then((data) => {
      if (data.code == 200) {
        Alert.alert("Gửi lời mời thành công");
        setIcon(false);
      } else {
        setIcon(false);
        Alert.alert("Đã gửi lời mời");
      }
    });

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container__Left}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.imgMessage} />
        ) : (
          <Image source={{ uri: AvatarDefault }} style={styles.imgMessage} />
        )}
        <Text style={styles.container_name}>{name}</Text>
      </View>

      <View style={styles.container__Right}>
        {icon ? (
          <TouchableOpacity>
            <Ionicons
              name="person-add-outline"
              size={24}
              style={styles.icon}
              onPress={handleAddFriend}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export default AddFrientItem;

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgMessage: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  container_name: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
  },
  container__Left: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container__Right: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
    color: "#068FF",
  },
  contentFlatList: {
    flex: 1,
  },
  icon: {
    color: "",
  },
});
