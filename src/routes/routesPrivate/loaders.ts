import { MissingIdInRouteParametersError } from "@/errors/http";
import {
  Drink,
  getCocktailDetailsById,
  getCocktails,
} from "@/services/menu/cocktailService";
import {
  Meal,
  getMealDetailsById,
  getMeals,
} from "@/services/menu/mealService";
import { LoaderCallback, defer } from "@/utils/reactRouterDom";
import { LoaderFunctionArgs } from "react-router-dom";

export type RecipeDetailsLoader = LoaderCallback<{
  recipe: Drink | Meal;
  recommendations: Promise<Drink[] | Meal[]>;
}>;

export type RecipeInProgressLoader = LoaderCallback<{
  recipe: Drink | Meal;
}>;

export const mealRecipeDetailsLoader: RecipeDetailsLoader = async (
  args: LoaderFunctionArgs
) => {
  if (!args.params.id) throw new Error("Missing ID in route parameters");

  const mealPromise = getMealDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  const recommendationsPromise = getCocktails({
    signal: args.request.signal,
  });

  return defer({
    recipe: await mealPromise,
    recommendations: recommendationsPromise,
  });
};

export const drinkRecipeDetailsLoader: RecipeDetailsLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();
  const drinkPromise = getCocktailDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  const recommendationsPromise = getMeals({
    signal: args.request.signal,
  });

  return defer({
    recipe: await drinkPromise,
    recommendations: recommendationsPromise,
  });
};

export const mealRecipeInProgressLoader: RecipeInProgressLoader = async (
  args
) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();

  const meal = await getMealDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  return {
    recipe: meal,
  };
};

export const drinkRecipeInProgressLoader: RecipeInProgressLoader = async (
  args
) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();
  const drink = await getCocktailDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  return {
    recipe: drink,
  };
};
