import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { bgColor, border, headerBar } from "../../utils/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import AvatarFriend from "../components/AvatarFriend";
import { getMyFriends } from "../../redux/slices/FriendSlice";
import { useDispatch } from "react-redux";
import FriendRequest from "../components/Model/FriendRequest";

function PhoneBooks({ navigation, onClick }) {
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [listFrient, setLisFrient] = useState([]);

  const dispatch = useDispatch();

  const onOpenSearch = () => {
    setIsSearch(true);
  };

  const onHideSearch = () => {
    setIsSearch(false);
    setSearchInput("");
  };

  const handleSearchInput = (value) => {
    setSearchInput(() => setSearchInput(value));
  };

  const handleOnClickAdd = () => {
    navigation.navigate("AddFriend");
  };
  const handleOnClickAddGroup = () => {};

  useEffect(() => {
    dispatch(getMyFriends()).then((data) => {
      setLisFrient(data.payload);
      console.log("listFrient", data.payload);
    });
  }, [dispatch]);

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <View style={styles.searchBar}>
        {isSearch === true ? (
          <>
            <Icon
              name="arrow-left"
              size={24}
              color="#fff"
              onPress={onHideSearch}
            />
            <View style={styles.inputSearch}>
              <TextInput
                placeholder="Tìm kiếm"
                value={searchInput}
                onChangeText={handleSearchInput}
              />
            </View>
          </>
        ) : (
          <>
            <Icon name="magnify" size={24} color="#fff" />
            <View style={styles.textSearch}>
              <Text style={styles.textSearch} onPress={onOpenSearch}>
                Tìm Kiếm
              </Text>
            </View>
          </>
        )}

        <Ionicons
          size={24}
          color="#fff"
          name="person-add-outline"
          onPress={handleOnClickAdd}
        />
      </View>
      <View style={styles.container}>
        <View style={[styles.conten, styles.flex]}>
          <TouchableOpacity
            style={styles.touch_frend}
            onPress={() => navigation.navigate("FriendRequest")}
          >
            <View style={styles.button}>
              <Ionicons name="people-outline" size={30} color="#fff" />
            </View>
            <Text style={styles.title}>Lời mời kết bạn</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={[styles.view_friend]}>
          <View style={styles.content_title}>
            <Text style={styles.text_friend}>Danh sách bạn bè</Text>
          </View>

          {/* Flatalist */}
          {listFrient ? (
            <FlatList
              style={[styles.contentFlatList]}
              data={listFrient}
              renderItem={({ item, index }) => (
                <AvatarFriend
                  key={index}
                  data={listFrient}
                  navigation={navigation}
                  name={item.name}
                  avatar={item.avatar}
                  id={item.id}
                  keyExtractor={(item, index) => index}
                />
              )}
            />
          ) : (
            <Text style={styles.text_friend}>Chưa có bạn bè</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: `${bgColor}`,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  searchBar: {
    height: 50,
    width: "100%",
    backgroundColor: `${headerBar}`,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputSearch: {
    width: "70%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  textSearch: {
    width: "70%",
    color: "#fff",
    fontSize: 18,
  },
  conten: {
    width: "100%",
    height: "9%",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  touch_frend: {
    width: "90%",
    height: "95%",
    flexDirection: "row",
    alignItems: "center",
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
  content_title: {
    marginVertical: 8,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    height: 47,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: `${border}`,
  },
  title: {
    fontSize: 18,
  },
  line: {
    width: " 100%",
    height: 5,
    backgroundColor: `${border}`,
  },
  view_friend: {
    width: "100%",
    height: "100%",

    paddingHorizontal: 20,
  },
  text_friend: {
    fontSize: 18,
  },
  contentFlatList: {
    // borderRadius: 10,
    // elevation: 3,
    // backgroundColor: `${border}`,
  },
});

export default PhoneBooks;
