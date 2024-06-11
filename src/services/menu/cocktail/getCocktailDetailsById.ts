import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Drink, GenericCocktailApiResponse } from "./types";
import cocktailClient from "./client";
import { GetRecipesById } from "../common.types";

import NotFoundError from "@/errors/http/NotFoundError";

const getCocktailDetailsById: GetRecipesById<Drink> = async (
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
