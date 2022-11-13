import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

export default function AddGroup() {

    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.title}>
                <TouchableOpacity style={styles.touchBack} onPress={() => { navigation.goBack() }}>
                    <Ionicons style={{ fontSize: 30, paddingRight: 10, color:'white' }} name="chevron-back-outline"></Ionicons>
                </TouchableOpacity>

                <Text style={styles.textTitle}>Nhóm mới</Text>
            </View>

            <View style={styles.formGroup}>
                <View style={styles.componentGroup}>
                    <Ionicons style={{ fontSize: 35, paddingRight: 10 }} name="people-circle-outline"></Ionicons>
                    <TextInput style={styles.inputGroupName} placeholder='Tên nhóm' />
                </View>

                <View style={styles.componentSearch}>
                    <Ionicons style={{ fontSize: 25, paddingRight: 10 }} name="search-outline"></Ionicons>
                    <TextInput style={styles.inputGroupName} keyboardType='numberic' placeholder='Tìm số điện thoại' />
                </View>

                <Text style={styles.titleList}>Danh sách bạn bè</Text>
            </View>

            <View style={styles.listFriend}>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    componentGroup: {
        width: '90%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom:15
    },

    inputGroupName: {
        width: '85%',
        height: 35,
        fontSize: 16,
        borderRadius: 5
    },

    componentSearch: {
        width: '90%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#e4e4e4'
    },

    formGroup: {
        width: '100%',
        height: 170,
        justifyContent:'center',
        alignItems:'center'
    },

    titleList:{
        fontSize:17,
        marginTop:20
    },

    listFriend:{
        width:'100%',
        height:'70%',
        borderTopWidth: 1
    },

})