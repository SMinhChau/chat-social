import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { border, primaryColor, primaryColorTitle } from "../../../utils/color";
import { AvatarDefault } from "../../../utils/constant";
import Header from "../../components/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  getConversationAllByToken,
  handleMemberOutGroup,
} from "../../../redux/slices/ConversationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateUserChat } from "../../../redux/slices/UserChatSlice";
import { getToken } from "../../../utils/function";

const Item = ({ title, action, colorItem }) => (
  <>
    <TouchableOpacity onPress={() => action(title.slug)} style={[styles.item]}>
      <View style={[styles.item_View, { color: colorItem ? "red" : "" }]}>
        <Ionicons name={title.icon} size={24} color={title.color} />
        <Text style={styles.item_name}>{title.name}</Text>
      </View>
      <View>
        <Ionicons name="chevron-forward" size={24} />
      </View>
    </TouchableOpacity>
    <View style={styles.line_item}></View>
  </>
);

function InfoChat({ navigation, route }) {
  const { InfoChat } = route.params;
  const { avatarGroup } = route.params;
  const { adminId } = route.params;
  const { userChatId } = route.params;
  const { conversationType } = route.params;
  const { conversationId } = route.params;

  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const { userChat } = useSelector((state) => state.userChat);

  const [menu, setMenu] = useState([
    {
      id: 0,
      name: "Ảnh, file, link đã gửi",
      slug: "AddGroup",
      icon: "person-circle-outline",
    },

    {
      id: 2,
      name: "Cài đặt cá nhân",
      slug: "AccountInfo",
      icon: "settings-outline",
    },
  ]);

  const actionHandler = (data) => {
    navigation.navigate(data);
  };

  const renderItem = ({ item }) => (
    <Item title={item} action={actionHandler} colorItem={item.color} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.title}>Tuỳ chọn</Text>
      </Header>

      <View style={styles.top}>
        {avatarGroup ? (
          <Image source={{ uri: avatarGroup }} style={styles.imgMessage} />
        ) : (
          <Image source={{ uri: AvatarDefault }} style={styles.imgMessage} />
        )}

        <Text
          style={styles.name_Chat}
          numberOfLines={1}
          textAlignVertical="top"
        >
          {InfoChat}
        </Text>
        <View style={styles.flatList_icon}>
          <View style={styles._icon}>
            <TouchableOpacity
              style={styles.tuoch_icon}
              onPress={() => navigation.goBack()}
            >
              {conversationType == 1 ? (
                <>
                  <Ionicons name="people" size={30} />
                  <Text style={styles.top_icon}>Thêm thành viên</Text>
                </>
              ) : (
                <>
                  <Ionicons name="settings-outline" size={30} />
                  <Text style={styles.top_icon}>Cá nhân</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.line}></View>

      {/* To Manager Member Group*/}
      <View style={[styles.item_out]}>
        <TouchableOpacity
          style={[styles.item]}
          onPress={() => {
            navigation.navigate("GroupManage", {
              adminId,
              userChatId,
              conversationId,
            });
          }}
        >
          <Text style={[styles.item_name]}>
            <Ionicons
              name={
                conversationType == 1 ? "people-outline" : "person-add-outline"
              }
              size={24}
            />
            {conversationType == 1 ? "Xem thành viên" : "Thêm vào nhóm"}
          </Text>
          <View>
            <Ionicons name="chevron-forward" size={24} />
          </View>
        </TouchableOpacity>
        <View style={styles.line_item}></View>
      </View>

      {/* Menu */}
      <View style={styles.flatList}>
        <FlatList
          data={menu}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

export default InfoChat;

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
  imgMessage: {
    marginTop: 10,
    height: 80,
    width: 80,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  //   top
  top: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: 250,
  },
  line: {
    width: "100%",
    height: 10,
    backgroundColor: `${border}`,
  },
  line_item: {
    width: "100%",
    height: 3,
    backgroundColor: `${border}`,
  },
  name_Chat: {
    color: `${primaryColorTitle}`,
    fontSize: 20,
    fontWeight: "500",
    paddingVertical: 10,
  },
  flatList: {
    width: "100%",
    paddingHorizontal: 20,
  },
  item: {
    width: "100%",

    paddingVertical: 15,
    marginVertical: 5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  item_View: {
    flexDirection: "row",

    alignItems: "center",
  },
  item_name: {
    paddingLeft: 10,
    fontSize: 18,
    textAlign: "center",
  },
  //   item_icon
  flatList_icon: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
  },
  item_name_icon: {
    width: 100,
  },
  _icon: {},
  tuoch_icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  item_out: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
