import { RecipeWithDetailsAndDoneDate } from "@/store/slices/menu/menuSlice.types";
import { TestableComponent } from "@/types/testableComponent";

export type RecipeDoneCardProps = TestableComponent & {
  recipe: RecipeWithDetailsAndDoneDate;
};
