import { Recipe } from "@/store/slices/menu/menuSlice.types";
import { TestableComponent } from "@/types/testableComponent";

export type RecipeBasicCardProps = TestableComponent & {
  recipe: Recipe;
  scaleOnHover?: boolean;
};
