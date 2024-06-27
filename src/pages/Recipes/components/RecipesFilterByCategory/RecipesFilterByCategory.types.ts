import { RecipeCategory } from "@/services/menu/common/types";
import { TestableComponent } from "@/types/testableComponent";

export type RecipesFilterByCategoryProps = TestableComponent & {
  categories: RecipeCategory[];
  onFilterByCategory: (category: string) => void;
  onFilterByAll: () => void;
};
