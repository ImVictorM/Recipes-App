import { RecipeType } from "@/store/slices/menu/menuSlice.types";
import cocktailCategories from "./cocktail/categories";
import { RecipeCategory } from "./common/types";
import mealCategories from "./meal/categories";

export default function getMenuCategoriesByRecipeType(
  type: RecipeType
): RecipeCategory[] {
  switch (type) {
    case "drink":
      return cocktailCategories;
    case "meal":
      return mealCategories;
  }
}
