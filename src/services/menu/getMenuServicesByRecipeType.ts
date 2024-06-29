import getCocktailServices from "./cocktail/getCocktailServices";
import getMealServices from "./meal/getMealServices";

import { RecipeType } from "@/store/slices/menu/menuSlice.types";
import { MenuRecipeType, MenuService } from "./common/types";

export default function getMenuServicesByRecipeType(
  type: RecipeType
): MenuService<MenuRecipeType> {
  switch (type) {
    case "drink":
      return getCocktailServices();
    case "meal":
      return getMealServices();
  }
}
