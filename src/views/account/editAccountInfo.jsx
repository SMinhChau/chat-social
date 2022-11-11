import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from "react-native-vector-icons/Ionicons";
import RadioGroup from 'react-native-radio-buttons-group';
import axios from 'axios';
import { URL } from '../../utils/constant';
import { getToken } from '../../utils/function';
import { updateUser } from '../../redux/slices/UserSlice';

const radioButtonsData = [
    {
        id: '1',
        label: 'Nam',
        value: 'true',
        color: '#0357ff'
    },
    {
        id: '2',
        label: 'Nữ',
        value: 'false',
        color: '#0357ff'
    },
];

export default function EditAccountInfo() {

    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const milliseconds = user.dateOfBirth;
    const dateObject = new Date(milliseconds);

    //dateOfBirth
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState(dateObject.getDate() + "/" + dateObject.getMonth() + "/" + dateObject.getFullYear());

    const [name, setName] = useState(user.name);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tmpDate = new Date(currentDate);
        const fDate = tmpDate.getDate() + '/' + (tmpDate.getMonth() + 1) + '/' + tmpDate.getFullYear();
        setText(fDate);

        console.log(fDate);
    }

    const showMode = (curentMode) => {
        setShow(true);
        setMode(curentMode);
    }

    //gender
    const [radioButtons, setRadioButtons] = useState("true");
    const setValue = (value) => {
        var newArray = value.filter((item) => item.selected === true);
        setRadioButtons(newArray[0].value);
    };

    const handleUpdateInfo = async () => {
        axios.put(`${URL}/api/user/update`, {
            avatar: user.avatar,
            coverImage: user.coverImage,
            name: name,
            dateOfBirth: date,
            gender: radioButtons,
            id: user.id,
        }, {
            headers: {
                Authorization: `Bearer ${await getToken()}`,
                Accept: 'application/json',
            },
        }).then(res => {
            console.log("Res", res);
            navigation.goBack();
            Alert.alert("cập nhật thông tin thành công");
            dispatch(updateUser(res.data.data));
        }).catch(err => console.log(err))
    };

    // useEffect(() => {
    //     radioButtons[0].selected;
    // })

    return (
        <SafeAreaView style={styles.container} >

            <View style={styles.title}>
                <TouchableOpacity style={styles.touchBack} onPress={() => { navigation.goBack() }}>
                    <Image source={require('../../imgs/left-arrow.png')} style={styles.imgIcon} />
                </TouchableOpacity>

                <Text style={styles.textTitle}>Chỉnh sửa thông tin</Text>
            </View>

            {/* edit infomation */}
            <View style={styles.componentInput} >
                <TextInput style={styles.inputName} value={name} onChangeText={text => { setName(text) }}></TextInput>

                <TouchableOpacity style={styles.buttonIcon} onPress={() => { setName("") }}>
                    <Ionicons style={{ fontSize: 30 }} name="close-outline"></Ionicons>
                </TouchableOpacity>
            </View>

            <View style={styles.componentInput} >

                <TextInput style={styles.inputName} value={text} />

                <TouchableOpacity style={styles.buttonIcon} onPress={() => showMode('date')}>
                    <Ionicons style={{ fontSize: 25 }} name="create-outline"></Ionicons>
                </TouchableOpacity>

                {show && <DateTimePicker
                    testID='DateTimePicker'
                    value={date}
                    mode={mode}
                    display='default'
                    onChange={onChange}
                />}
            </View>

            <View style={styles.componentInput} >
                <RadioGroup
                    radioButtons={radioButtonsData} //pass in our array
                    onPress={(value) => setValue(value)}
                    layout='row'
                />
                {/* <Text>{radioButtons}</Text> */}
            </View>

            {name == '' ?
                (<TouchableOpacity disabled style={styles.buttonUpdateDis}>
                    <Text style={styles.textBtnName}>Cập nhật</Text>
                </TouchableOpacity>)
                :
                (<TouchableOpacity style={styles.buttonUpdate} onPress={() => { handleUpdateInfo() }}>
                    <Text style={styles.textBtnName}>Cập nhật</Text>
                </TouchableOpacity>)}


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    inputName: {
        borderBottomWidth: 1,
        width: '70%',
        height: 40,
        fontSize: 16
    },

    componentInput: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        width: '100%',
        height: 40,
        backgroundColor: '#0573ff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    touchBack: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    imgIcon: {
        height: 30,
        width: 30,
        marginHorizontal: 10
    },

    textTitle: {
        fontSize: 22,
        color: 'white',
        height: 40,
        width: '62%',
        paddingTop: 4,
    },

    buttonUpdate: {
        width: '80%',
        height: 35,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0573ff',
        marginTop: 15
    },

    buttonUpdateDis: {
        width: '80%',
        height: 35,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#afafaf',
        marginTop: 15
    },

    textBtnName: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold'
    },

    buttonIcon: {
        left: -23
    }
})