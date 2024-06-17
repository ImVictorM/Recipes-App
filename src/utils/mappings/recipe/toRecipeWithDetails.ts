import toRecipe from "./toRecipe";

import MappingRecipeError from "@/errors/mappings/MappingRecipeError";

import { isDrink, isMeal } from "./common/checkRecipeType";
import { RecipeWithDetails } from "@/store/slices/menu/menuSlice.types";
import { Meal } from "@/services/menu/meal/types";
import { Drink } from "@/services/menu/cocktail/types";
import { MenuRecipeType } from "@/services/menu/common/types";

function combineIngredientWithMeasure(recipe: MenuRecipeType) {
  const entries = Object.entries(recipe);

  return entries.reduce<[string, string][]>((acc, [key, value]) => {
    if (key.match(/strIngredient(\d+)$/) && value) {
      const ingredientNumber = key.match(/\d+$/)![0];
      const measureKey = `strMeasure${ingredientNumber}`;

      let measure: string | null = null;

      if (isMeal(recipe)) {
        measure = (recipe as Meal)[measureKey as keyof Meal] as string | null;
      } else if (isDrink(recipe)) {
        measure = (recipe as Drink)[measureKey as keyof Drink] as string | null;
      }

      acc.push([value as string, measure || ""]);
    }
    return acc;
  }, []);
}

export default function toRecipeWithDetails(
  recipe: Meal | Drink
): RecipeWithDetails {
  if (isMeal(recipe)) {
    const mealRecipe = recipe as Meal;

    return {
      ...toRecipe(mealRecipe),
      category: mealRecipe.strCategory,
      instructions: mealRecipe.strInstructions,
      tags: mealRecipe.strTags?.match(/[A-Z][a-z]*/g) || [],
      video: mealRecipe.strYoutube || undefined,
      nationality: mealRecipe.strArea,
      ingredientsMeasures: combineIngredientWithMeasure(mealRecipe),
    };
  } else if (isDrink(recipe)) {
    const drinkRecipe = recipe as Drink;

    return {
      ...toRecipe(drinkRecipe),
      category: drinkRecipe.strCategory,
      instructions: drinkRecipe.strInstructions,
      alcoholic: drinkRecipe.strAlcoholic,
      ingredientsMeasures: combineIngredientWithMeasure(drinkRecipe),
      tags: drinkRecipe.strTags?.match(/[A-Z][a-z]*/g) || [],
    };
  }

  throw new MappingRecipeError("RecipeWithDetails");
}
