import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { bgColor, headerBar, primaryColor } from "../../../utils/color";
import Header from "../Header";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getFriendsRequest } from "../../../redux/slices/FriendSlice";
import AvatarFriendRequest from "../AvatarFriendRequest";
import { FlatList } from "react-native";
import { useEffect } from "react";
import { URL } from "../../../utils/constant";
import axios from "axios";
import { friendListSelector } from "../../../redux/selector";
import { useSelector } from "react-redux";

function FriendRequest({ navigation }) {
  const layout = useWindowDimensions();
  const [friendRequest, setFriendRequest] = useState([]);
  const [index, setIndex] = useState(0);
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [routes] = useState([
    { key: "first", title: "Đã nhận" },
    { key: "second", title: "Đã gửi" },
  ]);

  // get-friend-request
  const FirstRoute = () => (
    <View
      style={[styles.firtTab, { flex: 1, backgroundColor: `${primaryColor}` }]}
    >
      <View style={styles.content}>
        {/* <Text style={styles.title_request}></Text> */}

        {/* Flatalist */}

        {isloading ? (
          <>
            <View style={[]}>
              <ActivityIndicator size={"small"} />
            </View>
          </>
        ) : (
          <>
            {friendRequest ? (
              <FlatList
                style={[styles.contentFlatList]}
                data={friendRequest}
                renderItem={({ item, index }) => (
                  <AvatarFriendRequest
                    key={index}
                    name={item.fromUser.name}
                    avatar={item.fromUser.avatar}
                    idFriend={item.id}
                    friendRequestItem={item.fromUser}
                    keyExtractor={(item, index) => index}
                  />
                )}
              />
            ) : (
              <Text style={styles.text_friend}>Không có lời mời nào</Text>
            )}
          </>
        )}
      </View>
    </View>
  );

  useEffect(() => {
    setLoading(true);
    dispatch(getFriendsRequest()).then((data) => {
      setFriendRequest(data.payload);
      setLoading(false);
    });
  }, [dispatch]);

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: `${primaryColor}` }} />
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.title}>Lời mời kết bạn</Text>
        </Header>

        <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              activeColor={"#000"}
              inactiveColor={"gray"}
              style={{
                backgroundColor: `${primaryColor}`,
              }}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
}

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  header: {
    height: 45,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: `${headerBar}`,
  },

  title: {
    paddingLeft: 20,
    fontSize: 22,
    fontWeight: "500",
    color: `${primaryColor}`,
  },

  //   First Tab
  content: {
    width: "100%",
    height: "200%",
  },
  firtTab: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  text_friend: {
    fontSize: 18,
  },
});
