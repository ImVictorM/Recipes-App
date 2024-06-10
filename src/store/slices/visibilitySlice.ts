import { createSlice } from "@reduxjs/toolkit";
import { Visibility } from "./visibilitySlice.types";

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
  selectors: {
    selectVisibility: (state) => state,
  },
});

export const { toggleSearchBarVisibility } = visibilitySlice.actions;

export const { selectVisibility } = visibilitySlice.selectors;

export default visibilitySlice;
