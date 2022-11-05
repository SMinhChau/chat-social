// import {
//     View,
//     Text,
//     StyleSheet,
//     Button,
//     Pressable,
//     FlatList,
//     TouchableOpacity,
//     KeyboardAvoidingView,
//   } from "react-native";
//   import React, { useEffect, useRef, useState } from "react";
//   import {
//     bgborder,
//     bgColor,
//     headerBar,
//     primaryColor,
//     primaryColorTitle,
//   } from "../../../utils/color";
//   import Ionicons from "react-native-vector-icons/Ionicons";
//   import TextInput from "../TextInput";
//   import * as Yup from "yup";
//   import { useFormik } from "formik";
//   import AddFrientItem from "./AddFrientItem";
//   import axios from "axios";
//   import { getHeaders, URL } from "../../../utils/constant";
//   import { getToken } from "../../../utils/function";
//   import { SafeAreaView } from "react-native-safe-area-context";
//   import Header from "../Header";
//   import { useDispatch } from "react-redux";

//   function AddFriend({ navigation }) {
//     const [findFriend, setFindFriend] = useState();
//     const [friendInvited, setFriendInvited] = useState();
//     const [isLoading, setIsLoading] = useState(false);

//     const phoneRef = useRef();
//     const datas = [
//       {
//         id: 0,
//         name: "Minh Chau",
//         avatar:
//           "https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg",
//       },
//       {
//         id: 1,
//         name: "Thanh Tung",
//         avatar:
//           "https://s120-ava-talk.zadn.vn/4/8/3/5/51/120/3a1cf7ea2e80a0262202104db962090e.jpg",
//       },
//     ];

//     const onFinishFindFriend = async (value) => {
//       console.log("phone", value);
//       try {
//         setIsLoading(true);
//         const { data } = await axios.get(
//           `${URL}/api/user/phone-number/${value}`,
//           {
//             headers: {
//               Authorization: `Bearer ${getToken()}`,
//               Accept: "application/json",
//             },
//           }
//         );
//         console.log("data", data);
//         setFindFriend(data);
//       } catch (error) {
//         setFindFriend({
//           code: 404,
//           message: "Không tìm thấy !!!",
//         });
//       }
//       setIsLoading(false);
//       console.log("setFriendInvited", value);
//     };

//     const AddFriendSchema = Yup.object().shape({
//       phone: Yup.string()
//         .matches(/^0[0-9]{9}$/, "Số điện thoại không đúng!")
//         .required("Vui lòng nhập số điện thoại của bạn!"),
//     });

//     const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
//       useFormik({
//         validationSchema: AddFriendSchema,
//         initialValues: { phone: "" },
//         onSubmit: (values) => {
//           onFinishFindFriend(values);
//         },
//       });

//     return (
//       <>
//         <SafeAreaView style={styles.container}>
//           <Header
//             onPress={() => {
//               navigation.goBack();
//             }}
//           >
//             <Text style={styles.title}>Thêm bạn</Text>
//           </Header>
//           <KeyboardAvoidingView
//             behavior={Platform.OS == "ios" ? "padding" : "height"}
//             style={{ flex: 1 }}
//             keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
//           >
//             <View style={styles.contentCenter}>
//               <Text style={[styles.title_sub, styles.padding_title]}>
//                 Thêm bạn bằng số điện thoại
//               </Text>
//               <Text style={[styles.name_sub, styles.padding_title]}>
//                 Vietnam (+84)
//               </Text>
//             </View>

//             <View style={styles.contentSearch}>
//               <View style={styles.contentSearch_input}>
//                 <TextInput
//                   // icon="phone"
//                   ref={phoneRef}
//                   placeholder="Nhập số điện thoại"
//                   autoCapitalize="none"
//                   keyboardAppearance="dark"
//                   returnKeyType="next"
//                   returnKeyLabel="next"
//                   onChangeText={handleChange("phone")}
//                   onBlur={handleBlur("phone")}
//                   error={errors.phone}
//                   values={values.phone}
//                   touched={touched.phone}
//                 />
//                 <View>
//                   {touched.phoneNumber && errors.phoneNumber && (
//                     <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
//                   )}
//                 </View>
//               </View>

//               <TouchableOpacity
//                 style={styles.button}
//                 disabled={isLoading}
//                 onPress={handleSubmit}
//               >
//                 <Text style={styles.text}>TÌM</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.contentCenter}>
//               <Text style={[styles.title_sub, styles.padding_title]}>
//                 Kết quả tìm kiếm
//               </Text>

//               {findFriend?.code === 200 ? (
//                 <FlatList
//                   style={styles.contentFlatList}
//                   data={friendInvited}
//                   renderItem={({ item }) => (
//                     <AddFrientItem
//                       name={item.name}
//                       avatar={item.avatar}
//                       keyExtractor={(item, index) => index}
//                     />
//                   )}
//                 />
//               ) : (
//                 <Text style={styles.textError}>{findFriend?.message}</Text>
//                 // findFriend?.message
//               )}
//             </View>
//           </KeyboardAvoidingView>
//         </SafeAreaView>
//       </>
//     );
//   }

//   export default AddFriend;

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       flexDirection: "column",
//       justifyContent: "flex-start",
//     },
//     header: {
//       height: 45,
//       width: "100%",
//       flexDirection: "row",
//       justifyContent: "flex-start",
//       alignItems: "center",
//       backgroundColor: `${headerBar}`,
//     },

//     title: {
//       paddingLeft: 20,
//       fontSize: 22,
//       fontWeight: "500",
//       color: `${primaryColor}`,
//     },

//     contentCenter: {
//       width: "100%",
//       paddingHorizontal: 15,
//       flexDirection: "column",
//       justifyContent: "center",
//       alignItems: "flex-start",
//     },
//     contentSearch: {
//       width: "100%",
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//       flexDirection: "row",
//       display: "flex",
//       justifyContent: "space-between",
//     },
//     contentSearch_input: {
//       width: "70%",
//       height: 45,
//       flexDirection: "column",
//     },
//     contentSearch_btn: {
//       width: "8%",
//     },
//     padding_title: {
//       width: "100%",
//       paddingTop: 5,
//       paddingBottom: 5,
//     },
//     title_sub: {
//       width: "100%",
//       color: `${primaryColorTitle}`,
//       fontSize: 16,
//     },
//     name_sub: {
//       width: "100%",
//       color: `${primaryColorTitle}`,
//       fontSize: 16,
//       borderBottomWidth: 0.5,

//       borderBottomColor: `${bgborder}`,
//     },

//     // Button
//     button: {
//       alignItems: "center",
//       justifyContent: "center",
//       // paddingVertical: 12,
//       paddingHorizontal: 32,
//       height: 40,
//       borderRadius: 50,
//       elevation: 3,
//       backgroundColor: `${headerBar}`,
//     },
//     text: {
//       fontSize: 14,
//       lineHeight: 21,
//       letterSpacing: 0.25,
//       color: "white",
//     },
//     contentFlatList: {
//       width: "100%",
//     },
//     textError: {
//       color: "red",
//     },
//   });