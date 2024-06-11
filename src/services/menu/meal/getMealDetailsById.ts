import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Meal, GenericMealApiResponse } from "./types";
import mealClient from "./client";
import { GetRecipesById } from "../common.types";
import NotFoundError from "@/errors/http/NotFoundError";

const getMealDetailsById: GetRecipesById<Meal> = async (
  id: string,
  config?: AxiosRequestConfig
): Promise<Meal> => {
  const response: AxiosResponse<GenericMealApiResponse> = await mealClient.get(
    `lookup.php?i=${id}`,
    config
  );

  if (response.data.meals) {
    return response.data.meals[0];
  }

  throw new NotFoundError(`Meal with id ${id} not found`);
};

export default getMealDetailsById;
