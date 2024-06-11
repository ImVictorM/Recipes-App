import { AxiosRequestConfig } from "axios";
import { Drink } from "./cocktail/types";
import { RecipeFilterOptions } from "./common";
import { Meal } from "./meal/types";

export type RecipeCategory = {
  strCategory: string;
};

export type MenuRecipeType = Drink | Meal;

export type GetRecipes<T extends MenuRecipeType> = (
  config?: AxiosRequestConfig
) => Promise<T[]>;

export type GetRecipesById<T extends MenuRecipeType> = (
  id: string,
  config?: AxiosRequestConfig
) => Promise<T>;

export type GetRecipesByFilter<T extends MenuRecipeType> = (
  query: string,
  option: RecipeFilterOptions,
  config?: AxiosRequestConfig
) => Promise<T[]>;

export type MenuRecipe = {
  strTags: string | null | "";
  strCategory: string;
  strDrinkAlternate: string | null | "";
  strInstructions: string;
  strIngredient1: string | null | "";
  strIngredient2: string | null | "";
  strIngredient3: string | null | "";
  strIngredient4: string | null | "";
  strIngredient5: string | null | "";
  strIngredient6: string | null | "";
  strIngredient7: string | null | "";
  strIngredient8: string | null | "";
  strIngredient9: string | null | "";
  strIngredient10: string | null | "";
  strIngredient11: string | null | "";
  strIngredient12: string | null | "";
  strIngredient13: string | null | "";
  strIngredient14: string | null | "";
  strIngredient15: string | null | "";
  strMeasure1: string | null | "";
  strMeasure2: string | null | "";
  strMeasure3: string | null | "";
  strMeasure4: string | null | "";
  strMeasure5: string | null | "";
  strMeasure6: string | null | "";
  strMeasure7: string | null | "";
  strMeasure8: string | null | "";
  strMeasure9: string | null | "";
  strMeasure10: string | null | "";
  strMeasure11: string | null | "";
  strMeasure12: string | null | "";
  strMeasure13: string | null | "";
  strMeasure14: string | null | "";
  strMeasure15: string | null | "";
  strImageSource: string | null | "";
  dateModified: string | null | "";
  strCreativeCommonsConfirmed: string | null | "";
};
