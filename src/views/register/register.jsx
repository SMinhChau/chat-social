import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, Button, Platform } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from "react";
import  DateTimePicker from '@react-native-community/datetimepicker';

export default function Register({ navigation }) {
  const [getPassVisible, setPassVisible] = useState(false);
  const [getCofirmPassVisible, setCofirmPassVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  const onChange = (event, selectedDate) =>{
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

  return (

    <SafeAreaView style={styles.main}>
      <View style={styles.title}>
        <TouchableOpacity style={styles.touchBack} onPress={() => { navigation.goBack() }}>
          <Image source={require('../../imgs/left-arrow.png')} style={styles.imgIcon} />
        </TouchableOpacity>

        <Text style={styles.textTitle}>Đăng ký</Text>
      </View>

      <View style={styles.noteText}>
        <Text>Sử dụng tên thật để bạn bè dễ nhận ra bạn</Text>
      </View>

      <KeyboardAvoidingView style={styles.formRegis}>
        <Text style={styles.titleSubmit}>Tên hiển thị:</Text>
        <View style={styles.inputComponent}>
          <TextInput style={styles.inputName} />
        </View>

        <View style={styles.inputDateOfBirth}>
          <TextInput style={styles.textDate} placeholder='dd/mm/yy' >{text}</TextInput>

          <TouchableOpacity style={styles.buttonDate} onPress={() => showMode('date')}>
            <Text style={{color:'white', fontWeight:'bold'}}>Ngày sinh</Text>
          </TouchableOpacity>

          {show && <DateTimePicker 
              testID='DateTimePicker'
              value={date}
              mode={mode}
              display='default'
              onChange={onChange}
          />}
        </View>

        <Text style={styles.titleSubmit}>Mật khẩu:</Text>

        <View style={styles.inputComponent}>
          <TextInput style={styles.inputPass}
            secureTextEntry={getPassVisible ? false : true} />

          <TouchableOpacity style={{ fontSize: 26, right: '50%' }}
            onPress={() => { setPassVisible(!getPassVisible) }}>
            {getPassVisible ? <Text style={styles.txtHide}>Ẩn</Text> :
              <Text style={styles.txtHide}>Hiện</Text>}
          </TouchableOpacity>
        </View>

        <Text style={styles.titleSubmit}>Xác nhận mật khẩu:</Text>

        <View style={styles.inputComponent}>
          <TextInput style={styles.inputPass}
            secureTextEntry={getCofirmPassVisible ? false : true} />

          <TouchableOpacity style={{ fontSize: 26, right: '50%' }}
            onPress={() => { setCofirmPassVisible(!getCofirmPassVisible) }}>
            {getCofirmPassVisible ? <Text style={styles.txtHide}>Ẩn</Text> :
              <Text style={styles.txtHide}>Hiện</Text>}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonSub} onPress={() => { navigation.navigate('Home'); }}>
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
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
  },

  inputDateOfBirth:{
    display:'flex',
    flexDirection:'row',
    marginTop:15,
    justifyContent:'flex-start',
    width:'83%',
    height:35
  },

  textDate:{
    fontSize:15,
    borderBottomWidth:1,
    width: 100,
    height:30,
    textAlign:'center'
  },

  buttonDate:{
    width:100,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20,
    backgroundColor:'#0573ff',
    borderRadius:5
  },

  inputName: {
    borderBottomWidth: 1,
    width: '90%',
    height: 35,
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10
  },

  inputPass: {
    borderBottomWidth: 1,
    width: '90%',
    height: 35,
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10
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
    textAlign: 'right'
  },

  textRegis: {
    fontSize: 18,
    color: '#fff',
  },

  titleSubmit: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    paddingLeft: 15,
    width: '90%'
  }

});
