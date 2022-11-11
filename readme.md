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

## Send image

- Cài đặt thư viện
  `npm install expo-image-picker`
  `npm bson`
- Cấu hình file `app.json`

```js
async function getImageToBase64(imageURL) {
  let image;

  try {
    const { uri } = await FileSystem.downloadAsync(
      imageURL,
      FileSystem.documentDirectory + "bufferimg.png"
    );

    image = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
  } catch (err) {
    console.log(err);
  }

  return image;
}
```

```js
import { URL } from "../../utils/constant";
import { getToken } from "../../utils/function";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

// First, create the thunk
const fetchUserById = createAsyncThunk(
  "info/fetchUserById",
  async (userId, thunkAPI) => {
    console.log("fetchUserById", userId);
    try {
      const data = await axios.get(`${URL}/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
        },
      });
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  data: [],
  senderId: null,
};

// Then, handle actions in your reducers:
const UserInfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    fetchSenderById: (state, action) => {
      state.receiverId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
export default UserInfoSlice.reducer;
```
