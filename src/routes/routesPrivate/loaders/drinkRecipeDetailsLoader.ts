import MissingIdInRouteParametersError from "@/errors/http/MissingIdInRouteParametersError";
import { RecipeDetailsLoader } from "./common.types";
import { defer } from "@/utils/reactRouterDom/reactRouterDom";

const drinkRecipeDetailsLoader: RecipeDetailsLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();

  const getCocktailDetailsById = await import(
    "@/services/menu/cocktail/getCocktailDetailsById"
  );
  const getMeals = await import("@/services/menu/meal/getMeals");

  const drinkPromise = getCocktailDetailsById.default(args.params.id, {
    signal: args.request.signal,
  });

  const recommendationsPromise = getMeals.default({
    signal: args.request.signal,
  });

  return defer({
    recipe: await drinkPromise,
    recommendations: recommendationsPromise,
  });
};

export default drinkRecipeDetailsLoader;
