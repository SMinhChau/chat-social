import axios from "axios";
import React, { createContext, useState } from "react";
import { BASE_URL } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loadind, setLoading] = useState(false);

  const loginUser = (phoneNumber, password, navigation) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/login`, {
        phoneNumber,
        password,
      })
      .then((res) => {
        if (res.data.code == 200) {
          let userInfo = res.data.data;
          setUserInfo(userInfo);
          global.userInfo = userInfo;
          console.log(userInfo);
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          navigation.navigate("Home");
        } else {
          alert("Username or Password not correct!");
        }
      })

      .catch((e) => {
        console.log(`login error ${e}`);
        alert("Username or Password not correct!");
      });
  };

  return (
    <AuthContext.Provider value={{ loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
