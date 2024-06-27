import { abc, abcWithDetails, abcWithDetailsAndDoneDate } from "./abc";

import {
  gilligan,
  gilliganWithDetails,
  gilliganWithDetailsAndDoneDate,
} from "./gilligan";

import {
  paloma,
  palomaWithDetails,
  palomaWithDetailsAndDoneDate,
} from "./paloma";

import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";

export const drinksAlcoholic: Recipe[] = [abc, gilligan, paloma];

export const drinksAlcoholicWithDetails: RecipeWithDetails[] = [
  abcWithDetails,
  gilliganWithDetails,
  palomaWithDetails,
];

export const drinksAlcoholicWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate[] =
  [
    abcWithDetailsAndDoneDate,
    gilliganWithDetailsAndDoneDate,
    palomaWithDetailsAndDoneDate,
  ];
