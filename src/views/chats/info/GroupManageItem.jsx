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
import { getToken } from "../../../utils/function";

function GroupManageItem({
  name,
  avatar,
  idConservation,
  idItem,
  userChatId,
  adminIdGroup,
  navigation,
  userChatAdmin,
}) {
  const [admin, setAdmin] = useState(false);
  const [icon, setIcon] = useState(true);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminIdGroup === idItem) {
      setAdmin(true);
    }
    if (adminIdGroup === idItem) {
      setDisable(true);
    }

    handlRemove;
  }, [admin]);

  const handlRemove = async (menberId) => {
    try {
      const { data } = await axios.post(
        `${URL}/api/conversation/remove-member-conversation-group`,
        {
          conversationId: idConservation,
          memberId: idItem,
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
      Alert.alert("Thông báo", "Đã xóa khỏi nhóm");
      setIcon(false);
    } catch (error) {
      setIcon(true);
      Alert.alert("Thông báo", "Chưa rời nhóm");
    }
  };

  const handleUpdateAdminGroup = async (menberId) => {
    try {
      const { data } = await axios.post(
        `${URL}/api/conversation/change-admin-conversation-group`,
        {
          adminId: idItem,
          conversationId: idConservation,
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
      Alert.alert("Thông báo", "Cập nhật trưởng nhóm thành công");
    } catch (error) {
      console.log(error);
      Alert.alert("Thông báo", "Cập nhật trưởng nhóm thất bại");
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleUpdateAdminGroup}
      disabled={disable}
    >
      <View style={styles.container__Left}>
        <View style={styles.avatar_key}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.imgMessage} />
          ) : (
            <Image source={{ uri: AvatarDefault }} style={styles.imgMessage} />
          )}

          {admin ? (
            <View style={styles.key_admin}>
              <Ionicons name="key-outline" size={20} color="#B8860B" />
            </View>
          ) : (
            ""
          )}
        </View>
        <Text style={styles.container_name}>{name}</Text>
      </View>

      {isLoading ? (
        <View style={[]}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : (
        <>
          <View style={styles.container__Right}>
            {admin ? null : (
              <>
                {icon ? (
                  <TouchableOpacity style={styles.btn} onPress={handlRemove}>
                    <Text style={styles.text_remove}>Rời nhóm</Text>
                  </TouchableOpacity>
                ) : null}
              </>
            )}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

export default GroupManageItem;

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
  text_remove: {
    fontWeight: "500",
    fontSize: 14,
  },
});
