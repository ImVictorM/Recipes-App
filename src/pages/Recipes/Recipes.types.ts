import { RecipeType } from "@/store/slices/menu/menuSlice.types";
import { TestableComponent } from "@/types/testableComponent";

export type RecipesProps = TestableComponent & {
  type: RecipeType;
};
