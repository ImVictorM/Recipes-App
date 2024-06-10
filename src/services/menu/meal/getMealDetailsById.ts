import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Meal, GenericMealApiResponse } from "./types";
import mealClient from "./client";

export default async function getMealDetailsById(
  id: string,
  config?: AxiosRequestConfig
): Promise<Meal> {
  const response: AxiosResponse<GenericMealApiResponse> = await mealClient.get(
    `lookup.php?i=${id}`,
    config
  );

  if (response.data.meals) {
    return response.data.meals[0];
  }

  throw new Error(`Meal with id ${id} not found`);
}
