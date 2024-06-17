import MissingIdInRouteParametersError from "@/errors/http/MissingIdInRouteParametersError";
import { RecipeInProgressLoader } from "./common/types";

const mealRecipeInProgressLoader: RecipeInProgressLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();

  const getMealDetailsById = await import(
    "@/services/menu/meal/getMealDetailsById"
  );

  const meal = await getMealDetailsById.default(args.params.id, {
    signal: args.request.signal,
  });

  return {
    recipe: meal,
  };
};

export default mealRecipeInProgressLoader;
