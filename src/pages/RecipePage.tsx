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

type RecipePageProps<T> = {
  icon: {
    src: string;
    alt: string;
  };
  title: string;
  categories: RecipeCategory[];
  getRecipes: (config?: AxiosRequestConfig) => Promise<T[]>;
  getRecipesByFilter: (
    query: string,
    filter: RecipeFilterOptions,
    config?: AxiosRequestConfig
  ) => Promise<T[]>;
  recipeNavigateTo: (recipe: Recipe) => string;
};

export default function RecipePage<T extends Drink | Meal>({
  categories,
  getRecipes,
  getRecipesByFilter,
  icon,
  recipeNavigateTo,
  title,
}: RecipePageProps<T>) {
  const dispatch = useAppDispatch();
  const visibility = useAppSelector(selectVisibility);
  const menu = useAppSelector(selectMenu);
  const navigate = useNavigate();
  // All the API calls in this page updates the same state using setRecipes,
  // so using a single abort controller is a good approach
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleRecipesSearch = async (formState: RecipeSearchBarFormState) => {
    resetAbortController();

    const response = await getRecipesByFilter(
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
      navigate(recipeNavigateTo(recipes[0]));
    } else {
      dispatch(setRecipes(recipes));
    }
  };

  const handleFilterRecipesByCategory = async (category: string) => {
    resetAbortController();

    const response = await getRecipesByFilter(
      category,
      RecipeFilterOptions.CATEGORY,
      { signal: abortControllerRef.current?.signal }
    );
    const recipes = response.map(toRecipe);
    dispatch(setRecipes(recipes));
  };

  const handleLoadInitialRecipes = useCallback(async () => {
    resetAbortController();

    const response = await getRecipes({
      signal: abortControllerRef.current?.signal,
    });
    const recipes = response.map(toRecipe);

    dispatch(setRecipes(recipes));
  }, [dispatch, getRecipes]);

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
        navigateTo={recipeNavigateTo}
      />
    </BasicLayout>
  );
}
