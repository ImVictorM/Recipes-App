import { RecipeTypeOrAll } from "../RecipesFilterByType/RecipesFilterByType.types";

export type EmptyStateLink = {
  to: string;
  text: string;
};

export type EmptyState = {
  titleMessage: string;
  links: EmptyStateLink[];
};

export type RecipesFavoriteEmptyProps = {
  type: RecipeTypeOrAll;
  action: string;
};
