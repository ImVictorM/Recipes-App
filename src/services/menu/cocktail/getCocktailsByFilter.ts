import { AxiosRequestConfig, AxiosResponse } from "axios";
import { RecipeFilterOptions, getFilterEndpointByOption } from "../common";
import { GenericCocktailApiResponse } from "./types";
import cocktailClient from "./client";

export default async function getCocktailsByFilter(
  query: string,
  option: RecipeFilterOptions,
  config?: AxiosRequestConfig
) {
  const endpoint = getFilterEndpointByOption(query, option);
  const response: AxiosResponse<GenericCocktailApiResponse> =
    await cocktailClient.get(endpoint, config);

  return response.data.drinks || [];
}
