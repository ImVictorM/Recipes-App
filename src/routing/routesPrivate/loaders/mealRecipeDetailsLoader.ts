import MissingIdInRouteParametersError from "@/errors/http/MissingIdInRouteParametersError";
import { RecipeDetailsLoader } from "./common.types";
import { defer } from "@/utils/reactRouterDom/reactRouterDom";

const mealRecipeDetailsLoader: RecipeDetailsLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();

  const getMealDetailsById = await import(
    "@/services/menu/meal/getMealDetailsById"
  );

  const getCocktails = await import("@/services/menu/cocktail/getCocktails");

  const mealPromise = getMealDetailsById.default(args.params.id, {
    signal: args.request.signal,
  });

  const recommendationsPromise = getCocktails.default({
    signal: args.request.signal,
  });

  return defer({
    recipe: await mealPromise,
    recommendations: recommendationsPromise,
  });
};

export default mealRecipeDetailsLoader;
