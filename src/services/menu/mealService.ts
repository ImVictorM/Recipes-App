import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  RecipeFilterOptions,
  RecipeCategory,
  MenuRecipe,
  getFilterEndpointByOption,
} from "./common";

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

export type MealApiResponse = {
  meals: Meal[] | null;
};

const mealClient = axios.create({
  baseURL: "https://themealdb.com/api/json/v1/1/",
});

export const mealCategories: RecipeCategory[] = [
  {
    strCategory: "Beef",
  },
  {
    strCategory: "Breakfast",
  },
  {
    strCategory: "Chicken",
  },
  {
    strCategory: "Dessert",
  },
  {
    strCategory: "Goat",
  },
  {
    strCategory: "Lamb",
  },
  {
    strCategory: "Miscellaneous",
  },
  {
    strCategory: "Pasta",
  },
  {
    strCategory: "Pork",
  },
  {
    strCategory: "Seafood",
  },
  {
    strCategory: "Side",
  },
  {
    strCategory: "Starter",
  },
  {
    strCategory: "Vegan",
  },
  {
    strCategory: "Vegetarian",
  },
];

export async function getMeals(config?: AxiosRequestConfig): Promise<Meal[]> {
  const response: AxiosResponse<MealApiResponse> = await mealClient.get(
    `search.php?s=`,
    config
  );

  return response.data.meals || [];
}

export async function getMealDetailsById(
  id: string,
  config?: AxiosRequestConfig
): Promise<Meal> {
  const response: AxiosResponse<MealApiResponse> = await mealClient.get(
    `lookup.php?i=${id}`,
    config
  );

  if (response.data.meals) {
    return response.data.meals[0];
  }

  throw new Error(`Meal with id ${id} not found`);
}

export async function getMealsByFilter(
  query: string,
  option: RecipeFilterOptions,
  config?: AxiosRequestConfig
): Promise<Meal[]> {
  const endpoint = getFilterEndpointByOption(query, option);
  const response: AxiosResponse<MealApiResponse> = await mealClient.get(
    endpoint,
    config
  );

  return response.data.meals || [];
}
