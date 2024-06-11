import { MenuRecipe, RecipeCategory } from "../common.types";

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

export type GenericCocktailApiResponse = {
  drinks: Drink[] | null;
};
