import MissingIdInRouteParametersError from "@/errors/http/MissingIdInRouteParametersError";
import { RecipeDetailsLoader } from "./common";
import { defer } from "@/utils/reactRouterDom";

import getCocktailDetailsById from "@/services/menu/cocktail/getCocktailDetailsById";
import getMeals from "@/services/menu/meal/getMeals";

const drinkRecipeDetailsLoader: RecipeDetailsLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();
  const drinkPromise = getCocktailDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  const recommendationsPromise = getMeals({
    signal: args.request.signal,
  });

  return defer({
    recipe: await drinkPromise,
    recommendations: recommendationsPromise,
  });
};

export default drinkRecipeDetailsLoader;
