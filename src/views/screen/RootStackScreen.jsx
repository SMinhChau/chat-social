import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Zolo from "../Main/zolo";
import Login from "../login/login";
import Register from "../register/register";
import RegisterPhone from "../register/registerphone";
import OtpAuth from "../register/otpauth";
import AddFriend from "../components/Model/AddFriend";
import AccountInfo from "../account/accountInfo";
import EditAccountInfo from "../account/editAccountInfo";
import Account from "../homeviews/account";


const RootStack = createStackNavigator();

function RootStackScreen() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Zolo" component={Zolo} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="RegisterPhone" component={RegisterPhone} />
      {/* <RootStack.Screen name="OtpAuth" component={OtpAuth} /> */}
      <RootStack.Screen name="Register" component={Register} />
      <RootStack.Screen name="AccountInfo" component={AccountInfo} />
      <RootStack.Screen name="EditAccountInfo" component={EditAccountInfo} />
    </RootStack.Navigator>
    
  );
}

export default RootStackScreen;
