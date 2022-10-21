import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function RegisterPhone({ navigation }) {
  return (

    <SafeAreaView style={styles.main}>
      <View style={styles.title}>
        <TouchableOpacity style={styles.touchBack} onPress={() => {navigation.goBack()}}>
          <Image source={require('../../imgs/left-arrow.png')} style={styles.imgIcon}/>
        </TouchableOpacity>
        
        <Text style={styles.textTitle}>Đăng ký</Text>
      </View>

      <View style={styles.noteText}>
        <Text>Xác thực số điện thoại</Text>
      </View>

      <KeyboardAvoidingView style={styles.formRegis}>

        <Text style={styles.textPhone}>Số điện thoại:</Text>
        <TextInput style={styles.inputPhoneNumber} keyboardType='numeric' placeholder='Vui lòng nhập số điện thoại' />

        <TouchableOpacity style={styles.buttonSub} onPress={() => {navigation.navigate('Register');}}>
          <Text style={styles.textNext}>Tiếp theo</Text>
          <Ionicons name='chevron-forward-outline' style={{fontSize:25, color:'white', flex:2}}/>
        </TouchableOpacity>

      <View style={styles.loginLink}>
          <Text>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => {navigation.navigate('Login');}}>
            <Text style={{color:'#0573ff',fontStyle:'italic'}}>Đăng nhập.</Text>
          </TouchableOpacity>
      </View>

      </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  title: {
    width: '100%',
    height: 40,
    backgroundColor: '#0573ff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  imgIcon:{
    height: 29, 
    width:29,
  },

  textTitle: {
    fontSize: 22,
    color: 'white',
    height: 40,
    width:'62%',
    paddingTop: 4,
  },

  touchBack: {
    width: '12%',
    height: '100%',
    justifyContent: 'center',
    alignItems:'center'
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
    height: '25%',
    alignItems: 'center',
    marginTop:30
  },

  inputPhoneNumber: {
    borderBottomWidth: 1,
    width: '90%',
    height: 35,
    fontSize: 15
  },

  buttonSub: {
    width: '50%',
    height: 43,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0573ff',
    borderRadius: 20,
    marginTop: 35
  },

  textNext: {
    fontSize: 18,
    color: '#fff',
    flex:12,
    textAlign:'center'
  },

  textPhone: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    width: '90%'
  },

  loginLink:{
    width:'100%',
    marginTop:15,
    justifyContent:'center',
    flexDirection:'row'
  }

});
