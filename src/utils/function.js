import AsyncStorage from "@react-native-async-storage/async-storage";
export const getToken = async () =>
  JSON.parse(await AsyncStorage.getItem("accessToken")) || "";
