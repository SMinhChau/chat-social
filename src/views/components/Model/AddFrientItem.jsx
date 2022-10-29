import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { AvatarDefault, URL } from "../../../utils/constant";
import Ionicons from "react-native-vector-icons/Ionicons";

function AddFrientItem({ name, content, avatar, idFriend, closeModal }) {
  const handleAddFriend = async () => {
    const data = await axios
      .post(
        `${URL}/api/friend-request/send-to-user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: "application/json",
          },
        }
      )
      .catch((err) => message.error(err?.response?.data?.messageError));
    if (data.code === 200) message.success("Gửi lời mời thành công");
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
          <Ionicons name="person-add-outline" size={24} color="#0068FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AddFrientItem;

const styles = StyleSheet.create({
  container: {
    height: 60,
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
  },
});
