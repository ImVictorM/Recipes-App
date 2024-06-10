import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GenericCocktailApiResponse, Drink } from "./types";
import cocktailClient from "./client";

export default async function getCocktails(
  config?: AxiosRequestConfig
): Promise<Drink[]> {
  const response: AxiosResponse<GenericCocktailApiResponse> =
    await cocktailClient.get(`search.php?s=`, config);

  return response.data.drinks || [];
}
