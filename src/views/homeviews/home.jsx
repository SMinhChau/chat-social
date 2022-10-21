import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getConversationAllByToken } from "../../redux/slices/ConversationSlice";
import { saveUserChat } from "../../redux/slices/UserChatSlice";

export default function Home({ navigation }) {
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${global.userInfo.accessToken}`,
  // };
  // const handleLoadConverSations = () => {
  //   axios
  //     .get(`${BASE_URL}/api/conversation/all-of-user`, { headers: headers })
  //     .then((data) => {
  //       // console.log("data==================================");
  //       // console.log(data.data);
  //       setConversations(data.data.data);
  //       // console.log("conversations==================================");
  //       // console.log(conversations);
  //     });
  // };

  const handleDisplayNameConversation = (item) => {
    // if (item.type != 0) {
    //   return item.name;
    // }
    // if (item.listMember[0].id == global.userInfo.id) {
    //   return item.listMember[1].name;
    // } else {
    //   return item.listMember[0].name;
    // }
  };

  useEffect(() => {
    // console.log("Home Us");
    // console.log(global.userInfo);
    // handleLoadConverSations();
  });

  // ++++++++++++++++ redux  ++++++++++++++++
  const dispatch = useDispatch();

  const { id: userId, accessToken } = useSelector((state) => state.user.user);
  const { conversations } = useSelector((state) => state.conversation);

  useEffect(() => {
    dispatch(getConversationAllByToken(accessToken));
  }, []);

  useEffect(() => {
    if (conversations.length) {
      if (!userChat) dispatch(saveUserChat(conversations[0]));
    }
  }, [conversations]);

  return (
    <SafeAreaView>
      <View style={styles.searchComponent}>
        <TouchableOpacity style={styles.buttonSearch}>
          <Ionicons
            name="search-outline"
            style={{ fontSize: 25, marginHorizontal: 10, color: "white" }}
          />
          <Text style={styles.textSearch}>Tìm kiếm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSetting}>
          <Ionicons
            name="settings-outline"
            style={{ fontSize: 25, color: "white" }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {conversations.map((item) => (
          <TouchableOpacity
            style={styles.buttonMessage}
            onPress={() => {
              navigation.navigate("Chats", {
                name: item.id,
              });
            }}
          >
            <Image source={item.avatar} style={styles.imgMessage} />
            <View style={styles.content}>
              <Text style={styles.name}>{item.id}</Text>

              <Text style={styles.textdiscrible}>{item.id}</Text>
            </View>

            <View style={styles.viewTime}>
              <Text style={styles.textdiscrible}>2 phút</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchComponent: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSearch: {
    flexDirection: "row",
    flex: 9,
    backgroundColor: "#0068FF",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttonSetting: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "#0068FF",
  },

  textSearch: {
    fontSize: 16,
    color: "#bebebe",
  },

  buttonMessage: {
    width: "100%",
    height: 80,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
    flexDirection: "row",
    alignItems: "center",
  },

  imgMessage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  //
  content: {
    width: "60%",
    height: "70%",
    justifyContent: "space-around",
  },

  //
  textdiscrible: {
    color: "#6e6e6e",
    fontSize: 17,
  },
  name: {
    color: "#000",
    fontSize: 20,
  },
  // viewTime
  viewTime: {
    width: "20%",
    height: "55%",
  },
});
