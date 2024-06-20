import { AxiosResponse } from "axios";

import {
  Drink,
  GenericCocktailApiResponse,
} from "@/services/menu/cocktail/types";

const getCocktailDetailsByIdResponse = (
  drink: Drink
): Partial<AxiosResponse<GenericCocktailApiResponse>> => ({
  data: {
    drinks: [drink],
  },
});

export default getCocktailDetailsByIdResponse;
