import { AxiosRequestConfig, AxiosResponse } from "axios";

import mealClient from "./client";

import { GenericMealApiResponse, Meal } from "./types";
import { GetRecipes } from "../common/types";

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
