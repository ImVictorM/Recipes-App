import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";

import {
  Menu,
  Recipe,
  RecipeInProgress,
  RecipeType,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "./menuSlice.types";

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
      action: PayloadAction<{
        userEmail: string;
        recipe: RecipeWithDetailsAndDoneDate;
      }>
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
    toggleRecipeFavorite: (
      state,
      action: PayloadAction<{ recipe: RecipeWithDetails; userEmail: string }>
    ) => {
      const { recipe, userEmail } = action.payload;
      const userFavoriteRecipes: RecipeWithDetails[] =
        state.recipesFavorite[userEmail] || [];
      let isRecipeAlreadyFavorite = false;

      const updatedFavoriteRecipes: RecipeWithDetails[] =
        userFavoriteRecipes.filter((favoriteRecipe) => {
          const recipeIsFavorite = favoriteRecipe.id === recipe.id;
          if (recipeIsFavorite) {
            isRecipeAlreadyFavorite = true;
          }
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
  selectors: {
    selectMenu: (state): Menu => state,
    selectRecipesFavorite: (state): Menu["recipesFavorite"] =>
      state.recipesFavorite,
    selectRecipesDone: (state): Menu["recipesDone"] => state.recipesDone,
    selectRecipesInProgress: (state): Menu["recipesInProgress"] =>
      state.recipesInProgress,
    selectUserRecipesDone: (
      state,
      emailUser
    ): RecipeWithDetailsAndDoneDate[] => {
      const recipesDone = menuSlice.getSelectors().selectRecipesDone(state);
      return recipesDone[emailUser] || [];
    },
    selectUserRecipesFavorite: (
      state,
      emailUser: string
    ): RecipeWithDetails[] => {
      const recipesFavorite = menuSlice
        .getSelectors()
        .selectRecipesFavorite(state);
      return recipesFavorite[emailUser] || [];
    },
    selectRecipesDoneByType: (
      state,
      emailUser: string,
      typeRecipe: string
    ): RecipeWithDetailsAndDoneDate[] => {
      const userRecipesDone = menuSlice
        .getSelectors()
        .selectUserRecipesDone(state, emailUser);
      return userRecipesDone.filter((recipe) => recipe.type === typeRecipe);
    },
    selectRecipesFavoriteByType: (
      state,
      emailUser: string,
      typeRecipe: RecipeType
    ): RecipeWithDetails[] => {
      const userRecipesFavorite = menuSlice
        .getSelectors()
        .selectUserRecipesFavorite(state, emailUser);
      return userRecipesFavorite.filter((recipe) => recipe.type === typeRecipe);
    },
    selectIsRecipeFavorite: (
      state,
      idRecipe: string,
      emailUser: string
    ): boolean => {
      const recipesFavorite = menuSlice
        .getSelectors()
        .selectRecipesFavorite(state);
      const userRecipesFavorite = recipesFavorite[emailUser] || [];
      return userRecipesFavorite.some((recipe) => recipe.id === idRecipe);
    },
    selectIsRecipeDone: (
      state,
      idRecipe: string,
      emailUser: string
    ): boolean => {
      const userRecipesDone = menuSlice
        .getSelectors()
        .selectUserRecipesDone(state, emailUser);
      return userRecipesDone.some((recipe) => recipe.id === idRecipe);
    },
    selectIsRecipeInProgress: (
      state,
      recipe: Recipe,
      emailUser: string
    ): boolean => {
      const recipesInProgress = menuSlice
        .getSelectors()
        .selectRecipesInProgress(state);
      const userRecipesInProgress = recipesInProgress[emailUser];

      if (!userRecipesInProgress) {
        return false;
      }

      const key = `${recipe.type}s` as keyof RecipeInProgress;

      return Boolean(userRecipesInProgress[key][recipe.id]);
    },
    selectRecipeInProgressIngredients: (
      state,
      recipe: Recipe,
      emailUser: string
    ): string[] | null => {
      const recipesInProgress = menuSlice
        .getSelectors()
        .selectRecipesInProgress(state);

      const recipeTypeKey = `${recipe.type}s` as keyof RecipeInProgress;

      return recipesInProgress[emailUser][recipeTypeKey][recipe.id];
    },
  },
});

export default menuSlice;
