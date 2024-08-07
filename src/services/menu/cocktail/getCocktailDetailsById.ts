import { AxiosRequestConfig, AxiosResponse } from "axios";

import cocktailClient from "./client";

import NotFoundError from "@/errors/http/NotFoundError";

import { GetRecipeDetailsById } from "../common/types";
import { Drink, GenericCocktailApiResponse } from "./types";

const getCocktailDetailsById: GetRecipeDetailsById<Drink> = async (
  id: string,
  config?: AxiosRequestConfig
): Promise<Drink> => {
  const response: AxiosResponse<GenericCocktailApiResponse> =
    await cocktailClient.get(`lookup.php?i=${id}`, config);

  if (response.data.drinks) {
    return response.data.drinks[0];
  }

  throw new NotFoundError(`Drink with id ${id} not found`);
};

export default getCocktailDetailsById;
