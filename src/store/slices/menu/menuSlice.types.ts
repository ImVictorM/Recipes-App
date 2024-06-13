export type RecipeType = "drink" | "meal";

export type Recipe = {
  type: RecipeType;
  id: string;
  img: string;
  name: string;
};

export type RecipeWithDetails = Recipe & {
  ingredientsMeasures: [string, string][];
  instructions: string;
  video?: string;
  alcoholic?: string;
  category: string;
  nationality?: string;
  tags: string[];
};

export type RecipeWithDetailsAndDoneDate = RecipeWithDetails & {
  doneDate: string;
};

/* 
  Recipes in progress are indexed with the recipe id which leads to a list
  of remaining ingredients to finish the recipe. If the list is 
  empty, it means the recipe can be finished (all ingredients were checked).
**/
export type RecipeInProgress = {
  drinks: Record<string, string[]>;
  meals: Record<string, string[]>;
};

export type Menu = {
  recipesFavorite: Record<string, RecipeWithDetails[]>;
  recipesDone: Record<string, RecipeWithDetailsAndDoneDate[]>;
  recipesInProgress: Record<string, RecipeInProgress>;
};
