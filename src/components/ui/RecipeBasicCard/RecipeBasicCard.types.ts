import { Recipe } from "@/store/slices/menu/menuSlice.types";

export type RecipeBasicCardProps = {
  recipe: Recipe;
  scaleOnHover?: boolean;
};
