import { RecipeWithDetails } from "@/store/slices/menu/menuSlice.types";
import { TestableComponent } from "@/types/testableComponent";

export type RecipeHeroProps = TestableComponent & {
  recipe: RecipeWithDetails;
};
