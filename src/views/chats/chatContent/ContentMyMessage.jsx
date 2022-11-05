import Item from "antd/lib/list/Item";
import { Text, View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import { AvatarDefault } from "../../../utils/constant";
import { useEffect } from "react";

function ContentMyMessage({ message }) {
  // const { user } = useSelector((state) => state.user);

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
  useEffect(() => {
    console.log(message);
  }, [message]);
  return (
    <>
      <View style={styles.content}>
        {/* <Image
          style={styles.content__Avatar}
          source={require("../../../../assets/chau.jpg")}
        /> */}
        <View style={styles.message}>
          <View style={styles.message_Item}>
            <View style={styles.message_Item__content}>
              {message.type === 1 ? (
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: message.content[0] }}
                />
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
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row-reverse",
    marginVertical: 4,
    marginHorizontal: 4,
  },

  message: {
    width: "85%",
    display: "flex",
    alignContent: "flex-end",
  },
  message_Item: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  message_Item__content: {
    backgroundColor: "#AFEEEE",
    padding: 8,
    justifyContent: "flex-end",
    alignItems: "flex-end",
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
    marginLeft: 5,
  },

  content__User: {
    fontSize: 16,
    color: "#24cd8c",
  },
});
export default ContentMyMessage;
