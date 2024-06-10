import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Drink, GenericCocktailApiResponse } from "./types";
import cocktailClient from "./client";

export default async function getCocktailDetailsById(
  id: string,
  config?: AxiosRequestConfig
): Promise<Drink> {
  const response: AxiosResponse<GenericCocktailApiResponse> =
    await cocktailClient.get(`lookup.php?i=${id}`, config);

  if (response.data.drinks) {
    return response.data.drinks[0];
  }

  throw new Error(`Drink with id ${id} not found`);
}
