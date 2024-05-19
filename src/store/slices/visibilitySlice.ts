import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

type Visibility = {
  showSearchBar: boolean;
};

const initialState: Visibility = {
  showSearchBar: false,
};

const visibilitySlice = createSlice({
  name: "visibility",
  initialState,
  reducers: {
    toggleSearchBarVisibility: (state) => {
      state.showSearchBar = !state.showSearchBar;
    },
  },
});

export const selectVisibility = (state: RootState) => state.visibility;

export const { toggleSearchBarVisibility } = visibilitySlice.actions;
export default visibilitySlice;
