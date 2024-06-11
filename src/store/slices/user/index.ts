import userSlice from "./userSlice";

export default userSlice;

export const { removeUser, setUser } = userSlice.actions;

export const { selectUser } = userSlice.selectors;
