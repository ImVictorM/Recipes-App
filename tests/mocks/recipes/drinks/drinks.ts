import {
  drinksNonAlcoholic,
  drinksNonAlcoholicWithDetails,
  drinksNonAlcoholicWithDetailsAndDoneDate,
} from "./nonAlcoholic/drinksNonAlcoholic";

import {
  drinksAlcoholic,
  drinksAlcoholicWithDetails,
  drinksAlcoholicWithDetailsAndDoneDate,
} from "./alcoholic/drinksAlcoholic";

import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";

export const drinks: Recipe[] = [...drinksNonAlcoholic, ...drinksAlcoholic];

export const drinksWithDetails: RecipeWithDetails[] = [
  ...drinksNonAlcoholicWithDetails,
  ...drinksAlcoholicWithDetails,
];

export const drinksWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate[] = [
  ...drinksNonAlcoholicWithDetailsAndDoneDate,
  ...drinksAlcoholicWithDetailsAndDoneDate,
];
