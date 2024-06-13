import { RecipeFilterOptions } from "@/services/menu/common";

export type RecipesFilterBySearchFormState = {
  searchQuery: string;
  searchFilter: RecipeFilterOptions;
};

export type RecipesFilterBySearchProps = {
  onSearch: (formState: RecipesFilterBySearchFormState) => void;
};