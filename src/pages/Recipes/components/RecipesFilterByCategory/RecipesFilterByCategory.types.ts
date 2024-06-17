import { RecipeCategory } from "@/services/menu/common/types";

export type RecipesFilterByCategoryProps = {
  categories: RecipeCategory[];
  onFilterByCategory: (category: string) => void;
  onFilterByAll: () => void;
};
