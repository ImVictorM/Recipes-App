import { RecipeWithDetails } from "@/store/slices/menu/menuSlice.types";
import { TestableComponent } from "@/types/testableComponent";

export type HeroLayoutProps = TestableComponent & {
  recipe: RecipeWithDetails;
};
