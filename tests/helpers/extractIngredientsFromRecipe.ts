import { MenuRecipe } from "@/services/menu/common/types";

export default function extractIngredientsFromRecipe(recipe: MenuRecipe) {
  return Object.entries(recipe).reduce((acc, [key, value]) => {
    if (key.match(/strIngredient\d+/) && value) {
      return [...acc, value];
    }
    return acc;
  }, [] as string[]);
}
