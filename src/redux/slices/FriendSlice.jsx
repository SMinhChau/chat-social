import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { URL } from "../../utils/constant";
import { getToken } from "../../utils/function";
const { default: axios } = require("axios");

export const getMyFriends = createAsyncThunk(
  "friends/fetchListFriends",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(`${URL}/api/user/get-list-friend`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
        },
      });
      console.log("getMyFriends", data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFriendsRequest = createAsyncThunk(
  "friends/fetchFriendsRequest",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${URL}/api/friend-request/get-friend-request`,

        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            Accept: "application/json",
          },
        }
      );
      if (data.data.code == 200) Alert.alert("Gửi thành công");

      return data.data;
    } catch (error) {
      return rejectWithValue(err.data.data);
    }
  }
);

export const updateStatusFriendsRequest = createAsyncThunk(
  "friends/updateStatusFriendsRequest",
  async (data, thunkAPI) => {
    console.log("updateStatusFriendsRequest", data);

    try {
      await axios.post(`${URL}/api/friend-request/update-status`, data, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }
);

// Send request Friend to User
export const handleSendToUser = createAsyncThunk(
  "info/handleSendToUser",
  async (id, thunkAPI) => {
    console.log(" redux id", id);
    try {
      const data = await axios.post(
        `${URL}/api/friend-request/send-to-user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            Accept: "application/json",
          },
        }
      );
      if (data.data === 200) message.success("Gửi lời mời thành công");
      // console.log("handleSendToUser", data.data);
      return data.data;
    } catch (error) {
      console.log("error", `Fetch failed: ${error.message}`);
    }
  }
);
const FriendSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(getFriendsRequest.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(updateStatusFriendsRequest.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(handleSendToUser.fulfilled, (state, action) => {
        state.friends = action.payload;
      });
  },
});

export default FriendSlice.reducer;
export const { updateFriendRequest } = FriendSlice.actions;
