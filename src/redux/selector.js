import { createSelector } from "@reduxjs/toolkit";

export const userInfoSelector = (state) => state.info.info;
export const userListSelector = (state) => state.users.user;
export const messageListSelector = (state) => state.chat.chat;
export const friendListSelector = (state) => state.friends.friends;

export const getFriendsByUserSelector = createSelector(
  userInfoSelector,
  userListSelector,
  (user, users) => {
    if (users && user?.friends) {
      const friends = users.filter((_user) => user.friends.includes(_user._id));
      return friends;
    }
    return null;
  }
);
