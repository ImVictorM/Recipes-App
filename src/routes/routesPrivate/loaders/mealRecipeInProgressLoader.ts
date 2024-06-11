import MissingIdInRouteParametersError from "@/errors/http/MissingIdInRouteParametersError";
import { RecipeInProgressLoader } from "./common.types";

import getMealDetailsById from "@/services/menu/meal/getMealDetailsById";

const mealRecipeInProgressLoader: RecipeInProgressLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();

  const meal = await getMealDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  return {
    recipe: meal,
  };
};

export default mealRecipeInProgressLoader;
