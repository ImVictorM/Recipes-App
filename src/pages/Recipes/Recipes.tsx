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

import useAppSelector from "@/hooks/useAppSelector";
import useHeadTitle from "@/hooks/useHeadTitle";

import { selectVisibility } from "@/store/slices/visibility";

import toRecipe from "@/utils/mappings/recipe/toRecipe";

import { RecipeFilterOptions } from "@/services/menu/common";

import { Recipe } from "@/store/slices/menu/menuSlice.types";
import { RecipesFilterBySearchFormState } from "./components/RecipesFilterBySearch/RecipesFilterBySearch.types";
import { RecipesProps, RecipesUtils } from "./Recipes.types";

export default function Recipes({ type }: RecipesProps) {
  useHeadTitle(type === "drink" ? "Drinks" : "Meals");
  const visibility = useAppSelector(selectVisibility);
  const navigate = useNavigate();
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [recipeUtils, setRecipeUtils] = React.useState<RecipesUtils>();
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
      setRecipes([]);

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
        setRecipes(recipes);
      }
    },
    [navigate]
  );

  const handleFetchRecipesBySearch = async ({
    searchQuery,
    searchFilter,
  }: RecipesFilterBySearchFormState) => {
    await fetchWithControllers(
      async () => {
        if (!recipeUtils) return;

        const response = await recipeUtils.onGetRecipesByFilter(
          searchQuery,
          searchFilter,
          {
            signal: abortControllerRef.current?.signal,
          }
        );
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
        if (!recipeUtils) return;

        const response = await recipeUtils.onGetRecipesByFilter(
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
        if (!recipeUtils) return;

        const response = await recipeUtils.onGetRecipes({
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
  }, [fetchWithControllers, handleSetRecipes, recipeUtils]);

  React.useEffect(() => {
    handleFetchRecipesWithoutFilter();

    return () => {
      const { current } = abortControllerRef;
      current?.abort();
    };
  }, [handleFetchRecipesWithoutFilter]);

  React.useEffect(() => {
    const importRecipesUtils = async () => {
      switch (type) {
        case "drink": {
          const getCocktailsByFilter = await import(
            "@/services/menu/cocktail/getCocktailsByFilter"
          );
          const getCocktails = await import(
            "@/services/menu/cocktail/getCocktails"
          );
          const cocktailCategories = await import(
            "@/services/menu/cocktail/categories"
          );
          const icon = await import("@/assets/icons/cocktailIcon.svg");

          const title = "Drinks";

          setRecipeUtils({
            onGetRecipesByFilter: getCocktailsByFilter.default,
            onGetRecipes: getCocktails.default,
            categories: cocktailCategories.default,
            title: title,
            icon: { element: icon.default, alt: "cocktail" },
          });
          return;
        }
        case "meal": {
          const getMealsByFilter = await import(
            "@/services/menu/meal/getMealsByFilter"
          );
          const getMeals = await import("@/services/menu/meal/getMeals");
          const mealCategories = await import(
            "@/services/menu/meal/categories"
          );
          const icon = await import("@/assets/icons/mealIcon.svg");

          const title = "Meals";

          setRecipeUtils({
            onGetRecipesByFilter: getMealsByFilter.default,
            onGetRecipes: getMeals.default,
            categories: mealCategories.default,
            title: title,
            icon: { element: icon.default, alt: "meal" },
          });
          return;
        }
      }
    };

    importRecipesUtils();
  }, [type]);

  return (
    <BasicLayout containHeaderSearchBar>
      {recipeUtils && (
        <CenteredTitleWithIcon
          icon={recipeUtils.icon}
          title={recipeUtils.title}
        />
      )}

      <Collapse in={visibility.showSearchBar}>
        <div>
          <RecipesFilterBySearch onSearch={handleFetchRecipesBySearch} />
        </div>
      </Collapse>

      {recipeUtils && (
        <RecipesFilterByCategory
          categories={recipeUtils.categories}
          onFilterByCategory={handleFetchRecipesByCategory}
          onFilterByAll={handleFetchRecipesWithoutFilter}
        />
      )}

      {errorMessage !== null && (
        <section className="d-flex flex-column align-items-center justify-content-center mt-4">
          <h3 className="text-center">Oops, something went wrong!</h3>
          <p className="text-center">{errorMessage}</p>
        </section>
      )}

      {!errorMessage && (
        <ListWithPagination
          renderItemCardSkeleton={<RecipeBasicCardSkeleton />}
          loading={isLoading}
          renderItemCard={(recipe, index) => (
            <RecipeBasicCard
              data-testid={`${index}-recipe-card`}
              recipe={recipe}
              index={index}
              scaleOnHover
            />
          )}
          items={recipes}
          getItemId={(item) => item.id}
        />
      )}
    </BasicLayout>
  );
}
