import React, { useEffect, useState } from "react";
import { Image, Platform, TextInput } from "react-native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useSelector } from "react-redux";
import { updateSortConversations } from "../../../../redux/slices/ConversationSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

import { ObjectID } from "bson";
import { URL } from "../../../../utils/constant";
import { updateContentChat } from "../../../../redux/slices/ChatSlice";

function InputMessage({ conversationId }) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const handleSetInput = (value) => {
    setMessage(value);
  };

  const { user } = useSelector((state) => state.user);

  const sendMessage = () => {
    let isFile = false;
    let _content = message;

    if (image) {
      const id = new ObjectID();
      console.log("ID", id);
      _content = id;
      isFile = true;
    }
    var chatMessage = {
      conversationId: conversationId,
      content: [_content],
      type: isFile ? 1 : 0,
      accessToken: user.accessToken,
    };

    try {
      if (image) {
        console.log("nameFile", image);

        var bodyFormData = new FormData();

        let uriParts = image.split(".");
        const path = image.split("/");
        let fileType = uriParts[uriParts.length - 1];
        let nameFile = path[path.length - 1];
        console.log(fileType, nameFile);

        const _image = {
          uri: Platform.OS === "android" ? image : image.replace("file://", ""),
          type: `image/${fileType}`,
          name: nameFile,
        };
        console.log("_image", _image);
        bodyFormData.append("file", _image);

        bodyFormData.append("id", `${conversationId}-${_content}`);
        console.log("bodyFormData", bodyFormData);
        axios({
          method: "post",
          url: `${URL}/api/message/upload-message-file`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then(({ data }) => {
            dispatch(
              updateContentChat({
                ...data.data,
                senderId: user.id,
                type: 1,
              })
            );
            const chatMessage = {
              conversationId: conversationId,
              content: [data.data.url],
              type: isFile ? 1 : 0,
              accessToken: user.accessToken,
            };
            global.stompClient.send(
              "/app/chat.sendMessage",
              {},
              JSON.stringify(chatMessage)
            );
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        global.stompClient.send(
          "/app/chat.sendMessage",
          {},
          JSON.stringify(chatMessage)
        );
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(updateSortConversations(conversationId));
    setMessage("");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.contentTop}>
      <View style={styles.barInput}>
        <FontAwesome
          style={styles.iconLeft}
          name="smile-o"
          size={30}
          color="#0068FF"
        />
        <View style={[styles.inputView, styles.rowCenter]}>
          <TextInput
            maxLength={1000}
            placeholder="Nhập tin nhắn"
            value={message}
            onChangeText={handleSetInput}
            style={[styles.input, styles.rowCenter]}
            multiline
          />
        </View>

        <Ionicons
          onPress={sendMessage}
          style={styles.icon}
          name="ios-paper-plane-outline"
          size={24}
          color="#0068FF"
        />
        <Ionicons
          style={styles.iconRight}
          name="image"
          size={24}
          color="#0068FF"
          onPress={pickImage}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {image && (
          <Image
            source={{ uri: image }}
            resizeMode={"cover"}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    </View>
  );
}

export default InputMessage;

const styles = StyleSheet.create({
  contentTop: {
    height: 45,
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    // justifyContent: "center",
    backgroundColor: "#fff",
  },
  barInput: {
    height: "100%",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentImage: {
    width: "100%",
    maxHeight: 200,
    paddingHorizontal: 10,
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  inputView: {
    width: "75%",
    height: "100%",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 18,
    paddingLeft: 8,
    paddingRight: 8,
  },
  icon: {
    width: "10%",
    paddingRight: 5,
  },
  iconLeft: {},
  iconRight: {},
});
