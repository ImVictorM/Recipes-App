import getCocktailDetailsById from "./getCocktailDetailsById";
import getCocktails from "./getCocktails";
import getCocktailsByFilter from "./getCocktailsByFilter";

import { MenuService } from "../common/types";
import { Drink } from "./types";

export default function getCocktailServices(): MenuService<Drink> {
  return {
    getRecipes: getCocktails,
    getRecipeDetailsById: getCocktailDetailsById,
    getRecipesByFilter: getCocktailsByFilter,
  };
}
