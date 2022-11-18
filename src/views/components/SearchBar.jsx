import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Tooltip from "react-native-walkthrough-tooltip";
import { headerBar } from "../../utils/color";
import MenuIcon from "./MenuIcon";
import Ionicons from "react-native-vector-icons/Ionicons";
import { logout } from "../../redux/slices/UserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AddGroup from "./Model/group/AddGroup";
// import { store } from "../../redux/store";
function SearchBar({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [visibleModel, setVisibleModel] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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
    setVisible(!visible);
  };

  const handlaNewGroup = () => {
    navigation.navigate("AddGroup");
    setVisible(!visible);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <>
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

        <Tooltip
          isVisible={visible}
          content={
            <>
              <MenuIcon
                icon={<Ionicons name="person-add-outline" size={20} />}
                title={"Thêm bạn"}
                onPress={handleOnClickAdd}
                onClose={() => handleCancel(false)}
              />
              <MenuIcon
                icon={<Ionicons name="people-outline" size={20} />}
                title={"Tạo nhóm"}
                onPress={handlaNewGroup}
              />
              <MenuIcon
                icon={<Ionicons name="log-in-outline" size={20} />}
                title={"Đăng xuất"}
                onPress={handleLogout}
              />
            </>
          }
          placement={"bottom"}
          onClose={() => setVisible(!visible)}
          contentStyle={{ width: 200, height: 120 }}
          {...(Platform.OS === "ios"
            ? { tooltipStyle: { marginLeft: 17, marginTop: 10 } }
            : { tooltipStyle: { marginLeft: 17, marginTop: 0 } })}
        >
          <Icon
            name="plus"
            size={30}
            color="#fff"
            onPress={() => setVisible(true)}
          />
        </Tooltip>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
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
});

export default SearchBar;
