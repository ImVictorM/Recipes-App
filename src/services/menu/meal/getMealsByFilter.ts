import { AxiosRequestConfig, AxiosResponse } from "axios";

import mealClient from "./client";

import { RecipeFilterOptions } from "../common/enums";
import getFilterEndpointByOption from "../common/getFilterEndpointByOption";

import { GetRecipesByFilter } from "../common/types";
import { GenericMealApiResponse, Meal } from "./types";

const getMealsByFilter: GetRecipesByFilter<Meal> = async (
  query: string,
  option: RecipeFilterOptions,
  config?: AxiosRequestConfig
): Promise<Meal[]> => {
  const endpoint = getFilterEndpointByOption(query, option);
  const response: AxiosResponse<GenericMealApiResponse> = await mealClient.get(
    endpoint,
    config
  );

  return response.data.meals || [];
};

export default getMealsByFilter;
