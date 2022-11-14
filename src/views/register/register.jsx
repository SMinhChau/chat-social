import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';

import { URL } from "../../utils/constant";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateContentChat } from "../../redux/slices/ChatSlice";
import { SignUpUser } from "../../redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export default function Register(phoneNum) {
  const phone = phoneNum.route.params;
  const navigation = useNavigation();
  const [getPassVisible, setPassVisible] = useState(false);
  const [getCofirmPassVisible, setCofirmPassVisible] = useState(false);

  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Nam',
      value: 'true',
      color: '#0357ff',
      selected:true
    },
    {
      id: '2',
      label: 'Nữ',
      value: 'false',
      color: '#0357ff'
    },
  ];

  const [radioButtons, setRadioButtons] = useState("true"); //pass in our data to this state. This will store the current user's choice
  const setValue = (value) => {
    var newArray = value.filter((item) => item.selected === true); //get the items that are selected
    setRadioButtons(newArray[0].value); //set the selected value in this Hook
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tmpDate = new Date(currentDate);
    let fDate = tmpDate.getDate() + '/' + (tmpDate.getMonth() + 1) + '/' + tmpDate.getFullYear();
    setText(fDate);

    console.log(fDate);
  }

  const showMode = (curentMode) => {
    setShow(true);
    setMode(curentMode);
  }

  //Register
  const [pass, setPass] = useState();
  const [name, setName] = useState();
  const {
    isLoading,
    isSuccess,
    isError,
    message: messages,
    user,
  } = useSelector((state) => state.user);

  const onError = (error) => {
    console.log("Could not connect" + error);
  };

  const onConnected = () => {
    console.log(" ======== connected ==========: ");
    global.stompClient.subscribe(`/user/${user.id}/chat`, function (chat) {
      const message = JSON.parse(chat.body);
      dispatch(updateContentChat(message));
    });
  };

  const handleSinUpUser = async () => {
    axios.post(`${URL}/api/user/create`, {
      avatar: "",
      coverImage: "",
      dateOfBirth: date,
      gender: radioButtons,
      name: name,
      password: pass,
      phoneNumber: phone
    }).then(res => {
      console.log("Res", res);
      Alert.alert("Thông báo","Đăng ký thành công");
      AsyncStorage.setItem("res.data.data", JSON.stringify(res.data.data));
      navigation.navigate("Home");
    }).catch(err => {
      console.log(err);
      Alert.alert("Thông báo","Đăng ký thất b");
    })
      
  };

  useEffect(() => {
    if (isSuccess) {
      var sock = new SockJS(`${URL}/ws`);
      global.stompClient = Stomp.over(sock);

      navigation.navigate("Home");
      console.log(messages);

      console.log(" ======== stompClient.connect ==========: ");
      global.stompClient.connect(onError, onConnected);
    }
    if (isError) {
      console.log(messages);
      Alert.alert("Thông báo", messages);
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.title}>
        <TouchableOpacity style={styles.touchBack} onPress={() => { navigation.goBack() }}>
          <Image source={require('../../imgs/left-arrow.png')} style={styles.imgIcon} />
        </TouchableOpacity>

        <Text style={styles.textTitle}>Đăng ký</Text>
      </View>

      <View style={styles.noteText}>
        <Text>Sử dụng tên thật để bạn bè dễ nhận ra bạn </Text>
      </View>

      <KeyboardAvoidingView style={styles.formRegis}>
        <Text style={styles.titleSubmit}>Tên hiển thị:</Text>
        <View style={styles.inputComponent}>
          <TextInput style={styles.input}
            onChangeText={text => { setName(text) }}
            value={name}
          />
        </View>

        <View style={styles.inputDateOfBirth}>
          <TextInput style={styles.textDate} placeholder='dd/mm/yy' value={text} />

          <TouchableOpacity style={styles.buttonDate} onPress={() => showMode('date')}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Ngày sinh</Text>
          </TouchableOpacity>

          {show && <DateTimePicker
            testID='DateTimePicker'
            value={date}
            mode={mode}
            display='default'
            onChange={onChange}
          />}
        </View>

        <View style={styles.inputComponent}>
          <Text style={styles.titleGender}>Giới tính:</Text>

          <RadioGroup
            radioButtons={radioButtonsData} //pass in our array
            onPress={(value) => setValue(value)}
            layout='row'
          />
          {/* <Text>{radioButtons}</Text> */}
        </View>

        <Text style={styles.titleSubmit}>Mật khẩu:</Text>

        <View style={styles.inputComponent}>
          <TextInput style={styles.input}
            value={pass}
            onChangeText={text => { setPass(text) }}
            secureTextEntry={getPassVisible ? false : true} />

          <TouchableOpacity style={{ fontSize: 26, right: '50%' }}
            onPress={() => { setPassVisible(!getPassVisible) }}>
            {getPassVisible ? <Text style={styles.txtHide}>Ẩn</Text> :
              <Text style={styles.txtHide}>Hiện</Text>}
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.titleSubmit}>Xác nhận mật khẩu:</Text>

        <View style={styles.inputComponent}>
          <TextInput style={styles.inputPass}
            secureTextEntry={getCofirmPassVisible ? false : true} />

          <TouchableOpacity style={{ fontSize: 26, right: '50%' }}
            onPress={() => { setCofirmPassVisible(!getCofirmPassVisible) }}>
            {getCofirmPassVisible ? <Text style={styles.txtHide}>Ẩn</Text> :
              <Text style={styles.txtHide}>Hiện</Text>}
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity style={styles.buttonSub} onPress={() => { handleSinUpUser() }}>
          <Text style={styles.textRegis}>Đăng ký</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: 'flex'
  },

  title: {
    width: '100%',
    height: 40,
    backgroundColor: '#0573ff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  imgIcon: {
    height: 29,
    width: 29,
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

  noteText: {
    width: '100%',
    height: 30,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    paddingLeft: 8
  },

  formRegis: {
    width: '100%',
    height: 350,
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },

  inputDateOfBirth: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'flex-start',
    width: '83%',
    height: 35
  },

  textDate: {
    fontSize: 15,
    borderWidth: 1,
    width: 100,
    height: 35,
    textAlign: 'center',
    borderRadius:10,
    borderColor: '#0573ff',
  },

  buttonDate: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor: '#0573ff',
    borderRadius: 5
  },

  input: {
    borderWidth: 1,
    width: '90%',
    height: 40,
    fontSize: 17,
    marginLeft: 15,
    marginBottom: 10,
    paddingLeft:10,
    borderRadius:10,
    borderColor:'#0537ff'
  },

  buttonSub: {
    width: '55%',
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0573ff',
    borderRadius: 20,
    marginTop: 30
  },

  txtHide: {
    fontSize: 16,
    bottom: 5,
    right: '55%',
    width: 40,
    textAlign: 'right',
    color:'#0573ff'
  },

  textRegis: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#0573ff',
  },

  titleSubmit: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 15,
    width: '90%',
    color:'#0573ff'
  },

  titleGender:{
    fontSize:16,
    fontWeight: 'bold',
    paddingLeft:12,
    color:'#0573ff'
  }

});
