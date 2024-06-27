import MissingIdInRouteParametersError from "@/errors/http/MissingIdInRouteParametersError";
import { RecipeInProgressLoader } from "./common/types";

const drinkRecipeInProgressLoader: RecipeInProgressLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();

  const getCocktailDetailsById = await import(
    "@/services/menu/cocktail/getCocktailDetailsById"
  );

  const drink = await getCocktailDetailsById.default(args.params.id, {
    signal: args.request.signal,
  });

  return {
    recipe: drink,
  };
};

export default drinkRecipeInProgressLoader;
