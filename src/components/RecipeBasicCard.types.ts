import { Recipe } from "@/store/slices/menuSlice.types";

export type RecipeBasicCardProps = {
  recipe: Recipe;
  scaleOnHover?: boolean;
  index: number;
};
