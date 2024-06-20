import { RecipeType } from "@/store/slices/menu/menuSlice.types";
import { TestableComponent } from "@/types/testableComponent";

export type RecipeTypeOrAll = RecipeType | "all";

export type RecipesFilterByTypeProps = TestableComponent & {
  onFilterByType: (type: RecipeTypeOrAll) => void;
};
