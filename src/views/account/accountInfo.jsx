import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert
} from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {images} from '../../imgs/index'
import { ImagePickerModal } from '../components/Model/ImagePickerModal'
import { URL } from "../../utils/constant";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/UserSlice';
import { getToken } from '../../utils/function';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountInfo() {

    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const [imageUri, setImageUri] = useState();
    const [imageUrl, setImageUrl] = useState();
    const user = useSelector(state => state.user.user);

    const onAvatarLibrary = useCallback( async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[3,3],
            quality: 1,
            base64: true,
          });

          console.log(result.uri);
          setImageUrl(result.base64)
          handleUpdateAvatar(imageUrl);
      
          if (!result.cancelled) {
            setImageUri(result.uri);
          }
    }, []);


    const [visibleBG, setVisibleBG] = useState(false);
    const [backgroundUri, setBackgroundUri] = useState();

    const onBacgroundLibrary = useCallback( async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing:true,
          aspect:[8,4],
          quality: 1,
          base64: true,
        });

        console.log(result.uri);
    
        if (!result.cancelled) {
            setBackgroundUri(result.uri);
        }
  }, []);

    const handleUpdateAvatar = async (values) => {

        axios.put(`${URL}/api/user/update`, {
            ...values,
            avatar: imageUrl,
            id: user.id,
        }, {
            headers: {
                Authorization: `Bearer ${await getToken()}`,
                Accept: 'application/json',
            },
        }).then(res => {
            Alert.alert("Cập nhật ảnh thành công");
            let user = res?.data?.data;
            console.log(res);
            AsyncStorage.setItem("user", JSON.stringify(user));git
            dispatch(updateUser(user))
        }).catch(err => console.log(err))
    }

    // const permisionFunction = async () => {
    //     // here is how you can get the camera permission
    
    //     const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    //     console.log(imagePermission.status);
    
    //     setGalleryPermission(imagePermission.status === 'granted');
    
    //     if (imagePermission.status !== 'granted') {
    //       alert('Permission for media access needed.');
    //     }
    //   };

    return (
        <SafeAreaView style={styles.container}>

            {/* cover image */}
            <View style={styles.backgroundImg}>
                {backgroundUri? 
                    <Image style={{ width: '100%', height: '100%' }} source={{uri: backgroundUri}} /> :
                    <Image style={{ width: '100%', height: '100%' }} source={images.cover} />
                }
                <TouchableOpacity style={{position:'absolute', right:10, bottom:10}} onPress={() => {setVisibleBG(true)}}>
                    <Image style={styles.editBackground} source={images.editing}/>
                </TouchableOpacity>
            </View>

            {/* avatar image */}
            <View style={styles.containerImg}>
                {imageUri ?
                    <Image style={styles.avatar} source={{uri: imageUri}}/> : 
                    <Image style={styles.avatar} source={images.avatar}/>
                }
                <TouchableOpacity style={{position:'absolute', right:5, bottom:5}} onPress={() => setVisible(true)}>
                    <Image style={styles.editAvatar} source={images.editing}/>
                </TouchableOpacity>
            </View>

            <Text style={styles.textNameUser}>Your Name</Text>

            {/* Modal option */}
            <ImagePickerModal
                isVisible={visible}
                onClose={() => setVisible(false)}
                onImageLibraryPress={onAvatarLibrary}
            />

            {/* Modal option */}
            <ImagePickerModal
                isVisible={visibleBG}
                onClose={() => setVisibleBG(false)}
                onImageLibraryPress={onBacgroundLibrary}
            />

            {/* button back */}
            <View style={styles.title}>
                <TouchableOpacity style={styles.touchBack} onPress={() => { navigation.navigate('Home') }}>
                    <Image source={require('../../imgs/left-arrow.png')} style={styles.imgIcon} />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },

    backgroundImg: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderBottomWidth: 2
    },

    containerImg: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -70
    },

    avatarBorder:{
        width: 100,
        height:100,
        borderRadius: 100,    
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: '#000',
        borderWidth:2
    },

    touchBack: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        width: 35,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        margin: 10,
        left:0
    },

    imgIcon: {
        height: 30,
        width: 30,
    },

    textNameUser: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold'
    },

    editAvatar:{
        width:25,
        height:25
    },

    editBackground:{
        width:30,
        height:30
    },



});
