import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null | "";
  strTags: string | null | "";
  strVideo: string | null | "";
  strCategory: string;
  strIBA: string | null | "";
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string | null | "";
  strInstructionsDE: string | null | "";
  strInstructionsFR: string | null | "";
  strInstructionsIT: string | null | "";
  "strInstructionsZH-HANS": string | null | "";
  "strInstructionsZH-HANT": string | null | "";
  strDrinkThumb: string;
  strIngredient1: string | null | "";
  strIngredient2: string | null | "";
  strIngredient3: string | null | "";
  strIngredient4: string | null | "";
  strIngredient5: string | null | "";
  strIngredient6: string | null | "";
  strIngredient7: string | null | "";
  strIngredient8: string | null | "";
  strIngredient9: string | null | "";
  strIngredient10: string | null | "";
  strIngredient11: string | null | "";
  strIngredient12: string | null | "";
  strIngredient13: string | null | "";
  strIngredient14: string | null | "";
  strIngredient15: string | null | "";
  strMeasure1: string | null | "";
  strMeasure2: string | null | "";
  strMeasure3: string | null | "";
  strMeasure4: string | null | "";
  strMeasure5: string | null | "";
  strMeasure6: string | null | "";
  strMeasure7: string | null | "";
  strMeasure8: string | null | "";
  strMeasure9: string | null | "";
  strMeasure10: string | null | "";
  strMeasure11: string | null | "";
  strMeasure12: string | null | "";
  strMeasure13: string | null | "";
  strMeasure14: string | null | "";
  strMeasure15: string | null | "";
  strImageSource: string | null | "";
  strImageAttribution: string | null | "";
  strCreativeCommonsConfirmed: string | null | "";
  dateModified: string | null | "";
};

export type Meal = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null | "";
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null | "";
  strYoutube: string | null | "";
  strIngredient1: string | null | "";
  strIngredient2: string | null | "";
  strIngredient3: string | null | "";
  strIngredient4: string | null | "";
  strIngredient5: string | null | "";
  strIngredient6: string | null | "";
  strIngredient7: string | null | "";
  strIngredient8: string | null | "";
  strIngredient9: string | null | "";
  strIngredient10: string | null | "";
  strIngredient11: string | null | "";
  strIngredient12: string | null | "";
  strIngredient13: string | null | "";
  strIngredient14: string | null | "";
  strIngredient15: string | null | "";
  strIngredient16: string | null | "";
  strIngredient17: string | null | "";
  strIngredient18: string | null | "";
  strIngredient19: string | null | "";
  strIngredient20: string | null | "";
  strMeasure1: string | null | "";
  strMeasure2: string | null | "";
  strMeasure3: string | null | "";
  strMeasure4: string | null | "";
  strMeasure5: string | null | "";
  strMeasure6: string | null | "";
  strMeasure7: string | null | "";
  strMeasure8: string | null | "";
  strMeasure9: string | null | "";
  strMeasure10: string | null | "";
  strMeasure11: string | null | "";
  strMeasure12: string | null | "";
  strMeasure13: string | null | "";
  strMeasure14: string | null | "";
  strMeasure15: string | null | "";
  strMeasure16: string | null | "";
  strMeasure17: string | null | "";
  strMeasure18: string | null | "";
  strMeasure19: string | null | "";
  strMeasure20: string | null | "";
  strSource: string | null | "";
  strImageSource: string | null | "";
  strCreativeCommonsConfirmed: string | null | "";
  dateModified: string | null | "";
};

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
