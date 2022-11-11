import { configureStore } from "@reduxjs/toolkit";
import ChatSlice from "./slices/ChatSlice";
import ConversationSlice from "./slices/ConversationSlice";
import UserSlice from "./slices/UserSlice";
import UserChatSlice from "./slices/UserChatSlice";
import UserInfoSlice from "./slices/UserInfoSlice";
import OtpSlice from "./slices/OtpSlice";
import FriendSlice from "./slices/FriendSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    conversation: ConversationSlice,
    chat: ChatSlice,
    userChat: UserChatSlice,
    info: UserInfoSlice,
    otps: OtpSlice,
    friends: FriendSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
