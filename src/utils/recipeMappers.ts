import { Drink } from "@/services/menu/cocktailService";
import { Meal } from "@/services/menu/mealService";
import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndRecommendation,
} from "@/store/slices/menuSlice";

function isMeal(recipe: Meal | Drink): recipe is Meal {
  return (recipe as Meal).strMeal !== undefined;
}

function isDrink(recipe: Meal | Drink): recipe is Drink {
  return (recipe as Drink).strDrink !== undefined;
}

function combineIngredientWithMeasure(recipe: Meal | Drink) {
  const entries = Object.entries(recipe);

  return entries.reduce<[string, string][]>((acc, [key, value]) => {
    if (key.match(/strIngredient(\d+)$/) && value) {
      const ingredientNumber = key.match(/\d+$/)![0];
      const measureKey = `strMeasure${ingredientNumber}`;

      let measure: string | null = null;

      if (isMeal(recipe)) {
        measure = recipe[measureKey as keyof Meal] as string | null;
      } else if (isDrink(recipe)) {
        measure = recipe[measureKey as keyof Drink] as string | null;
      }

      acc.push([value as string, measure || ""]);
    }
    return acc;
  }, []);
}

const getMappingErrorMessage = (type: string) =>
  `Unexpected error mapping the recipe to ${type} type`;

export function toRecipe(recipe: Meal | Drink): Recipe {
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

  throw new Error(getMappingErrorMessage("Recipe"));
}

export function toRecipeWithDetails(recipe: Meal | Drink): RecipeWithDetails {
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

  throw new Error(getMappingErrorMessage("RecipeWithDetails"));
}

export function toRecipeWithDetailsAndRecommendations(
  recipe: Meal | Drink,
  recommendations: Meal[] | Drink[]
): RecipeWithDetailsAndRecommendation {
  if (isMeal(recipe) && isDrink(recommendations[0])) {
    const drinkRecommendations = recommendations as Drink[];

    return {
      ...toRecipeWithDetails(recipe),
      recommendations: drinkRecommendations.map(
        ({ strDrink, strDrinkThumb, idDrink }) => ({
          type: "drink",
          img: strDrinkThumb,
          name: strDrink,
          id: idDrink,
        })
      ),
    };
  } else if (isDrink(recipe) && isMeal(recommendations[0])) {
    const mealRecommendations = recommendations as Meal[];

    return {
      ...toRecipeWithDetails(recipe),
      recommendations: mealRecommendations.map(
        ({ strMeal, strMealThumb, idMeal }) => ({
          type: "meal",
          img: strMealThumb,
          name: strMeal,
          id: idMeal,
        })
      ),
    };
  }

  throw new Error(
    getMappingErrorMessage("RecipeWithDetailsAndRecommendations")
  );
}
