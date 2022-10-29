# ỨNG DỤNG NHẮN TIN

## Tạo ứng dụng và cấu hình các file

## AsyncStorage

    `npm  install @react-native-async-storage/async-storage --save`

## React native Form

    - Cài đặt thư viện `npm install formik --save`
        `npm i yup`

`npm install http-proxy-middleware --save`

## To get the Date Time Using moment.js

    `npm install moment --save`

## Gửi nhận tin nhắn

    - Cài đặt thư vện
        `npm i sockjs-client --save`
        `npm i @stomp/stompjs --save`
        `npm i stompjs --save

    -   `npm install socket.io-client`

##Note
`npm i react-native-reanimated --save`
`npm install deprecated-react-native-prop-types --save``

##

```js
var sock = new SockJS(`${URL}/ws`);
let stompClient = Stomp.over(sock);
const { user } = useSelector((state) => state.user);

const handleSetInput = (value) => {
  setMessage(value);
};

const sendChat = ({}) => {
  alert("send");
  var chatMessage = {
    conversationId: conversationId,
    content: [message],
    type: 0,
    accessToken: user.accessToken,
  };
  stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
  dispatch(updateSortConversations(conversationId));
  setMessage("");
};

useEffect(() => {
  sock.onopen = function () {
    console.log("open");
  };
  stompClient.connect({}, function (frame) {
    stompClient.subscribe(`/user/${user.id}/chat`, function (chat) {
      const message = JSON.parse(chat.body);
      dispatch(updateContentChat(message));
    });
  });
}, []);
```

## SearchInput

`npm i react-native-walkthrough-tooltip`

## FindFriend

```js
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  bgborder,
  bgColor,
  headerBar,
  primaryColor,
  primaryColorTitle,
} from "../../../utils/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextInput from "../TextInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import AddFrientItem from "./AddFrientItem";

function AddFriend({ navigation }) {
  const [searchResult, setSearchResult] = useState([]);
  const [findFriend, setFindFriend] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onFinishFindFriend = async (value) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${URL}/api/user/phone-number/${value.phone}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: "application/json",
          },
        }
      );
      setFindFriend(data);
    } catch (error) {
      setFindFriend({
        code: 404,
        message: "Không tìm thấy !!!",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 0);
  }, []);

  const SaerchSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^0[0-9]{9}$/, "Vui lòng nhập số điện thoại của bạn!")
      .required("Vui lòng nhập số điện thoại của bạn!"),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      validationSchema: SaerchSchema,
      initialValues: { phoneNumber: "" },
      onSubmit: (values) => {
        onFinishFindFriend(values);
        console.log(values);
      },
    });
  const datas = [
    {
      id: 0,
      name: "Minh Chau",
      avatar:
        "https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg",
    },
    {
      id: 1,
      name: "Thanh Tung",
      avatar:
        "https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg",
    },
  ];
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.header]}>
          <Ionicons
            name="chevron-back-outline"
            style={{ paddingLeft: 15, fontSize: 20, color: "white" }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
          <View>
            <Text style={styles.title}>Thêm bạn</Text>
          </View>
        </View>

        <View style={styles.contentCenter}>
          <Text style={[styles.title_sub, styles.padding_title]}>
            Thêm bạn bằng số điện thoại
          </Text>
          <Text style={[styles.name_sub, styles.padding_title]}>
            Vietnam (+84)
          </Text>
        </View>

        <View style={styles.contentSearch}>
          <View style={styles.contentSearch_input}>
            <TextInput
              // icon="phone"
              placeholder="Nhập số điện thoại"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              error={errors.phoneNumber}
              values={values.phoneNumber}
              touched={touched.phoneNumber}
              // onSubmitEditing={() => password.current?.focus()}
            />
            {/* <View>
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
              )}
            </View> */}
          </View>

          {/* <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>TÌM</Text>
          </Pressable> */}
        </View>
        {/* 
        <View
          style={{ backgroundColor: "gray", height: 3, opacity: 0.5 }}
        ></View> */}

        <View style={styles.contentCenter}>
          <Text style={[styles.title_sub, styles.padding_title]}>
            Kết quả tìm kiếm
          </Text>
          {/* {findFriend?.code === 200 ? (
            <AddFrientItem {...findFriend?.data}></AddFrientItem>
          ) : (
            findFriend?.message
          )} */}

          <FlatList
            style={styles.contentFlatList}
            data={data}
            renderItem={({ item }) => (
              <AddFrientItem
                id={item.id}
                name={item.name}
                // phonNumber={item.phoneNumber}
                avatar={item.avatar}
                // isFriend={item.isFriend}
                // onPress={isRequest ? _handleCloseRequest : _handleRequest}
                // isRequest={isRequest}
                keyExtractor={(item, index) => index}
              />
            )}
          />
        </View>
      </View>
    </>
  );
}

export default AddFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  header: {
    height: 45,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: `${headerBar}`,
  },

  title: {
    paddingLeft: 20,
    fontSize: 18,
    color: `${primaryColor}`,
  },

  contentCenter: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  contentSearch: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
  contentSearch_input: {
    width: "90%",
    height: 45,
    flexDirection: "column",
  },
  contentSearch_btn: {
    width: "8%",
  },
  padding_title: {
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5,
  },
  title_sub: {
    width: "100%",
    color: `${primaryColorTitle}`,
    fontSize: 14,
  },
  name_sub: {
    width: "100%",
    color: `${primaryColorTitle}`,
    fontSize: 16,
    borderBottomWidth: 0.5,

    borderBottomColor: `${bgborder}`,
  },

  // Button
  button: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 12,
    paddingHorizontal: 32,
    height: 40,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: `${headerBar}`,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  contentFlatList: {
    width: "100%",
  },
});
```
