import Item from "antd/lib/list/Item";
import { Text, View, StyleSheet, Image } from "react-native";

function Texxt({ message }) {
  return (
    <>
      <View style={styles.content}>
        <Image
          style={styles.content__Avatar}
          source={require("../../../../assets/chau.jpg")}
        />
        <View style={styles.message}>
          <View style={styles.message_Item}>
            <View style={styles.message_Item__content}>
              <Text style={styles.content__User}>Chaau</Text>
              <Text style={styles.message__Text}>{message.action}</Text>
              <View style={styles.message__Time}>
                <Text style={styles.createAt}>21:10</Text>
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
    backgroundColor: "#fff",
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
export default Texxt;
