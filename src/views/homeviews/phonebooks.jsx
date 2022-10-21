import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";


export default function PhoneBooks() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.searchComponent}>
        <TouchableOpacity style={styles.buttonSearch}>
            <Ionicons name="search-outline" style={{fontSize:25, marginHorizontal: 10, color:'white'}}/>
            <Text style={styles.textSearch}>Tìm kiếm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSetting}>
            <Ionicons name="settings-outline" style={{fontSize:25, color:'white'}}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchComponent:{
    width: '100%',
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },

  buttonSearch:{
    flexDirection: 'row',
    flex: 9,
    backgroundColor:'#0068FF',
    height:'100%',
    justifyContent: 'flex-start',
    alignItems:'center',

  },

  buttonSetting:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height:'100%',
    backgroundColor: '#0068FF'
  },

  textSearch:{
    fontSize: 16,
    color:'#bebebe'
  }
});