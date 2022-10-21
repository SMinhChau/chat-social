import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Message({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.header}>
            <TouchableOpacity style={styles.buttonBack} onPress={() => {navigation.navigate('Home');}}>
                <Ionicons name="arrow-back" style={{fontSize:28, color:'white'}}></Ionicons>
            </TouchableOpacity>

            <View style={styles.name}>
                <Text style={styles.txtName}>Your Name</Text>
            </View>

            <View style={styles.option}>
              <TouchableOpacity>
                  <Ionicons name="call-outline" style={{fontSize:22, color:'white'}}></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity>
                  <Ionicons name="videocam-outline" style={{fontSize:25, color:'white'}}></Ionicons>
              </TouchableOpacity>

              <TouchableOpacity>
                  <Ionicons name="list-outline" style={{fontSize:25, color:'white'}}></Ionicons>
              </TouchableOpacity>
            </View>
        </View>

        <View style={styles.content}></View>

        <View style={styles.footer}>
            <TouchableOpacity style={styles.sticker}>
               <Ionicons name="happy-outline" style={{fontSize:32}}></Ionicons>
            </TouchableOpacity>

            <View style={styles.txtMessages}>
                <TextInput style={styles.txtContent} placeholder='Tin nhắn'/>
            </View>

            <TouchableOpacity style={styles.buttonSend}>
                <Ionicons name="send" style={{fontSize:30, color:'#0068FF'}}></Ionicons>
            </TouchableOpacity>
        </View>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },

   header:{
    width: '100%',
    height: '7%',
    flexDirection:'row',
    backgroundColor: '#0068FF',
   },

   content:{
    width: '100%',
    height: '86%',
    backgroundColor:'#d6d5d5'
   },


   footer:{
    width: '100%',
    height: '7%',
    borderTopWidth: 0.5,
    flexDirection:'row'
   },

   buttonBack:{
    height:'100%',
    width: '15%',
    justifyContent:'center',
    alignItems:'center'
   },

   name:{
    height:'100%',
    width: '50%',
    justifyContent:'center'
   },

   option:{
    height:'100%',
    width: '35%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
   },

   txtName:{
    fontSize: 17,
    color:'white'
   },

   sticker:{
    height:'100%',
    width:'12%',
    justifyContent:'center',
    alignItems:'center'
   },

   txtMessages:{
    height:'100%',
    width:'75%',
    justifyContent:'center',
   },

   txtContent:{
    fontSize:18,
    width:'100%',
    height:'100%'
  },

   buttonSend:{
    height:'100%',
    width:'13%',
    justifyContent:'center',
    alignItems:'center'
   }
});
