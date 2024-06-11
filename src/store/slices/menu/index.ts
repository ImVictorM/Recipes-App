import menuSlice from "./menuSlice";

export default menuSlice;

export const {
  removeRecipeInProgress,
  setRecipeDone,
  setRecipeInProgress,
  setRecipes,
  toggleRecipeFavorite,
  toggleRecipeIngredient,
} = menuSlice.actions;

export const {
  selectIsRecipeDone,
  selectIsRecipeFavorite,
  selectIsRecipeInProgress,
  selectMenu,
  selectRecipeInProgressIngredients,
  selectRecipesDone,
  selectRecipesDoneByType,
  selectRecipesFavorite,
  selectRecipesFavoriteByType,
  selectRecipesInProgress,
  selectUserRecipesDone,
  selectUserRecipesFavorite,
} = menuSlice.selectors;
