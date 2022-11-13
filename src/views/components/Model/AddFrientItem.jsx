import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { URL, AvatarDefault } from "../../../utils/constant";
import { getToken } from "../../../utils/function";
import { useState } from "react";
import { bgborder } from "../../../utils/color";

function AddFrientItem({ name, content, avatar, curentUser, id }) {
  const [isLoading, setIsLoading] = useState(false);

  // Send request to user
  const handleAddFriend = async () => {
    setIsLoading(true);
    console.log(id);
    const data = await axios
      .post(
        `${URL}/api/friend-request/send-to-user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            Accept: "application/json",
          },
        }
      )
      .catch((err) => console.log(err));

    if (data.code === 200) {
      console.log("Gửi lời mời thành công");
    }
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
        <TouchableOpacity>
          <Ionicons
            name="person-add-outline"
            size={30}
            // size={24}
            style={styles.icon}
            onPress={handleAddFriend}
          />
        </TouchableOpacity>
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
