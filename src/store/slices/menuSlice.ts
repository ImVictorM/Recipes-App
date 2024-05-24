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
  recommendedWith: Recipe[];
  category: string;
  nationality?: string;
  tags?: string;
};

export type DoneRecipe = RecipeWithDetails & {
  doneDate: string;
};

export type Menu = {
  recipes: Recipe[];
  favoriteRecipes: Record<string, RecipeWithDetails[]>;
  doneRecipes: Record<string, DoneRecipe[]>;
  inProgressRecipes: {
    // id | ingredients
    drinks: Record<string, string>;
    meals: Record<string, string>;
  };
};

const initialState: Menu = {
  recipes: [],
  favoriteRecipes: getFromLocalStorage("favoriteRecipes") || {},
  doneRecipes: {},
  inProgressRecipes: {
    drinks: {},
    meals: {},
  },
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
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

export const { setRecipes, toggleFavoriteRecipe } = menuSlice.actions;
export default menuSlice;
