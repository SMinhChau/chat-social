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
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../components/MenuIcon";

function PhoneBooks({ navigation, onClick }) {
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

  const handleOnClickAddGroup = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

        <Ionicons size={24} color="#fff" name="person-add-outline" />
      </View>
    </SafeAreaView>
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

export default PhoneBooks;
