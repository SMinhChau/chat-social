import { URL } from "../../utils/constant";
import { getToken } from "../../utils/function";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

// Get infor user join conservation
export const fetchUserSenderById = createAsyncThunk(
  "info/fetchUserInfo",
  async (id, thunkAPI) => {
    try {
      const data = await axios.get(`${URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
        },
      });
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Change PassWord
export const handleChangePassword = createAsyncThunk(
  "info/handleChangePassword",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/api/user/change-password`, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
        },
      });
      // console.log(res.data);
    } catch (error) {
      console.log("error", `Change Password: ${error.message}`);
    }
  }
);

// Then, handle actions in your reducers:
const UserInfoSlice = createSlice({
  name: "info",
  initialState: { status: "idle", info: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserSenderById.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserSenderById.fulfilled, (state, action) => {
      state.info = action.payload;
      state.status = "idle";
    });
    builder.addCase(handleChangePassword.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(handleChangePassword.fulfilled, (state, action) => {
      state.info = action.payload;
    });
  },
});
export default UserInfoSlice.reducer;
