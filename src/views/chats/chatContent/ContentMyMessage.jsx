import Item from "antd/lib/list/Item";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Tooltip from "react-native-walkthrough-tooltip";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

function ContentMyMessage({ message, revertChat }) {
  const [visible, setVisible] = useState(false);
  const ImageMessage = () => {
    return (
      <>
        {message.content && (
          <Image
            source={{ uri: message.content[0] }}
            style={{ width: 100, height: 100 }}
          />
        )}
      </>
    );
  };

  return (
    <>
      <View style={styles.content}>
        {message && (
          <Tooltip
            style={styles.content_tooltip}
            isVisible={visible}
            content={
              <TouchableOpacity
                style={styles.remove_mess}
                onPress={() => {
                  revertChat(message.id);
                  setVisible(false);
                }}
              >
                <Text>Thu hồi tin nhắn</Text>
              </TouchableOpacity>
            }
            placement="top"
            // onClose={() => setVisible(!visible)}
          >
            <TouchableOpacity
              style={styles.message}
              onPress={() => setVisible(!visible)}
            >
              <View style={styles.message_Item}>
                <View style={styles.message_Item__content}>
                  {message.type === 1 ? (
                    <ImageMessage />
                  ) : (
                    <Text style={styles.message__Text}>
                      {message.content[0]}
                    </Text>
                  )}

                  <View style={styles.message__Time}>
                    {message.content ? (
                      <Text style={styles.createAt}>
                        {moment(new Date(message.timeSend)).format("LT")}
                      </Text>
                    ) : (
                      ""
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Tooltip>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row-reverse",
    marginVertical: 4,
    // marginHorizontal: 4,
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
  // Thu hồi tin nhắn
  remove_mess: {},
});
export default ContentMyMessage;
