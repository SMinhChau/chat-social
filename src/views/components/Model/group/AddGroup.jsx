import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  CheckBox,
  Button,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AvatarDefault } from "../../../../utils/constant";
import * as ImagePicker from "expo-image-picker";
import { subprimaryColor } from "../../../../utils/color";
import { Formik } from "formik";
import Checkbox from "./Checkbox ";
function AddGroup({ navigation }) {
  const [image, setImage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [avatar, setAvater] = useState(null);

  //👇🏻 Function that closes the Modal component
  const closeModal = () => {
    navigation.navigate("home");
  };

  //👇🏻 Logs the group name to the console
  const handleCreateRoom = ({ navigation }) => {
    console.log({ groupName });
    closeModal();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="close-outline" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Nhóm mới</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.content_avatar}>
          {image ? (
            <Image source={{ uri: image }} style={styles.img} />
          ) : (
            <>
              {avatar ? (
                <Image style={styles.img} source={{ uri: AvatarDefault }} />
              ) : (
                <>
                  <TouchableOpacity onPress={pickImage}>
                    <Ionicons name="close-outline" size={30} />
                  </TouchableOpacity>
                </>
              )}
              {/* {image && <Image source={{ uri: image }} style={styles.img} />} */}
            </>
          )}
        </View>

        <View style={styles.content_name}>
          <TextInput
            style={styles.modalinput}
            placeholder="Nhập tên nhóm"
            onChangeText={(value) => setGroupName(value)}
          />
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons
          style={{ marginLeft: 20 }}
          name="search-outline"
          size={22}
          color={`${subprimaryColor}`}
        />
        <View style={{ width: "90%" }}>
          <TextInput
            style={styles.input_search}
            placeholder="Tìm tên hoặc số điện thoại"
            onChangeText={(value) => {}}
          />
        </View>
      </View>

      <View style={styles.line}></View>
      {/* List Friend */}
      <View>
        <Text>Danh bạ</Text>
      </View>
    </SafeAreaView>
  );
}

export default AddGroup;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
  },
  header: {
    width: "100%",
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "#E3E3E3",
  },
  title: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "500",
  },
  content: {
    width: "100%",
    paddingHorizontal: 10,
    height: 75,
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar: {
    width: "100%",
    paddingVertical: 10,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  content_avatar: {
    height: 55,
    width: 55,
    alignItems: "center",
    backgroundColor: "#E3E3E3",
    justifyContent: "center",
    borderRadius: 50,
  },
  img: {
    height: 55,
    width: 55,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  content_name: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalinput: {
    width: "100%",
    height: 50,
    marginLeft: 10,
    paddingHorizontal: 10,
    fontSize: 22,
    color: `${subprimaryColor}`,
  },
  input_search: {
    width: "90%",
    height: 35,
    fontSize: 16,
    paddingHorizontal: 10,
    backgroundColor: "#E3E3E3",
    borderRadius: 10,
  },
  line: {
    marginTop: 10,
    width: "100%",
    height: 2,
    backgroundColor: "gray",
  },
});
