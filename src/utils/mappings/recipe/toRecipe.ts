import MappingRecipeError from "@/errors/mappings/MappingRecipeError";

import { isDrink, isMeal } from "./common";
import { Drink } from "@/services/menu/cocktail/types";
import { Meal } from "@/services/menu/meal/types";
import { Recipe } from "@/store/slices/menu/menuSlice.types";
import { MenuRecipeType } from "@/services/menu/common.types";

export default function toRecipe(recipe: MenuRecipeType): Recipe {
  if (isMeal(recipe)) {
    const mealRecipe = recipe as Meal;

    return {
      type: "meal",
      id: mealRecipe.idMeal,
      img: mealRecipe.strMealThumb,
      name: mealRecipe.strMeal,
    };
  } else if (isDrink(recipe)) {
    const drinkRecipe = recipe as Drink;

    return {
      type: "drink",
      id: drinkRecipe.idDrink,
      img: drinkRecipe.strDrinkThumb,
      name: drinkRecipe.strDrink,
    };
  }

  throw new MappingRecipeError("Recipe");
}
