import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

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
  tags?: string;
};

export type RecipeWithDetailsAndRecommendation = RecipeWithDetails & {
  recommendations: Recipe[];
};

export type RecipeDone = RecipeWithDetails & {
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
  recipes: Recipe[];
  recipesFavorite: Record<string, RecipeWithDetails[]>;
  recipesDone: Record<string, RecipeDone[]>;
  recipesInProgress: Record<string, RecipeInProgress>;
};

const recipesFavoriteLocalStorageKey = "favoriteRecipes";
const recipesInProgressLocalStorageKey = "inProgressRecipes";
const recipesDoneLocalStorageKey = "doneRecipes";

const initialState: Menu = {
  recipes: [],
  recipesFavorite: getFromLocalStorage(recipesFavoriteLocalStorageKey) || {},
  recipesDone: getFromLocalStorage(recipesDoneLocalStorageKey) || {},
  recipesInProgress:
    getFromLocalStorage(recipesInProgressLocalStorageKey) || {},
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    setRecipeInProgress: (
      state,
      action: PayloadAction<{ userEmail: string; recipe: RecipeWithDetails }>
    ) => {
      const { recipe, userEmail } = action.payload;
      const key = `${recipe.type}s` as keyof RecipeInProgress;
      const initialInProgressState: RecipeInProgress = {
        drinks: {},
        meals: {},
      };
      const userRecipesInProgress =
        state.recipesInProgress[userEmail] || initialInProgressState;

      userRecipesInProgress[key][recipe.id] = recipe.ingredientsMeasures.map(
        ([ingredient]) => ingredient
      );

      state.recipesInProgress[userEmail] = userRecipesInProgress;

      setToLocalStorage(
        recipesInProgressLocalStorageKey,
        state.recipesInProgress
      );
    },
    setRecipeDone: (
      state,
      action: PayloadAction<{ userEmail: string; recipe: RecipeDone }>
    ) => {
      const { recipe, userEmail } = action.payload;
      const userRecipesDone = state.recipesDone[userEmail] || [];

      state.recipesDone[userEmail] = [...userRecipesDone, recipe];

      setToLocalStorage(recipesDoneLocalStorageKey, state.recipesDone);
    },
    toggleRecipeIngredient: (
      state,
      action: PayloadAction<{
        ingredient: string;
        recipeId: string;
        recipeType: RecipeType;
        isChecked: boolean;
        userEmail: string;
      }>
    ) => {
      const { ingredient, recipeId, recipeType, isChecked, userEmail } =
        action.payload;
      const recipeTypeKey = `${recipeType}s` as keyof RecipeInProgress;

      if (!isChecked) {
        // Adding a missing ingredient to the list
        state.recipesInProgress[userEmail][recipeTypeKey][recipeId].push(
          ingredient
        );
      } else {
        // Remove checked ingredient from the list
        const recipeIngredients =
          state.recipesInProgress[userEmail][recipeTypeKey][recipeId];

        state.recipesInProgress[userEmail][recipeTypeKey][recipeId] =
          recipeIngredients.filter(
            (currIngredient) => currIngredient !== ingredient
          );
      }

      setToLocalStorage(
        recipesInProgressLocalStorageKey,
        state.recipesInProgress
      );
    },
    toggleFavoriteRecipe: (
      state,
      action: PayloadAction<{ recipe: RecipeWithDetails; userEmail: string }>
    ) => {
      const { recipe, userEmail } = action.payload;
      const userFavoriteRecipes = state.recipesFavorite[userEmail] || [];
      let isRecipeAlreadyFavorite = false;

      const updatedFavoriteRecipes: RecipeWithDetails[] =
        userFavoriteRecipes.filter((favoriteRecipe) => {
          const recipeIsFavorite = favoriteRecipe.id === recipe.id;
          isRecipeAlreadyFavorite = recipeIsFavorite;
          return !recipeIsFavorite;
        });

      state.recipesFavorite[userEmail] = isRecipeAlreadyFavorite
        ? updatedFavoriteRecipes
        : [...updatedFavoriteRecipes, recipe];

      setToLocalStorage(recipesFavoriteLocalStorageKey, state.recipesFavorite);
    },
    removeRecipeInProgress: (
      state,
      action: PayloadAction<{
        userEmail: string;
        recipeId: string;
        recipeType: RecipeType;
      }>
    ) => {
      const { recipeId, userEmail, recipeType } = action.payload;
      const recipeTypeKey = `${recipeType}s` as keyof RecipeInProgress;

      const userRecipesInProgress = state.recipesInProgress[userEmail];

      if (userRecipesInProgress && userRecipesInProgress[recipeTypeKey]) {
        delete state.recipesInProgress[userEmail][recipeTypeKey][recipeId];

        setToLocalStorage(
          recipesInProgressLocalStorageKey,
          state.recipesInProgress
        );
      }
    },
  },
});

/* Selects **/
export const selectMenu = (state: RootState) => state.menu;

export const selectIsRecipeFavorite = createSelector(
  (state: RootState) => state.menu.recipesFavorite,
  (_state: RootState, recipeId: string) => recipeId,
  (_state: RootState, _recipeId: string, userEmail: string) => userEmail,
  (favoriteRecipes, recipeId: string, userEmail: string) => {
    const userFavoriteRecipes = favoriteRecipes[userEmail] || [];
    return userFavoriteRecipes.some((recipe) => recipe.id === recipeId);
  }
);

export const selectIsRecipeDone = createSelector(
  (state: RootState) => state.menu.recipesDone,
  (_state: RootState, recipeId: string) => recipeId,
  (_state: RootState, _recipeId: string, userEmail: string) => userEmail,
  (doneRecipes, recipeId, userEmail) => {
    const userDoneRecipes = doneRecipes[userEmail] || [];
    return userDoneRecipes.some((recipe) => recipe.id === recipeId);
  }
);

export const selectIsRecipeInProgress = createSelector(
  (state: RootState) => state.menu.recipesInProgress,
  (_state: RootState, recipe: Recipe) => recipe,
  (_state: RootState, _recipe: Recipe, userEmail: string) => userEmail,
  (inProgressRecipes, recipe, userEmail) => {
    const userInProgressRecipes = inProgressRecipes[userEmail];

    if (!userInProgressRecipes) {
      return false;
    }

    const key = `${recipe.type}s` as keyof RecipeInProgress;

    return Boolean(userInProgressRecipes[key][recipe.id]);
  }
);

export const selectRecipeInProgressIngredients = createSelector(
  (state: RootState) => state.menu.recipesInProgress,
  (_state: RootState, recipe: Recipe) => recipe,
  (_state: RootState, _recipe: Recipe, userEmail: string) => userEmail,
  (inProgressRecipes, recipe, userEmail): string[] | null => {
    const recipeTypeKey = `${recipe.type}s` as keyof RecipeInProgress;

    return inProgressRecipes[userEmail][recipeTypeKey][recipe.id];
  }
);

export const {
  setRecipes,
  toggleFavoriteRecipe,
  setRecipeInProgress,
  toggleRecipeIngredient,
  setRecipeDone,
  removeRecipeInProgress,
} = menuSlice.actions;

export default menuSlice;
