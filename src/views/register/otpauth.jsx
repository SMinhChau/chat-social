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

export default function OtpAuth(phoneNumber) {
  var phone = phoneNumber.route.params;

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fiveInput = useRef();
  const sixInput = useRef();

  const [input1, setInput1] = useState();
  const [input2, setInput2] = useState();
  const [input3, setInput3] = useState();
  const [input4, setInput4] = useState();
  const [input5, setInput5] = useState();
  const [input6, setInput6] = useState();

  const otpObject = {a: input1,
                     b: input2, 
                     c: input3, 
                     d: input4, 
                     e: input5, 
                     f: input6,
                     codeotp : function() {
                      return this.a + this.b + this.c + this.d + this.e + this.f;
                    }};

  
  
  const navigation = useNavigation();
  
  const dispatch = useDispatch();

  const {
    isLoading,
    isSuccess,
    isError,
    message: messages,
    otps,
  } = useSelector((state) => state.otps);

  const onFinish = async (values) => {
    dispatch(OtpVerify(values));
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      // validationSchema: LoginSchema,
      initialValues: {otp: "", phoneNumber:`${phone}`},
      onSubmit: (values) => {
        onFinish(values);
        console.log(values);
      },
    });

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate("Register");
      console.log(messages);
    }
    if (isError) {
      console.log(messages);
      Alert.alert("Thông báo", messages);
    }
  }, [isLoading, isSuccess, isError]);

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
            <Text style={styles.noteText}>Nhập mã OTP vừa gửi đến số {phone}</Text>

            {/* <View style={styles.otpInputContainer}>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={input1}
                  ref={firstInput}
                  onChangeText={text => {
                    setOtp({...otpcode, 1: text});
                    text && secondInput.current.focus();
                    setInput1(text);
                  }}
                />
              </View>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={secondInput}
                  onChangeText={text => {
                    setOtp({...otpcode, 2: text});
                    text ? thirdInput.current.focus() : firstInput.current.focus();
                    setInput2(text);
                  }}
                />
              </View>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={thirdInput}
                  onChangeText={text => {
                    setOtp({...otpcode, 3: text});
                    text ? fourthInput.current.focus() : secondInput.current.focus();
                    setInput3(text);
                  }}
                />
              </View>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={fourthInput}
                  onChangeText={text => {
                    setOtp({...otpcode, 4: text});
                    text ? fiveInput.current.focus() : thirdInput.current.focus();
                    setInput4(text);
                  }}
                />
              </View>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={fiveInput}
                  onChangeText={text => {
                    setOtp({...otpcode, 5: text});
                    text ? sixInput.current.focus() : fourthInput.current.focus();
                    setInput5(text);
                  }}
                />
              </View>
              <View style={styles.otpBox}>
                <TextInput
                  style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={sixInput}
                  onChangeText={text => {
                    setOtp({...otpcode, 6: text});
                    !text && fiveInput.current.focus();
                    setInput6(text);
                  }}
                />
              </View>
            </View> */}

                  <TextInput style={styles.inputCode}
                     keyboardType='numeric'
                     onChangeText={handleChange("otp")}
                     onBlur={handleBlur("otp")}
                     values={values.otp}
                     touched={touched.otp}
                     autoCapitalize="none"
                     keyboardAppearance="dark"
                     returnKeyType="next"
                     returnKeyLabel="next"
                     placeholder='Code'/>

            <TouchableOpacity style={styles.OtpButton} disabled={isLoading} onPress={handleSubmit}>
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

      otpText:{
        fontSize: 25,
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 13,
        paddingVertical: 10,
      }

});
