import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

export type User = {
  email: string;
};

const userKey = "user";

const getInitialState = () => {
  const userFromLocalStorage = getFromLocalStorage<User>(userKey);
  return {
    email: userFromLocalStorage?.email || "",
  };
};

const userSlice = createSlice({
  name: userKey,
  initialState: getInitialState(),
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;

      setToLocalStorage(userKey, state);
    },
    removeUser: (state) => {
      state.email = "";

      localStorage.removeItem(userKey);
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { setUser, removeUser } = userSlice.actions;
export default userSlice;
