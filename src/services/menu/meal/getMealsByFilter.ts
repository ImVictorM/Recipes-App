import { AxiosRequestConfig, AxiosResponse } from "axios";
import { RecipeFilterOptions, getFilterEndpointByOption } from "../common";
import { GenericMealApiResponse, Meal } from "./types";
import mealClient from "./client";

export default async function getMealsByFilter(
  query: string,
  option: RecipeFilterOptions,
  config?: AxiosRequestConfig
): Promise<Meal[]> {
  const endpoint = getFilterEndpointByOption(query, option);
  const response: AxiosResponse<GenericMealApiResponse> = await mealClient.get(
    endpoint,
    config
  );

  return response.data.meals || [];
}
