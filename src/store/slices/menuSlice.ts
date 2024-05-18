import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Meal } from "@/services/menu/mealApi";
import { Drink } from "@/services/menu/cocktailApi";

export type Menu = {
  drinks: Drink[];
  meals: Meal[];
};

const initialState: Menu = {
  drinks: [],
  meals: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setDrinks: (state, action: PayloadAction<Drink[]>) => {
      state.drinks = action.payload;
    },
    setMeals: (state, action: PayloadAction<Meal[]>) => {
      state.meals = action.payload;
    },
  },
});

export const selectMenu = (state: RootState) => state.menu;

export const { setDrinks, setMeals } = menuSlice.actions;
export default menuSlice;
