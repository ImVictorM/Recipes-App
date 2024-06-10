import { createSlice } from "@reduxjs/toolkit";

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
  selectors: {
    selectVisibility: (state) => state,
  },
});

export default visibilitySlice;
