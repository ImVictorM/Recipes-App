import { Drink } from "@/services/menu/cocktailApi";
import { Meal } from "@/services/menu/mealApi";
import { Recipe, RecipeWithDetails } from "@/store/slices/menuSlice";

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

export function toRecipeDetails(
  recipe: Meal,
  recommendations: Drink[]
): RecipeWithDetails;

export function toRecipeDetails(
  recipe: Drink,
  recommendations: Meal[]
): RecipeWithDetails;

export function toRecipeDetails(
  recipe: Meal | Drink,
  recommendations: Meal[] | Drink[]
): RecipeWithDetails {
  if (isMeal(recipe) && isDrink(recommendations[0])) {
    const mealRecipe = recipe as Meal;
    const drinkRecommendations = recommendations as Drink[];

    return {
      id: mealRecipe.idMeal,
      category: mealRecipe.strCategory,
      img: mealRecipe.strMealThumb,
      instructions: mealRecipe.strInstructions,
      tags: mealRecipe.strTags || undefined,
      name: mealRecipe.strMeal,
      video: mealRecipe.strYoutube || undefined,
      recommendedWith: drinkRecommendations.map(
        ({ strDrink, strDrinkThumb }) => ({
          img: strDrinkThumb,
          name: strDrink,
        })
      ),
      nationality: mealRecipe.strArea,
      ingredientsMeasures: combineIngredientWithMeasure(mealRecipe),
    };
  } else if (isDrink(recipe) && isMeal(recommendations[0])) {
    const drinkRecipe = recipe as Drink;
    const mealRecommendations = recommendations as Meal[];
    return {
      id: drinkRecipe.idDrink,
      category: drinkRecipe.strCategory,
      img: drinkRecipe.strDrinkThumb,
      instructions: drinkRecipe.strInstructions,
      name: drinkRecipe.strDrink,
      alcoholic: drinkRecipe.strAlcoholic,
      recommendedWith: mealRecommendations.map(({ strMeal, strMealThumb }) => ({
        img: strMealThumb,
        name: strMeal,
      })),
      ingredientsMeasures: combineIngredientWithMeasure(drinkRecipe),
      tags: drinkRecipe.strTags || undefined,
    };
  }

  throw new Error(
    "Unexpected error mapping the recipe to RecipeWithDetails type"
  );
}

export function toRecipe(arg: Meal | Drink): Recipe {
  if (isMeal(arg)) {
    const mealRecipe = arg as Meal;
    return {
      id: mealRecipe.idMeal,
      img: mealRecipe.strMealThumb,
      name: mealRecipe.strMeal,
    };
  } else if (isDrink(arg)) {
    const drinkRecipe = arg as Drink;
    return {
      id: drinkRecipe.idDrink,
      img: drinkRecipe.strDrinkThumb,
      name: drinkRecipe.strDrink,
    };
  }

  throw new Error("Unexpected error mapping the recipe to Recipe type");
}
