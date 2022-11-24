import {
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

const Item = ({ title, action }) => (
  <>
    <TouchableOpacity onPress={() => action(title.slug)} style={[styles.item]}>
      <Text style={[styles.item_name]}>
        <Ionicons name={title.icon} size={24} /> {title.name}
      </Text>
      <View>
        <Ionicons name="chevron-forward" size={24} />
      </View>
    </TouchableOpacity>
    <View style={styles.line_item}></View>
  </>
);

const ItemIcon = ({ title, action }) => (
  <>
    <TouchableOpacity
      onPress={() => action(title.slug)}
      style={[styles.item_icon]}
    >
      <Ionicons name={title.icon} size={24} />
      <Text style={[styles.item_name_icon]}>{title.name}</Text>
    </TouchableOpacity>
  </>
);

function InfoChat({ navigation, route }) {
  const { nameChat } = route.params;

  const [menu, setMenu] = useState([
    {
      id: 0,
      name: "Ảnh, file, link đã gửi",
      slug: "AddGroup",
      icon: "person-circle-outline",
    },

    {
      id: 1,
      name: "Xem thành viên",
      slug: "AddGroup",
      icon: "people-outline",
    },
  ]);

  const actionHandler = (data) => {
    navigation.navigate(data);
  };

  const renderItem = ({ item }) => <Item title={item} action={actionHandler} />;

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
        <Image source={{ uri: AvatarDefault }} style={styles.imgMessage} />
        <Text style={styles.name_Chat}>{nameChat}</Text>
        <View style={styles.flatList_icon}>
          <View style={styles._icon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="people" size={30} />
            </TouchableOpacity>
            <Text style={styles.top_icon}>Thêm thành viên</Text>
          </View>
        </View>
      </View>

      <View style={styles.line}></View>
      {/*  */}
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
  item_name: {
    fontSize: 18,
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
});
