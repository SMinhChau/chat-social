import { StyleSheet,
         StatusBar, 
         SafeAreaView,
         View,
         TouchableOpacity,
         Image,
         Text,
         TextInput,
         Alert} from "react-native";
import React, {useRef, useState, useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import { useFormik } from "formik";
import { OtpVerify } from "../../redux/slices/OtpSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OtpAuth( phoneNum ) {
  const phone = "+84" + phoneNum.route.params;
  const navigation = useNavigation();
  const [otpCode, setOtpCode] = useState("");
  // const dispatch = useDispatch();

  // const {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   message: messages,
  //   otps,
  // } = useSelector((state) => state.otps);

  // const onFinish = async (values) => {
  //   dispatch(OtpVerify(values));
  // };

  // const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
  //   useFormik({
  //     // validationSchema: LoginSchema,
  //     initialValues: {otp: "", phoneNumber:""},
  //     onSubmit: (values) => {
  //       onFinish(values);
  //       console.log(values);
  //     },
  //   });

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigation.navigate("Register");
  //     console.log(messages);
  //   }
  //   if (isError) {
  //     console.log(messages);
  //     Alert.alert("Thông báo", messages);
  //   }
  // }, [isLoading, isSuccess, isError]);

  const handleOptAuth = async () => {
    axios.post(`${URL}/api/auth/verify-otp-phone-number`, {
      otp: otpCode,
      phoneNumber: phone,
    }).then(res => {
        console.log("Res", res);
        console.log("otp đã xác nhận");
        // AsyncStorage.setItem("res.data.data", JSON.stringify(res.data.data));
        navigation.navigate("Register");
    }).catch(err => console.log(err))
  };

    return (
       <SafeAreaView style={styles.container}>
        <StatusBar styles='auto'/>

        <View style={styles.title}>
            <TouchableOpacity style={styles.touchBack} onPress={() => { navigation.goBack() }}>
                <Image source={require('../../imgs/left-arrow.png')} style={styles.imgIcon} />
            </TouchableOpacity>

            <Text style={styles.textTitle}>Xác nhận mã OTP</Text>
        </View>

        <View style={styles.otpContainer}>
            <Text style={styles.noteText}>Nhập mã OTP vừa gửi đến số</Text>

                  {/* <TextInput style={styles.inputCode}
                     keyboardType='numeric'
                     onChangeText={handleChange("otp")}
                     onBlur={handleBlur("otp")}
                     values={values.otp}
                     touched={touched.otp}
                     autoCapitalize="none"
                     keyboardAppearance="dark"
                     returnKeyType="next"
                     returnKeyLabel="next"
                     placeholder='Code'/> */}

                     <TextInput style={styles.inputCode}
                                keyboardType='numeric'
                                value={otpCode}
                                onChangeText={text => {setOtpCode(text)}}
                     />

            <TouchableOpacity style={styles.OtpButton} onPress={() => {handleOptAuth()}}>
                <Text style={styles.textButton}>Xác Nhận</Text>
            </TouchableOpacity>
        </View>

       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputCode:{
      borderWidth:1,
      borderColor:'#0573ff',
      width:140,
      height:55,
      textAlign:'center',
      borderRadius:15,
      fontSize:25,
      marginTop:10
    },

    container: {
        flex: 1,
        justifyContent:'flex-start',
    },

    title: {
        width: '100%',
        height: 40,
        backgroundColor: '#0573ff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },

      textTitle: {
        fontSize: 22,
        color: 'white',
        height: 40,
        width: '62%',
        paddingTop: 4,
      },
    
      touchBack: {
        width: '12%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },

      imgIcon: {
        height: 29,
        width: 29,
      },

      otpContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },

      noteText:{
        fontSize:19,
        // width:'90%',
        paddingVertical:10,
        borderRadius:10,
        fontWeight:'bold'
      },

      OtpButton:{
        backgroundColor:'#0573ff',
        width:'50%',
        height:45,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:35
      },

      textButton:{
        color:'white',
        fontSize:20
      },
      
      otpInputContainer:{
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:15
      },

      otpBox:{
        borderRadius: 5,
        borderColor: '#0573ff',
        borderWidth: 0.5,
        marginHorizontal:5
      },

      // otpText:{
      //   fontSize: 25,
      //   padding: 0,
      //   textAlign: 'center',
      //   paddingHorizontal: 13,
      //   paddingVertical: 10,
      // }

});
