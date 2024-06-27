import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";
import {
  frappe,
  frappeWithDetails,
  frappeWithDetailsAndDoneDate,
} from "./frappe";

export const drinksNonAlcoholic: Recipe[] = [frappe];

export const drinksNonAlcoholicWithDetails: RecipeWithDetails[] = [
  frappeWithDetails,
];

export const drinksNonAlcoholicWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate[] =
  [frappeWithDetailsAndDoneDate];
