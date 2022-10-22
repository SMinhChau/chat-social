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
import React, { useEffect, useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getConversationAllByToken } from "../../redux/slices/ConversationSlice";
import { saveUserChat } from "../../redux/slices/UserChatSlice";
import ItemConservation from "../components/ItemConservation";

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const { id: userId, accessToken } = useSelector((state) => state.user.user);
  const { conversations } = useSelector((state) => state.conversation);
  const { userChat } = useSelector((state) => state.userChat);

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
        {conversations.map((conversation, index) => (
          <ItemConservation
            navigation={navigation}
            isLoading={isLoading}
            key={index}
            name={conversation}
            index={conversation.id}
            userIdCurrent={userId}
            {...conversation}
          />
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
});
