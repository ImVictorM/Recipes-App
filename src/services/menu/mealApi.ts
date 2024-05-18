import axios, { AxiosResponse } from "axios";
import { MenuCategory, MenuRecipe } from "./common";

export type MealCategory = MenuCategory;

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

export type GetMealsResponse = {
  meals: Meal[];
};

const mealClient = axios.create({
  baseURL: "www.themealdb.com/api/json/v1/1/",
});

export async function getMealCategories(): Promise<MealCategory[]> {
  const response: AxiosResponse<GetMealCategoriesResponse> =
    await mealClient.get("list.php?c=list");

  return response.data.meals || [];
}

export async function getMeals(name: string = ""): Promise<Meal[]> {
  const response: AxiosResponse<GetMealsResponse> = await mealClient.get(
    `search.php?s=${name}`
  );

  return response.data.meals || [];
}

export async function getMealDetailsById(id: string): Promise<Meal> {
  const response: AxiosResponse<GetMealsResponse> = await mealClient.get(
    `lookup.php?i=${id}`
  );

  return response.data.meals[0] || {};
}
