import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  RecipeFilterOptions,
  RecipeCategory,
  MenuRecipe,
  getFilterEndpointByOption,
} from "./common";

export type DrinkCategory = RecipeCategory;

export type Drink = MenuRecipe & {
  idDrink: string;
  strDrink: string;
  strVideo: string | null | "";
  strIBA: string | null | "";
  strAlcoholic: string;
  strGlass: string;
  strInstructionsES: string | null | "";
  strInstructionsDE: string | null | "";
  strInstructionsFR: string | null | "";
  strInstructionsIT: string | null | "";
  "strInstructionsZH-HANS": string | null | "";
  "strInstructionsZH-HANT": string | null | "";
  strDrinkThumb: string;
  strImageAttribution: string | null | "";
};

export type GetCocktailCategoriesResponse = {
  drinks: DrinkCategory[];
};

export type CocktailApiResponse = {
  drinks: Drink[] | null;
};

const cocktailClient = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1/",
});

export const cocktailCategories: RecipeCategory[] = [
  {
    strCategory: "Ordinary Drink",
  },
  {
    strCategory: "Cocktail",
  },
  {
    strCategory: "Shake",
  },
  {
    strCategory: "Other / Unknown",
  },
  {
    strCategory: "Cocoa",
  },
  {
    strCategory: "Shot",
  },
  {
    strCategory: "Coffee / Tea",
  },
  {
    strCategory: "Homemade Liqueur",
  },
  {
    strCategory: "Punch / Party Drink",
  },
  {
    strCategory: "Beer",
  },
  {
    strCategory: "Soft Drink",
  },
];

export async function getCocktails(
  config?: AxiosRequestConfig
): Promise<Drink[]> {
  const response: AxiosResponse<CocktailApiResponse> = await cocktailClient.get(
    `search.php?s=`,
    config
  );

  return response.data.drinks || [];
}

export async function getCocktailDetailsById(
  id: string,
  config?: AxiosRequestConfig
): Promise<Drink | null> {
  const response: AxiosResponse<CocktailApiResponse> = await cocktailClient.get(
    `lookup.php?i=${id}`,
    config
  );

  if (response.data.drinks) {
    return response.data.drinks[0];
  }

  return null;
}

export async function getCocktailsByFilter(
  query: string,
  option: RecipeFilterOptions,
  config?: AxiosRequestConfig
) {
  const endpoint = getFilterEndpointByOption(query, option);
  const response: AxiosResponse<CocktailApiResponse> = await cocktailClient.get(
    endpoint,
    config
  );

  return response.data.drinks || [];
}
