import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GenericMealApiResponse, Meal } from "./types";
import mealClient from "./client";
import { GetRecipes } from "../common.types";

const getMeals: GetRecipes<Meal> = async (
  config?: AxiosRequestConfig
): Promise<Meal[]> => {
  const response: AxiosResponse<GenericMealApiResponse> = await mealClient.get(
    `search.php?s=`,
    config
  );

  return response.data.meals || [];
};

export default getMeals;
