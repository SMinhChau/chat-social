import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { border, headerBar, primaryColor } from "../../../utils/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../components/Header";

import GroupManageItem from "./GroupManageItem";
import { URL } from "../../../utils/constant";
import { getToken } from "../../../utils/function";
import { updateUserChat } from "../../../redux/slices/UserChatSlice";
import { getConversationAllByToken } from "../../../redux/slices/ConversationSlice";
import { useEffect } from "react";
import { useState } from "react";

function GroupManage({ navigation, route }) {
  const { adminId } = route.params;
  const { conversationId } = route.params;
  const { userChat } = useSelector((state) => state.userChat);
  const [haveFriends, setHaaveFriends] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setHaaveFriends(userChat?.listMember);
  }, [haveFriends]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.title}>Thành viên</Text>
      </Header>

      <View style={[styles.conten, styles.flex]}>
        <TouchableOpacity
          style={styles.touch_frend}
          onPress={() =>
            navigation.navigate("AddNewFriendsGroup", {
              haveFriends,
              conversationId,
            })
          }
        >
          <View style={styles.button}>
            <Ionicons name="people-outline" size={30} color="#fff" />
          </View>
          <Text style={styles.title_add}>Thêm thành viên</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line_item}></View>

      {/* List MemberGroup */}

      <View style={[styles.box, { height: "60%" }]}>
        <Text style={styles.box_title}>Tất cả thành viên</Text>
        {userChat?.listMember ? (
          <FlatList
            style={[styles.contentFlatList]}
            data={userChat?.listMember}
            renderItem={({ item, index }) => (
              <GroupManageItem
                key={index}
                index={item.id}
                id={item.id}
                userCurrentId={user.id}
                name={item.name}
                userChatAdmin={userChat.id}
                avatar={item.avatar}
                idConservation={conversationId}
                adminIdGroup={adminId}
                idItem={item.id}
                keyExtractor={(item, index) => index}
              />
            )}
          />
        ) : (
          <Text style={styles.text_friend}>Chưa có bạn bè</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default GroupManage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    paddingLeft: 20,
    fontSize: 22,
    fontWeight: "500",
    color: `${primaryColor}`,
  },

  //   Content Add frine
  box: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  box_title: {
    fontSize: 20,
    color: `${headerBar}`,
    fontWeight: "600",
  },
  conten: {
    width: "90%",

    height: "9%",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  touch_frend: {
    width: "100%",
    height: "95%",
    flexDirection: "row",
    alignItems: "center",
  },
  title_add: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    paddingHorizontal: 15,
    height: 47,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: `${headerBar}`,
  },
  line_item: {
    width: "100%",
    height: 3,
    backgroundColor: `${border}`,
  },
});
