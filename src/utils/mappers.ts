import { RecipeDetailsItem } from "@/pages/RecipeDetails";
import { Drink } from "@/services/menu/cocktailApi";
import { Meal } from "@/services/menu/mealApi";

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
): RecipeDetailsItem;

export function toRecipeDetails(
  recipe: Drink,
  recommendations: Meal[]
): RecipeDetailsItem;

export function toRecipeDetails(
  recipe: Meal | Drink,
  recommendations: Meal[] | Drink[]
): RecipeDetailsItem {
  if (isMeal(recipe) && isDrink(recommendations[0])) {
    const mealRecipe = recipe as Meal;
    const drinkRecommendations = recommendations as Drink[];

    return {
      category: mealRecipe.strCategory,
      imgSrc: mealRecipe.strMealThumb,
      instructions: mealRecipe.strInstructions,
      name: mealRecipe.strMeal,
      video: mealRecipe.strYoutube || undefined,
      recommendedWith: drinkRecommendations.map(
        ({ strDrink, strDrinkThumb }) => ({
          imgSrc: strDrinkThumb,
          name: strDrink,
        })
      ),
      ingredientsMeasures: combineIngredientWithMeasure(mealRecipe),
    };
  } else if (isDrink(recipe) && isMeal(recommendations[0])) {
    const drinkRecipe = recipe as Drink;
    const mealRecommendations = recommendations as Meal[];
    return {
      category: drinkRecipe.strCategory,
      imgSrc: drinkRecipe.strDrinkThumb,
      instructions: drinkRecipe.strInstructions,
      name: drinkRecipe.strDrink,
      alcoholic: drinkRecipe.strAlcoholic,
      recommendedWith: mealRecommendations.map(({ strMeal, strMealThumb }) => ({
        imgSrc: strMealThumb,
        name: strMeal,
      })),
      ingredientsMeasures: combineIngredientWithMeasure(drinkRecipe),
    };
  }

  throw new Error(
    "Unexpected error mapping the recipe to RecipeDetailsItem type"
  );
}
