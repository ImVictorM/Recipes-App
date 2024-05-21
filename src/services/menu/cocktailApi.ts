import axios, { AxiosResponse } from "axios";
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

export type GetCocktailsResponse = {
  drinks: Drink[];
};

const cocktailClient = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1/",
});

export const cocktailsCategories: RecipeCategory[] = [
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

export async function getCocktails(name: string = ""): Promise<Drink[]> {
  const response: AxiosResponse<GetCocktailsResponse> =
    await cocktailClient.get(`search.php?s=${name}`);

  return response.data.drinks || [];
}

export async function getCocktailDetailsById(id: string): Promise<Drink> {
  const response: AxiosResponse<GetCocktailsResponse> =
    await cocktailClient.get(`lookup.php?i=${id}`);

  return response.data.drinks[0] || {};
}

export async function getCocktailsByFilter(
  query: string,
  option: RecipeFilterOptions
) {
  const endpoint = getFilterEndpointByOption(query, option);
  const response: AxiosResponse<GetCocktailsResponse> =
    await cocktailClient.get(endpoint);

  return response.data.drinks || [];
}
