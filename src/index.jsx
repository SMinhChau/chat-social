import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
