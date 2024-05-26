import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getFromLocalStorage, setInLocalStorage } from "@/utils/localStorage";

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

export type DoneRecipe = RecipeWithDetails & {
  doneDate: string;
};

export type InProgressRecipe = {
  // id | ingredients
  drinks: Record<string, string[]>;
  meals: Record<string, string[]>;
};

export type Menu = {
  recipes: Recipe[];
  favoriteRecipes: Record<string, RecipeWithDetails[]>;
  doneRecipes: Record<string, DoneRecipe[]>;
  inProgressRecipes: Record<string, InProgressRecipe>;
};

const initialState: Menu = {
  recipes: [],
  favoriteRecipes: getFromLocalStorage("favoriteRecipes") || {},
  doneRecipes: {},
  inProgressRecipes: getFromLocalStorage("inProgressRecipes") || {},
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
      const key = `${recipe.type}s` as keyof InProgressRecipe;
      const initialInProgressState: InProgressRecipe = {
        drinks: {},
        meals: {},
      };
      const userRecipesInProgress =
        state.inProgressRecipes[userEmail] || initialInProgressState;

      userRecipesInProgress[key][recipe.id] = recipe.ingredientsMeasures.map(
        ([ingredient]) => ingredient
      );

      state.inProgressRecipes[userEmail] = userRecipesInProgress;

      setInLocalStorage("inProgressRecipes", state.inProgressRecipes);
    },
    toggleFavoriteRecipe: (
      state,
      action: PayloadAction<{ recipe: RecipeWithDetails; userEmail: string }>
    ) => {
      const { recipe, userEmail } = action.payload;
      const userFavoriteRecipes = state.favoriteRecipes[userEmail] || [];
      let isRecipeAlreadyFavorite = false;

      const updatedFavoriteRecipes: RecipeWithDetails[] =
        userFavoriteRecipes.filter((favoriteRecipe) => {
          const recipeIsFavorite = favoriteRecipe.id === recipe.id;
          isRecipeAlreadyFavorite = recipeIsFavorite;
          return !recipeIsFavorite;
        });

      state.favoriteRecipes[userEmail] = isRecipeAlreadyFavorite
        ? updatedFavoriteRecipes
        : [...updatedFavoriteRecipes, recipe];

      setInLocalStorage("favoriteRecipes", state.favoriteRecipes);
    },
  },
});

export const selectMenu = (state: RootState) => state.menu;

export const selectIsFavoriteRecipe = createSelector(
  (state: RootState) => state.menu.favoriteRecipes,
  (_state: RootState, recipeId: string) => recipeId,
  (_state: RootState, _recipeId: string, userEmail: string) => userEmail,
  (favoriteRecipes, recipeId: string, userEmail: string) => {
    const userFavoriteRecipes = favoriteRecipes[userEmail] || [];
    return userFavoriteRecipes.some((recipe) => recipe.id === recipeId);
  }
);

export const selectIsRecipeDone = createSelector(
  (state: RootState) => state.menu.doneRecipes,
  (_state: RootState, recipeId: string) => recipeId,
  (_state: RootState, _recipeId: string, userEmail: string) => userEmail,
  (doneRecipes, recipeId, userEmail) => {
    const userDoneRecipes = doneRecipes[userEmail] || [];
    return userDoneRecipes.some((recipe) => recipe.id === recipeId);
  }
);

export const selectIsRecipeInProgress = createSelector(
  (state: RootState) => state.menu.inProgressRecipes,
  (_state: RootState, recipe: Recipe) => recipe,
  (_state: RootState, _recipe: Recipe, userEmail: string) => userEmail,
  (inProgressRecipes, recipe, userEmail) => {
    const userInProgressRecipes = inProgressRecipes[userEmail];

    if (!userInProgressRecipes) {
      return false;
    }

    switch (recipe.type) {
      case "drink":
        return Boolean(userInProgressRecipes.drinks[recipe.id]);
      case "meal":
        return Boolean(userInProgressRecipes.meals[recipe.id]);
      default:
        return false;
    }
  }
);

export const { setRecipes, toggleFavoriteRecipe, setRecipeInProgress } =
  menuSlice.actions;
export default menuSlice;
