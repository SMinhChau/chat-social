import { URL } from "../../utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");
import { getToken } from "../../utils/function";

export const SignInUser = createAsyncThunk(
  "user/signin",
  async ({ user }, thunkAPI) => {
    // console.log(user);
    try {
      const { data } = await axios.post(`${URL}/api/auth/login`, user);
      await AsyncStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        status: 401,
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
  }
);

export const SignUpUser = createAsyncThunk(
  "user/signup",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(`${URL}/api/user/create`, user);
      await AsyncStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        status: 401,
        message: "Đăng ký thất bại",
      });
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId, thunkAPI) => {
    try {
      console.log("SlideuserId", userId);
      const { data } = await fetch(`${URL}/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
        },
      });
      const contentReverse = data.reverse();
      data = contentReverse;
      // console.log("data", contentReverse);
      return contentReverse;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        status: 401,
        message: "Người dùng không tồn tại",
      });
    }
  }
);

const initialState = {
  user: {
    userId: "",
    accessToken: "",
  },
  message: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      AsyncStorage.removeItem("user");
      // state.user = null;
      // state.isSuccess = false;
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignInUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = "Đăng nhập thành công";
    });
    builder.addCase(SignInUser.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(SignInUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = payload.message;
    });
    builder.addCase(SignUpUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = "Đăng ký thành công";
    });
    builder.addCase(SignUpUser.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(SignUpUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = payload.message;
    });
  },
});

export default UserSlice.reducer;
export const { logout, updateUser } = UserSlice.actions;
