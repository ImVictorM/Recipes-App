import { AxiosRequestConfig, AxiosResponse } from "axios";

import cocktailClient from "./client";

import { RecipeFilterOptions } from "../common/enums";
import getFilterEndpointByOption from "../common/getFilterEndpointByOption";

import { Drink, GenericCocktailApiResponse } from "./types";
import { GetRecipesByFilter } from "../common/types";

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
