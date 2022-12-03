import Item from "antd/lib/list/Item";
import { Text, View, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useEffect } from "react";

import { useState } from "react";
import { AvatarDefault, URL } from "../../../utils/constant";
import { fetchUserSenderById } from "../../../redux/slices/UserInfoSlice";

function ContentMessage({ message, navigation, receiverId }) {
  const [userSender, setUserSender] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserSenderById(receiverId)).then((data) => {
      setUserSender(data.payload);
      // console.log(userSender.payload.data.name);
    });
  }, [dispatch]);

  const ImageMessage = () => {
    return (
      <>
        {/* <Text> {message.content[0]}</Text> */}
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: message.content[0] }}
        />
      </>
    );
  };

  const MessageTypeFile = () => {
    if (message.content[0] == "Tin nhắn đã được thu hồi") {
      return "Tin nhắn đã được thu hồi";
    }

    return (
      <div>
        Tên: {getFileName}
        <br />
        <img
          alt="hinhaanh"
          src="https://play-lh.googleusercontent.com/58sr3IvX1wiE8ei_BICqPgywKgZ5DPpmRL_2YuZINnFlz_9D2os9PmueeZPPtZno0zk"
          width={50}
        />
        <a
          onClick={() => window.open(message.content && message.content[0])}
          href={message.url}
          target="_blank"
          rel="noreferrer"
        >
          <EyeOutlined style={{ fontSize: 25, marginLeft: 30 }} />
        </a>
      </div>
    );
  };

  return (
    <>
      <View style={styles.content}>
        {userSender?.code === 200 ? (
          <Image
            style={styles.content__Avatar}
            source={{ uri: userSender.data.avatar }}
          />
        ) : (
          <Image
            style={styles.content__Avatar}
            source={{ uri: AvatarDefault }}
          />
        )}
        <View style={styles.message}>
          <View style={styles.message_Item}>
            {message && (
              <View style={styles.message_Item__content}>
                {userSender?.code === 200 ? (
                  <Text style={styles.content__User}>
                    {userSender.data.name}
                  </Text>
                ) : null}

                {message.type === 1 ? (
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: message.content[0] }}
                  />
                ) : message.type === 2 ? (
                  <Text>
                    FILE: {message.content && message.content[0].slice(67)}
                  </Text>
                ) : (
                  <Text style={styles.message__Text}>{message.content[0]}</Text>
                )}

                <View style={styles.message__Time}>
                  <Text style={styles.createAt}>
                    {" "}
                    {moment(new Date(message.timeSend)).format("LT")}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 4,
    marginHorizontal: 4,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  message: {
    display: "flex",
    width: "85%",
    alignContent: "flex-end",
  },
  message_Item: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  message_Item__content: {
    backgroundColor: "#fff",
    padding: 8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    borderColor: "#d2c3c3",
    borderWidth: 1,
  },
  message__Text: {
    minWidth: 32,
    maxWidth: "100%",
    fontSize: 16,
  },
  message__Time: {},
  createAt: {
    marginTop: 4,
    fontSize: 14,
    color: "#939ab7",
  },
  // content__Avatar
  content__Avatar: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginRight: 5,
  },

  content__User: {
    fontSize: 16,
    color: "#24cd8c",
  },
});
export default ContentMessage;
