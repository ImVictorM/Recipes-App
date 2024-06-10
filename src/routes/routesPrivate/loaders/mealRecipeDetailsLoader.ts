import { RecipeDetailsLoader } from "./common";
import { defer } from "@/utils/reactRouterDom";

import getMealDetailsById from "@/services/menu/meal/getMealDetailsById";
import getCocktails from "@/services/menu/cocktail/getCocktails";

const mealRecipeDetailsLoader: RecipeDetailsLoader = async (args) => {
  if (!args.params.id) throw new Error("Missing ID in route parameters");

  const mealPromise = getMealDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  const recommendationsPromise = getCocktails({
    signal: args.request.signal,
  });

  return defer({
    recipe: await mealPromise,
    recommendations: recommendationsPromise,
  });
};

export default mealRecipeDetailsLoader;
