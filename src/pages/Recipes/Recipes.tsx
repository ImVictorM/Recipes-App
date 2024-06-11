import React from "react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { isAxiosError } from "axios";

import BasicLayout from "@/layouts/BasicLayout";

import CenteredTitleWithIcon from "@/components/CenteredTitleWithIcon";
import ListWithPagination from "@/components/ListWithPagination";
import RecipeBasicCardSkeleton from "@/components/RecipeBasicCardSkeleton";
import RecipeBasicCard from "@/components/RecipeBasicCard";

import RecipesFilterByCategory from "./components/RecipesFilterByCategory";
import RecipesFilterBySearch from "./components/RecipesFilterBySearch";

import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";

import { selectVisibility } from "@/store/slices/visibility";
import { selectMenu, setRecipes } from "@/store/slices/menu";

import toRecipe from "@/utils/mappings/recipe/toRecipe";

import { RecipeFilterOptions } from "@/services/menu/common";

import { Drink } from "@/services/menu/cocktail/types";
import { Meal } from "@/services/menu/meal/types";
import { RecipesProps } from "./Recipes.types";
import { Recipe } from "@/store/slices/menu/menuSlice.types";
import { RecipesFilterBySearchFormState } from "./components/RecipesFilterBySearch/RecipesFilterBySearch.types";

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // All the API calls in this page updates the same state using setRecipes,
  // so using a single abort controller is a good approach
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const fetchWithControllers = React.useCallback(
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

  const handleSetRecipes = React.useCallback(
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

  const handleFetchRecipesWithoutFilter = React.useCallback(async () => {
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

  React.useEffect(() => {
    handleFetchRecipesWithoutFilter();

    return () => {
      const { current } = abortControllerRef;
      current?.abort();
    };
  }, [handleFetchRecipesWithoutFilter]);

  return (
    <BasicLayout containHeaderSearchBar>
      <CenteredTitleWithIcon icon={icon} title={title} />

      <Collapse in={visibility.showSearchBar}>
        <div>
          <RecipesFilterBySearch onSearch={handleFetchRecipesBySearch} />
        </div>
      </Collapse>

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
