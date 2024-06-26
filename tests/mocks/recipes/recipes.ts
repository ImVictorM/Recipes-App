import meals, {
  mealsWithDetails,
  mealsWithDetailsAndDoneDate,
} from "./meals/meals";

import {
  drinks,
  drinksWithDetails,
  drinksWithDetailsAndDoneDate,
} from "./drinks/drinks";

import {
  RecipeWithDetailsAndDoneDate,
  Recipe,
  RecipeWithDetails,
} from "@/store/slices/menu/menuSlice.types";

export const recipes: Recipe[] = [...meals, ...drinks];

export const recipesWithDetails: RecipeWithDetails[] = [
  ...mealsWithDetails,
  ...drinksWithDetails,
];

export const recipesWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate[] = [
  ...mealsWithDetailsAndDoneDate,
  ...drinksWithDetailsAndDoneDate,
];
