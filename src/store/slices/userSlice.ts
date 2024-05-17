import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type User = {
  email: string;
  password: string;
};

const initialState: User = {
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { setUser } = userSlice.actions;
export default userSlice;
