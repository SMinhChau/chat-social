import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

import { useState } from "react";
import {
  bgborder,
  bgColor,
  bg_item_frient,
  headerBar,
} from "../../../utils/color";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getConversationAllByToken,
  handleMemberOutGroup,
  isLoading,
} from "../../../redux/slices/ConversationSlice";
import { updateUserChat } from "../../../redux/slices/UserChatSlice";
import { useDispatch } from "react-redux";
import { AvatarDefault, URL } from "../../../utils/constant";

function AddNewFriendItem({
  name,
  avatar,
  haveFriends,
  idItem,
  getListIdMemberCreate,
}) {
  const [oldFriend, setOldFriend] = useState(false);
  const [checked, setChecked] = useState(false);

  // Get list friend from member of group
  const [listOldFriend, setListOldFriend] = useState(haveFriends);

  const [icon, setIcon] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    handleCheckMemberOfGroup();
  }, [dispatch]);

  const handleCheckMemberOfGroup = () => {
    listOldFriend.map((x) => {
      if (x.id === idItem) {
        setIcon(false);
      }
    });
  };
  const handleCheck = () => {
    setChecked(!checked);
    getListIdMemberCreate(!checked, idItem);
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.check_view}>
        <View style={styles.container__Left}>
          <View style={styles.avatar_key}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.imgMessage} />
            ) : (
              <Image
                source={{ uri: AvatarDefault }}
                style={styles.imgMessage}
              />
            )}
          </View>
          <Text style={styles.container_name}>{name}</Text>
        </View>
      </View>

      <View style={styles.container__Right}>
        {oldFriend ? null : (
          <>
            {icon ? (
              <TouchableOpacity
                style={[checked ? styles.btn_op : styles.btn]}
                onPress={handleCheck}
              >
                <Text style={styles.text_remove}>Thêm vào nhóm</Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default AddNewFriendItem;

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
  },
  container_name: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
  },
  container__Left: {
    position: "relative",

    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  icon: {
    color: "blue",
    paddingHorizontal: 10,
  },
  key_admin: {
    position: "absolute",
    marginLeft: 40,
    marginTop: 23,
    alignItems: "center",
    justifyContent: "center",
    width: 23,
    height: 23,
    backgroundColor: `${bg_item_frient}`,
    borderRadius: 50,
  },
  avatar_key: {
    position: "relative",
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
  btn_op: {
    opacity: 0.75,
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
  check_view: {
    flexDirection: "row",
  },
});
