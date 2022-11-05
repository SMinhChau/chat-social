import { configureStore } from "@reduxjs/toolkit";
import ChatSlice from "./slices/ChatSlice";
import ConversationSlice from "./slices/ConversationSlice";
import UserSlice from "./slices/UserSlice";
import UserChatSlice from "./slices/UserChatSlice";
import friendListSlice from "./slices/FriendSlice";
import OtpSlice from "./slices/OtpSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    conversation: ConversationSlice,
    chat: ChatSlice,
    userChat: UserChatSlice,
    friends: friendListSlice,
    otps: OtpSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
