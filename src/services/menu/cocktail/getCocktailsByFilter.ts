import { AxiosRequestConfig, AxiosResponse } from "axios";
import { RecipeFilterOptions, getFilterEndpointByOption } from "../common";
import { Drink, GenericCocktailApiResponse } from "./types";
import cocktailClient from "./client";
import { GetRecipesByFilter } from "../common.types";

const getCocktailsByFilter: GetRecipesByFilter<Drink> = async (
  query: string,
  option: RecipeFilterOptions,
  config?: AxiosRequestConfig
) => {
  const endpoint = getFilterEndpointByOption(query, option);
  const response: AxiosResponse<GenericCocktailApiResponse> =
    await cocktailClient.get(endpoint, config);

  return response.data.drinks || [];
};

export default getCocktailsByFilter;
