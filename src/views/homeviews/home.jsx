import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  Button,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getConversationAllByToken } from "../../redux/slices/ConversationSlice";
import { saveUserChat } from "../../redux/slices/UserChatSlice";
import ItemConservation from "../components/ItemConservation";
import SearchBar from "../components/SearchBar";
import {
  bgborder,
  bgColor,
  border,
  borderInfor,
  headerBar,
} from "../../utils/color";
import { getToken } from "../../utils/function";
import { AvatarDefault } from "../../utils/constant";

export default function Home({
  navigation,
  clicked,
  searchPhrase,
  setSearchPhrase,
  setCLicked,
}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const { id: userId, accessToken } = useSelector((state) => state.user.user);
  const { conversations } = useSelector((state) => state.conversation);
  const { userChat } = useSelector((state) => state.userChat);

  useEffect(() => {
    dispatch(getConversationAllByToken(accessToken));
  }, [dispatch]);

  useEffect(() => {
    if (conversations.length) {
      if (!userChat) dispatch(saveUserChat(conversations[0]));
    }
  }, [conversations]);

  return (
    <SafeAreaView style={styles.home__content}>
      <SearchBar navigation={navigation} user={userId} />
      <View style={styles.content__FlatList}>
        {conversations.length ? (
          <ScrollView style={styles.scrollView} horizontal={false}>
            <>
              {conversations.map((conversation, index) => (
                <ItemConservation
                  style={styles.FlatList}
                  navigation={navigation}
                  isLoading={isLoading}
                  key={index}
                  avatar={conversation.avatar}
                  name={conversation}
                  index={conversation.id}
                  userIdCurrent={userId}
                  {...conversation}
                />
              ))}
            </>
          </ScrollView>
        ) : (
          <View style={[styles.conversations_found]}>
            <Text style={[styles.text_friend]}>Chưa có bạn bè!</Text>
            <Image source={{ uri: AvatarDefault }} style={styles.imgMessage} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Search bar
  home__content: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },

  // List
  content__FlatList: {
    height: "100%",
    width: "100%",
    display: "flex",
    backgroundColor: "#F7F7F7",
    justifyContent: "center",

    alignItems: "center",
    flexDirection: "column",
  },
  scrollView: {
    width: "100%",
    height: "80%",
    display: "flex",
  },
  // View Chat
  Main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchComponent: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSearch: {
    flexDirection: "row",
    flex: 9,
    backgroundColor: `${headerBar}`,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttonSetting: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
    backgroundColor: `${headerBar}`,
  },

  textSearch: {
    fontSize: 16,
    color: "#bebebe",
  },
  conversations_found: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text_friend: {
    fontSize: 18,
    fontStyle: "italic",
  },
  imgMessage: {
    resizeMode: "contain",
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
