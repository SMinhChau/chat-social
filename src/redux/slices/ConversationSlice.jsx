import { Alert } from "react-native";
import { URL } from "../../utils/constant";
import { getToken } from "../../utils/function";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

export const getConversationAllByToken = createAsyncThunk(
  "conversation/getAll",
  async (accessToken, thunkAPI) => {
    try {
      const { data } = await axios.get(`${URL}/api/conversation/all-of-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

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

// Member Out conservation
export const handleMemberOutGroup = createAsyncThunk(
  "info/handleMemberOutGroup",
  async (data, thunkAPI) => {
    console.log("data_handleMemberOutGroup", data);
    try {
      const res = await axios.post(
        `${URL}/api/conversation/remove-member-conversation-group`,
        data,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            Accept: "application/json",
          },
        }
      );
      console.log("data -OutGroup", res.data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  conversations: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  searchConsevation: [],
};

const ConversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    updateSortConversations: (state, { payload }) => {
      const newConversation = state.conversations.find((x) => x.id === payload);

      const conversations = state.conversations.filter((x) => x.id != payload);

      state.conversations = [newConversation].concat(conversations);
    },
    handleSearchConversations: (state, action) => {
      const filterConversations = state.conversations.filter(
        (conversation) =>
          conversation?.name?.toLowerCase().includes(action.payload) ||
          conversation?.listMember?.toLowerCase().includes(action.payload)
      );
      return {
        ...state,
        filterConversations: [...state.conversations],
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getConversationAllByToken.fulfilled,
      (state, { payload }) => {
        state.conversations = payload.data;
        // state.searchConsevation = payload.data;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Load thành công";
      }
    );
    builder.addCase(getConversationAllByToken.pending, (state, { payload }) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(
      getConversationAllByToken.rejected,
      (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      }
    );
    builder.addCase(handleMemberOutGroup.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(handleMemberOutGroup.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });
    builder.addCase(handleMemberOutGroup.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
  },
});

export default ConversationSlice.reducer;
export const { updateSortConversations, handleSearchConversations } =
  ConversationSlice.actions;
