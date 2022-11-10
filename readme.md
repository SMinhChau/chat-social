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
