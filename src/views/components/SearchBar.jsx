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

const items = [
  {
    id: 0,
    icon: "person-add-outline",
    title: "Thêm bạn",
    onClick: "addFriend",
  },
  {
    id: 1,
    icon: "people-outline",
    title: "Tạo nhóm",
    onClick: "addListFriends",
  },
];

function SearchBar({ navigation, onClick }) {
  const [visible, setVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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

  return (
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
            {items.map((item, index) => (
              <MenuIcon
                icon={item.icon}
                title={item.title}
                key={index}
                onPress={item.onClick ? handleOnClickAdd : null}
              />
            ))}
          </>
        }
        placement={"bottom"}
        onClose={() => setVisible(!visible)}
        contentStyle={{ width: 200, height: 100 }}
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
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 45,
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
