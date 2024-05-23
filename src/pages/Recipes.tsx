import {
  RecipeFiltersByCategory,
  RecipeListWithPagination,
} from "@/components";
import RecipeSearchBar, {
  RecipeSearchBarFormState,
} from "@/components/RecipeSearchBar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import { Drink } from "@/services/menu/cocktailApi";
import { RecipeCategory, RecipeFilterOptions } from "@/services/menu/common";
import { Meal } from "@/services/menu/mealApi";
import { Recipe, selectMenu, setRecipes } from "@/store/slices/menuSlice";
import { selectVisibility } from "@/store/slices/visibilitySlice";
import { EMPTY_RECIPES_MESSAGE } from "@/utils/constants";
import { toRecipe } from "@/utils/mappers";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosRequestConfig } from "axios";
import "@/sass/pages/_recipePage.scss";

type RecipesProps<T> = {
  icon: {
    src: string;
    alt: string;
  };
  title: string;
  categories: RecipeCategory[];
  onGetRecipes: (config?: AxiosRequestConfig) => Promise<T[]>;
  onGetRecipesByFilter: (
    query: string,
    filter: RecipeFilterOptions,
    config?: AxiosRequestConfig
  ) => Promise<T[]>;
  onNavigateToRecipe: (recipe: Recipe) => string;
};

export default function Recipes<T extends Drink | Meal>({
  categories,
  onGetRecipes,
  onGetRecipesByFilter,
  icon,
  onNavigateToRecipe,
  title,
}: RecipesProps<T>) {
  const dispatch = useAppDispatch();
  const visibility = useAppSelector(selectVisibility);
  const menu = useAppSelector(selectMenu);
  const navigate = useNavigate();
  // All the API calls in this page updates the same state using setRecipes,
  // so using a single abort controller is a good approach
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleRecipesSearch = async (formState: RecipeSearchBarFormState) => {
    resetAbortController();

    const response = await onGetRecipesByFilter(
      formState.searchQuery,
      formState.searchFilter,
      {
        signal: abortControllerRef.current?.signal,
      }
    );
    const recipes = response.map(toRecipe);

    if (recipes.length === 0) {
      window.alert(EMPTY_RECIPES_MESSAGE);
    } else if (recipes.length === 1) {
      navigate(onNavigateToRecipe(recipes[0]));
    } else {
      dispatch(setRecipes(recipes));
    }
  };

  const handleFilterRecipesByCategory = async (category: string) => {
    resetAbortController();

    const response = await onGetRecipesByFilter(
      category,
      RecipeFilterOptions.CATEGORY,
      { signal: abortControllerRef.current?.signal }
    );
    const recipes = response.map(toRecipe);
    dispatch(setRecipes(recipes));
  };

  const handleLoadInitialRecipes = useCallback(async () => {
    resetAbortController();

    const response = await onGetRecipes({
      signal: abortControllerRef.current?.signal,
    });
    const recipes = response.map(toRecipe);

    dispatch(setRecipes(recipes));
  }, [dispatch, onGetRecipes]);

  const resetAbortController = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
  };

  useEffect(() => {
    handleLoadInitialRecipes();

    return () => {
      const { current } = abortControllerRef;
      current?.abort();
    };
  }, [handleLoadInitialRecipes]);

  return (
    <BasicLayout containHeaderSearchBar>
      <div className="recipe-title">
        <img src={icon.src} alt={icon.alt} />
        <h1 data-testid="page-title" className="purple-title">
          {title}
        </h1>
      </div>

      {visibility.showSearchBar && (
        <RecipeSearchBar onSearch={handleRecipesSearch} />
      )}

      <RecipeFiltersByCategory
        categories={categories}
        onFilterByCategory={handleFilterRecipesByCategory}
        onFilterByAll={handleLoadInitialRecipes}
      />

      <RecipeListWithPagination
        recipes={menu.recipes}
        navigateTo={onNavigateToRecipe}
      />
    </BasicLayout>
  );
}
