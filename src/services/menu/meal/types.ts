import { MenuRecipe, RecipeCategory } from "../common.types";

export type MealCategory = RecipeCategory;

export type Meal = MenuRecipe & {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strMealThumb: string;
  strYoutube: string | null | "";
  strIngredient16: string | null | "";
  strIngredient17: string | null | "";
  strIngredient18: string | null | "";
  strIngredient19: string | null | "";
  strIngredient20: string | null | "";
  strMeasure16: string | null | "";
  strMeasure17: string | null | "";
  strMeasure18: string | null | "";
  strMeasure19: string | null | "";
  strMeasure20: string | null | "";
  strSource: string | null | "";
};

export type GetMealCategoriesResponse = {
  meals: MealCategory[];
};

export type GenericMealApiResponse = {
  meals: Meal[] | null;
};
