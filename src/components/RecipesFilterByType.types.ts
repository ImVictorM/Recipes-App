import { RecipeType } from "@/store/slices/menuSlice.types";

export type RecipeTypeOrAll = RecipeType | "all";

export type RecipesFilterByTypeProps = {
  onFilterByType: (type: RecipeTypeOrAll) => void;
};
