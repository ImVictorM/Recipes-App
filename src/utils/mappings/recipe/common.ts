import { Drink } from "@/services/menu/cocktail/types";
import { Meal } from "@/services/menu/meal/types";
import { MenuRecipeType } from "./common.types";

export function isMeal(recipe: MenuRecipeType): recipe is Meal {
  return (recipe as Meal).strMeal !== undefined;
}

export function isDrink(recipe: MenuRecipeType): recipe is Drink {
  return (recipe as Drink).strDrink !== undefined;
}
