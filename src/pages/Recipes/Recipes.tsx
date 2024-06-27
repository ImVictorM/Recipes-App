import React from "react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "react-bootstrap";

import BasicLayout from "@/layouts/BasicLayout";

import CenteredTitleWithIcon from "@/components/ui/CenteredTitleWithIcon";
import ListWithPagination from "@/components/ui/ListWithPagination";
import RecipeBasicCardSkeleton from "@/components/ui/RecipeBasicCardSkeleton";
import RecipeBasicCard from "@/components/ui/RecipeBasicCard";

import RecipesFilterByCategory from "./components/RecipesFilterByCategory";
import RecipesFilterBySearch from "./components/RecipesFilterBySearch";

import useAppSelector from "@/hooks/useAppSelector";
import useHeadTitle from "@/hooks/useHeadTitle";
import useRequest from "@/hooks/useRequest";

import { selectVisibility } from "@/store/slices/visibility";

import toRecipe from "@/utils/mappings/recipe/toRecipe";

import { RecipeFilterOptions } from "@/services/menu/common/enums";

import { Recipe } from "@/store/slices/menu/menuSlice.types";
import { RecipesFilterBySearchFormState } from "./components/RecipesFilterBySearch/RecipesFilterBySearch.types";
import { RecipesProps, RecipesUtils } from "./Recipes.types";

export default function Recipes({
  type,
  prefixDataTestId = "Recipes",
}: RecipesProps) {
  useHeadTitle(type === "drink" ? "Drinks" : "Meals");
  const visibility = useAppSelector(selectVisibility);
  const navigate = useNavigate();
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [recipeUtils, setRecipeUtils] = React.useState<RecipesUtils>();
  const { errorMessage, isLoading, request, setErrorMessage } = useRequest();

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
    await request(
      async (abortController) => {
        if (!recipeUtils) return;

        const response = await recipeUtils.onGetRecipesByFilter(
          searchQuery,
          searchFilter,
          {
            signal: abortController.signal,
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
    await request(
      async (abortController) => {
        if (!recipeUtils) return;

        const response = await recipeUtils.onGetRecipesByFilter(
          category,
          RecipeFilterOptions.CATEGORY,
          { signal: abortController.signal }
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
    await request(
      async (abortController) => {
        if (!recipeUtils) return;

        const response = await recipeUtils.onGetRecipes({
          signal: abortController.signal,
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
  }, [handleSetRecipes, recipeUtils, request, setErrorMessage]);

  React.useEffect(() => {
    handleFetchRecipesWithoutFilter();
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
    <BasicLayout containHeaderSearchBar prefixDataTestId={prefixDataTestId}>
      {recipeUtils && (
        <CenteredTitleWithIcon
          icon={recipeUtils.icon}
          title={recipeUtils.title}
          prefixDataTestId={`${prefixDataTestId}.ComponentTitle`}
        />
      )}

      <Collapse in={visibility.showSearchBar}>
        <div
          aria-hidden={!visibility.showSearchBar}
          data-testid={`${prefixDataTestId}.RecipesFilterBySearch`}
        >
          <RecipesFilterBySearch
            onSearch={handleFetchRecipesBySearch}
            prefixDataTestId={`${prefixDataTestId}.RecipesFilterBySearch.Component`}
          />
        </div>
      </Collapse>

      {recipeUtils && (
        <RecipesFilterByCategory
          categories={recipeUtils.categories}
          onFilterByCategory={handleFetchRecipesByCategory}
          onFilterByAll={handleFetchRecipesWithoutFilter}
          prefixDataTestId={`${prefixDataTestId}.RecipesFilterByCategory`}
        />
      )}

      {errorMessage !== null && (
        <section
          data-testid={`${prefixDataTestId}.Error`}
          className="d-flex flex-column align-items-center justify-content-center mt-4"
        >
          <h3 className="text-center">Oops, something went wrong!</h3>
          <p className="text-center">{errorMessage}</p>
        </section>
      )}

      {!errorMessage && (
        <ListWithPagination
          renderItemCardSkeleton={<RecipeBasicCardSkeleton />}
          loading={isLoading}
          prefixDataTestId={`${prefixDataTestId}.List`}
          renderItemCard={(recipe, index) => (
            <RecipeBasicCard
              prefixDataTestId={`${prefixDataTestId}.List.Item${index}`}
              recipe={recipe}
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
