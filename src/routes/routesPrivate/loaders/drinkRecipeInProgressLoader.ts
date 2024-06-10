import MissingIdInRouteParametersError from "@/errors/http/MissingIdInRouteParametersError";
import { RecipeInProgressLoader } from "./common";

import getCocktailDetailsById from "@/services/menu/cocktail/getCocktailDetailsById";

const drinkRecipeInProgressLoader: RecipeInProgressLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();
  const drink = await getCocktailDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  return {
    recipe: drink,
  };
};

export default drinkRecipeInProgressLoader;
