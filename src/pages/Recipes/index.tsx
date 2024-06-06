import { RecipesFilterByCategory } from "./components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import { Drink } from "@/services/menu/cocktailService";
import { RecipeCategory, RecipeFilterOptions } from "@/services/menu/common";
import { Meal } from "@/services/menu/mealService";
import { Recipe, selectMenu, setRecipes } from "@/store/slices/menuSlice";
import { selectVisibility } from "@/store/slices/visibilitySlice";
import { toRecipe } from "@/utils/recipeMappers";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosRequestConfig, isAxiosError } from "axios";
import {
  CenteredTitleWithIcon,
  RecipeBasicCard,
  ListWithPagination,
  RecipeBasicCardSkeleton,
} from "@/components";
import RecipesFilterBySearch, {
  RecipesFilterBySearchFormState,
} from "./components/RecipesFilterBySearch";

type RecipesProps<T> = {
  icon: {
    element: React.FC<React.SVGProps<SVGElement>>;
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
};

export default function Recipes<T extends Drink | Meal>({
  categories,
  onGetRecipes,
  onGetRecipesByFilter,
  icon,
  title,
}: RecipesProps<T>) {
  const dispatch = useAppDispatch();
  const visibility = useAppSelector(selectVisibility);
  const menu = useAppSelector(selectMenu);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // All the API calls in this page updates the same state using setRecipes,
  // so using a single abort controller is a good approach
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchWithControllers = useCallback(
    async (
      fetch: () => Promise<void>,
      onCatch?: (error: unknown) => Promise<void> | void
    ) => {
      setIsLoading(true);
      resetAbortController();

      try {
        await fetch();

        setErrorMessage(null);
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) {
          return;
        } else if (isAxiosError(error) && error.config?.signal?.aborted) {
          return;
        }

        if (onCatch) {
          await onCatch(error);
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resetAbortController = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
  };

  const handleSetRecipes = useCallback(
    (recipes: Recipe[]) => {
      if (recipes.length === 0) {
        window.alert("Sorry, we haven't found any recipes for these filters.");
      } else if (recipes.length === 1) {
        // If only one recipe is found, navigate to its RecipeDetails page
        const recipe = recipes[0];
        navigate(recipe.id);
      } else {
        dispatch(setRecipes(recipes));
      }
    },
    [dispatch, navigate]
  );

  const handleFetchRecipesBySearch = async ({
    searchQuery,
    searchFilter,
  }: RecipesFilterBySearchFormState) => {
    await fetchWithControllers(
      async () => {
        const response = await onGetRecipesByFilter(searchQuery, searchFilter, {
          signal: abortControllerRef.current?.signal,
        });
        const recipes = response.map(toRecipe);

        handleSetRecipes(recipes);
      },
      () => {
        setErrorMessage(
          `Sorry, there was an error when trying to filter recipes by ${searchFilter} ${searchQuery}. Please, Try again later.`
        );
      }
    );
  };

  const handleFetchRecipesByCategory = async (category: string) => {
    await fetchWithControllers(
      async () => {
        const response = await onGetRecipesByFilter(
          category,
          RecipeFilterOptions.CATEGORY,
          { signal: abortControllerRef.current?.signal }
        );
        const recipes = response.map(toRecipe);

        handleSetRecipes(recipes);
      },
      () => {
        setErrorMessage(
          `Sorry, there was an error when trying to filter recipes by the category ${category}. Please, Try again later.`
        );
      }
    );
  };

  const handleFetchRecipesWithoutFilter = useCallback(async () => {
    await fetchWithControllers(
      async () => {
        const response = await onGetRecipes({
          signal: abortControllerRef.current?.signal,
        });

        const recipes = response.map(toRecipe);

        handleSetRecipes(recipes);
      },
      () => {
        setErrorMessage(
          `Sorry, there was an error when trying to get you recipes. Please, try again later.`
        );
      }
    );
  }, [fetchWithControllers, handleSetRecipes, onGetRecipes]);

  useEffect(() => {
    handleFetchRecipesWithoutFilter();

    return () => {
      const { current } = abortControllerRef;
      current?.abort();
    };
  }, [handleFetchRecipesWithoutFilter]);

  return (
    <BasicLayout containHeaderSearchBar>
      <CenteredTitleWithIcon icon={icon} title={title} />

      {visibility.showSearchBar && (
        <RecipesFilterBySearch onSearch={handleFetchRecipesBySearch} />
      )}

      <RecipesFilterByCategory
        categories={categories}
        onFilterByCategory={handleFetchRecipesByCategory}
        onFilterByAll={handleFetchRecipesWithoutFilter}
      />

      {errorMessage !== null && (
        <section className="d-flex flex-column align-items-center justify-content-center mt-4">
          <h3 className="text-center">Oops, something went wrong!</h3>
          <p className="text-center">{errorMessage}</p>
        </section>
      )}

      {!errorMessage && (
        <ListWithPagination
          ItemCardSkeleton={<RecipeBasicCardSkeleton />}
          loading={isLoading}
          onCreateItemCard={(recipe, index) => (
            <RecipeBasicCard
              data-testid={`${index}-recipe-card`}
              recipe={recipe}
              index={index}
              scaleOnHover
            />
          )}
          items={menu.recipes}
        />
      )}
    </BasicLayout>
  );
}
