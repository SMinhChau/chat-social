import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Zolo from "../Main/zolo";
import Login from "../login/login";
import Register from "../register/register";
import RegisterPhone from "../register/registerphone";

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
      <RootStack.Screen name="Register" component={Register} />
    </RootStack.Navigator>
  );
}

export default RootStackScreen;
