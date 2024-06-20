import { RecipeFilterOptions } from "@/services/menu/common/enums";
import { TestableComponent } from "@/types/testableComponent";

export type RecipesFilterBySearchFormState = {
  searchQuery: string;
  searchFilter: RecipeFilterOptions;
};

export type RecipesFilterBySearchProps = TestableComponent & {
  onSearch: (formState: RecipesFilterBySearchFormState) => void;
};
