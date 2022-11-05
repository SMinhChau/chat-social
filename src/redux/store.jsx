import { configureStore } from "@reduxjs/toolkit";
import ChatSlice from "./slices/ChatSlice";
import ConversationSlice from "./slices/ConversationSlice";
import UserSlice from "./slices/UserSlice";
import UserChatSlice from "./slices/UserChatSlice";
import friendListSlice from "./slices/FriendSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    conversation: ConversationSlice,
    chat: ChatSlice,
    userChat: UserChatSlice,
    friends: friendListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
