import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GenericCocktailApiResponse, Drink } from "./types";
import cocktailClient from "./client";
import { GetRecipes } from "../common.types";

const getCocktails: GetRecipes<Drink> = async (
  config?: AxiosRequestConfig
): Promise<Drink[]> => {
  const response: AxiosResponse<GenericCocktailApiResponse> =
    await cocktailClient.get(`search.php?s=`, config);

  return response.data.drinks || [];
};

export default getCocktails;
