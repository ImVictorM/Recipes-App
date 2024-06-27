import { AxiosResponse } from "axios";

import {
  Drink,
  GenericCocktailApiResponse,
} from "@/services/menu/cocktail/types";

const getCocktailsResponse = (
  drinks: Drink[]
): Partial<AxiosResponse<GenericCocktailApiResponse>> => ({
  data: { drinks },
});

export default getCocktailsResponse;
