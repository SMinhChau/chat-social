import { URL } from "../../utils/constant";
import { getToken } from "../../utils/function";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

// First, create the thunk
export const fetchUserSenderById = createAsyncThunk(
  "info/fetchUserInfo",
  async (id, thunkAPI) => {
    console.log(" redux id", id);
    try {
      const data = await axios.get(`${URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
        },
      });

      // console.log("Slide", data.data);
      return data.data;
    } catch (error) {
      console.log(error);
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
  },
});
export default UserInfoSlice.reducer;
