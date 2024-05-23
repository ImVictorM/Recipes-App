import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type Recipe = {
  id: string;
  img: string;
  name: string;
};

export type Menu = {
  recipes: Recipe[];
};

const initialState: Menu = {
  recipes: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
  },
});

export const selectMenu = (state: RootState) => state.menu;

export const { setRecipes } = menuSlice.actions;
export default menuSlice;
