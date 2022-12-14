import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../homeviews/home";
import PhoneBooks from "../homeviews/phonebooks";
import Account from "../homeviews/account";
import Login from "../login/login";
import AccountInfo from "../account/accountInfo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabsScreen() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Tin Nhắn") {
              iconName = focused
                ? "chatbubble-ellipses-sharp"
                : "chatbubble-ellipses-outline";
            } else if (route.name === "Danh bạ") {
              iconName = focused ? "md-call" : "md-call";
            } else if (route.name === "Nhật ký") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "Cá nhân") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name="Tin Nhắn"
          component={Home}
          options={{ headerShown: false, tabBarVisible: false }}
        />
        <Tab.Screen
          name="Danh bạ"
          component={PhoneBooks}
          options={{ headerShown: false, tabBarVisible: false }}
        />

        <Tab.Screen
          name="Cá nhân"
          component={Account}
          options={{ headerShown: false, tabBarVisible: false }}
        />
      </Tab.Navigator>
    </>
  );
}

export default TabsScreen;
