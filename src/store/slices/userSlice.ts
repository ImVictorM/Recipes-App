import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  getFromLocalStorage,
  setInLocalStorage,
} from "@/services/localStorage";

export type User = {
  email: string;
  password: string;
};

const userKey = "user";

const getInitialState = () => {
  const userFromLocalStorage = getFromLocalStorage<User>(userKey);
  return {
    email: userFromLocalStorage?.email || "",
    password: userFromLocalStorage?.password || "",
  };
};

const userSlice = createSlice({
  name: userKey,
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      setInLocalStorage(userKey, state);
    },
    removeUser: (state) => {
      state.email = "";
      state.password = "";
      localStorage.removeItem(userKey);
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { setUser, removeUser } = userSlice.actions;
export default userSlice;
