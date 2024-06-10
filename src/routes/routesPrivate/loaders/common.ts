import { Drink } from "@/services/menu/cocktail/types";
import { Meal } from "@/services/menu/meal/types";
import { LoaderCallback } from "@/utils/reactRouterDom";

export type RecipeDetailsLoader = LoaderCallback<{
  recipe: Drink | Meal;
  recommendations: Promise<Drink[] | Meal[]>;
}>;

export type RecipeInProgressLoader = LoaderCallback<{
  recipe: Drink | Meal;
}>;
