import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { URL, AvatarDefault } from "../../../../utils/constant";
import { getToken } from "../../../../utils/function";
import { useState } from "react";
import { bgColor, bg_item_frient, headerBar } from "../../../../utils/color";

function AddFriendGroup({id,name, avatar,getListIdMemberCreate}) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked((!checked));
    getListIdMemberCreate(!checked,id);
  }


  return (
    <TouchableOpacity style={styles.container} onPress={handleCheck}>
      {checked ? (
        <Ionicons
          style={{ marginLeft: 10 }}
          name={"radio-button-on-outline"}
          size={25}
          color="#6BC185"
        />
      ) : (
        <Ionicons
          style={{ marginLeft: 10 }}
          name={"md-radio-button-off-outline"}
          size={25}
          color="#6BC185"
        />
      )}

      <View style={styles.container__Left}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.imgMessage} />
        ) : (
          <Image source={{ uri: AvatarDefault }} style={styles.imgMessage} />
        )}
        <Text style={styles.container_name}>{name}</Text>
      </View>

      <View style={styles.container__Right}></View>
    </TouchableOpacity>
  );
}

export default AddFriendGroup;

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginVertical: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 3,
    borderColor: `${bg_item_frient}`,
  },
  imgMessage: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginHorizontal: 15,
    borderWidth:1,
    borderColor: 'black'
  },
  container_name: {
    fontSize: 20,
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
    color: "blue",
    paddingHorizontal: 10,
  },
});
