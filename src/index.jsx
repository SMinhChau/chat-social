import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountSercuriery from "./views/account/AccountSercuriery";
import ChangePass from "./views/account/ChangePass";
import ChatItem from "./views/chats/ChatItem";
import AddNewFriendsGroup from "./views/chats/info/AddNewFriendsGroup";
import GroupManage from "./views/chats/info/GroupManage";
import InfoChat from "./views/chats/info/InfoChat";
import AddFriend from "./views/components/Model/AddFriend";

import FriendRequest from "./views/components/Model/FriendRequest";
import AddGroup from "./views/components/Model/group/AddGroup";
import AuthNewPass from "./views/login/AuthNewPass";
import AuthPhone from "./views/login/AuthPhone";
import AuthPhoneOTP from "./views/login/AuthPhoneOTP";

import RootStackScreen from "./views/screen/RootStackScreen";

import TabsScreen from "./views/screen/TabsScreen";

const Stack = createStackNavigator();

// 0923713557
export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Zolo"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="RootStackScreen" component={RootStackScreen} />
        <Stack.Screen name="Home" component={TabsScreen} />
        <Stack.Screen name="Chats" component={ChatItem} />
        <Stack.Screen name="AddFriend" component={AddFriend} />
        <Stack.Screen name="AddGroup" component={AddGroup} />
        <Stack.Screen name="FriendRequest" component={FriendRequest} />
        <Stack.Screen name="AccountSercuriery" component={AccountSercuriery} />
        <Stack.Screen name="ChangePass" component={ChangePass} />
        <Stack.Screen name="AuthPhone" component={AuthPhone} />
        <Stack.Screen name="AuthPhoneOTP" component={AuthPhoneOTP} />
        <Stack.Screen name="InfoChat" component={InfoChat} />
        <Stack.Screen name="AuthNewPass" component={AuthNewPass} />
        <Stack.Screen name="GroupManage" component={GroupManage} />
        <Stack.Screen
          name="AddNewFriendsGroup"
          component={AddNewFriendsGroup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
