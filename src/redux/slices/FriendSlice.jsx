import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../utils/constant";
import { getToken } from "../../utils/function";
const { default: axios } = require("axios");

const handleAddFriend = async (data) => {
  const { id } = data;

  const { status, senderID, receiverID } = data;
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
    console.log(status, senderID, receiverID);
  } catch (error) {
    console.log(error);
  }
};

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
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const FriendSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
    friendId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyFriends.fulfilled, (state, action) => {
      state.friends = action.payload;
    });
  },
});

export default FriendSlice.reducer;
