import getMealDetailsById from "./getMealDetailsById";
import getMeals from "./getMeals";
import getMealsByFilter from "./getMealsByFilter";

import { MenuService } from "../common/types";
import { Meal } from "./types";

export default function getMealServices(): MenuService<Meal> {
  return {
    getRecipes: getMeals,
    getRecipeDetailsById: getMealDetailsById,
    getRecipesByFilter: getMealsByFilter,
  };
}
