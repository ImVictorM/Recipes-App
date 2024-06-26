import {
  bigMac,
  bigMacWithDetails,
  bigMacWithDetailsAndDoneDate,
} from "./bigMac";

import { corba, corbaWithDetails, corbaWithDetailsAndDoneDate } from "./corba";

import {
  kumpir,
  kumpirWithDetails,
  kumpirWithDetailsAndDoneDate,
} from "./kumpir";

import {
  poutine,
  poutineWithDetails,
  poutineWithDetailsAndDoneDate,
} from "./poutine";
import { sushi, sushiWithDetails, sushiWithDetailsAndDoneDate } from "./sushi";

import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";

export const meals: Recipe[] = [bigMac, corba, kumpir, poutine, sushi];

export const mealsWithDetails: RecipeWithDetails[] = [
  bigMacWithDetails,
  corbaWithDetails,
  kumpirWithDetails,
  poutineWithDetails,
  sushiWithDetails,
];

export const mealsWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate[] = [
  bigMacWithDetailsAndDoneDate,
  corbaWithDetailsAndDoneDate,
  kumpirWithDetailsAndDoneDate,
  poutineWithDetailsAndDoneDate,
  sushiWithDetailsAndDoneDate,
];

export default meals;
