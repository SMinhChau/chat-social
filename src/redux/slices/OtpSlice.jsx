import { Option } from "antd/lib/mentions";
import { URL } from "../../utils/constant";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export const OtpVerify = createAsyncThunk(
  "otps/otpverify",
  async ({otps}, thunkAPI) => {
    try {
      const { data } = await axios.post(`${URL}/api/auth/verify-otp-phone-number`, otps);
      // localStorage.setItem(
      //   "accessToken",
      //   JSON.stringify(data.data.accessToken)
      // );
        return data;
      
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        status: 401,
        message: "OTP không đúng",
      });
    }
  }
);

const initialState = {
  otps: {
    otp: "",
    phoneNumber: "",
  },
  message: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

const OtpSlice = createSlice({
  name: "otps",
  initialState,
  reducers: {
    logout: (state) => {
      state.otps = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(OtpVerify.fulfilled, (state, { payload }) => {
      state.otps = payload.data;
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.message = "Xác nhận thành công";
    });
    builder.addCase(OtpVerify.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(OtpVerify.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = payload.message;
    });
  },
});

export default OtpSlice.reducer;
export const { logout } = OtpSlice.actions;
