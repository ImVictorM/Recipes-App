import axios, { AxiosResponse } from "axios";
import {
  FilterOptions,
  MenuCategory,
  MenuRecipe,
  getFilterEndpointByOption,
} from "./common";

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
  baseURL: "https://themealdb.com/api/json/v1/1/",
});

export const mealsCategories: MenuCategory[] = [
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

export async function getMealsByFilter(
  query: string,
  option: FilterOptions
): Promise<Meal[]> {
  const endpoint = getFilterEndpointByOption(query, option);
  const response: AxiosResponse<GetMealsResponse> = await mealClient.get(
    endpoint
  );

  return response.data.meals || [];
}
