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
import capitalize from "@/utils/capitalize";

import getMenuServicesByRecipeType from "@/services/menu/getMenuServicesByRecipeType";
import getMenuCategoriesByRecipeType from "@/services/menu/getMenuCategoriesByRecipeType";
import { RecipeFilterOptions } from "@/services/menu/common/enums";

import { Recipe } from "@/store/slices/menu/menuSlice.types";
import { RecipesFilterBySearchFormState } from "./components/RecipesFilterBySearch/RecipesFilterBySearch.types";
import { RecipesProps } from "./Recipes.types";
import { CenteredTitleWithIconProps } from "@/components/ui/CenteredTitleWithIcon/CenteredTitleWithIcon.types";

export default function Recipes({
  type,
  prefixDataTestId = "Recipes",
}: RecipesProps) {
  const pageTitle = capitalize(`${type}s`);
  useHeadTitle(pageTitle);

  const visibility = useAppSelector(selectVisibility);
  const navigate = useNavigate();
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const { errorMessage, isLoading, request, setErrorMessage } = useRequest();
  const [pageIcon, setPageIcon] =
    React.useState<CenteredTitleWithIconProps["icon"]>();

  const { getRecipes, getRecipesByFilter } = getMenuServicesByRecipeType(type);
  const categories = getMenuCategoriesByRecipeType(type);

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
        const response = await getRecipesByFilter(searchQuery, searchFilter, {
          signal: abortController.signal,
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
    await request(
      async (abortController) => {
        const response = await getRecipesByFilter(
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
        const response = await getRecipes({
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
  }, [getRecipes, handleSetRecipes, request, setErrorMessage]);

  React.useEffect(() => {
    const fetchIcon = async () => {
      switch (type) {
        case "drink": {
          const icon = await import("@/assets/icons/cocktailIcon.svg");

          setPageIcon({ element: icon.default, alt: "Drinks" });
          return;
        }
        case "meal": {
          const icon = await import("@/assets/icons/mealIcon.svg");

          setPageIcon({ element: icon.default, alt: "Meals" });
          return;
        }
      }
    };

    fetchIcon();
  }, [type]);

  React.useEffect(() => {
    handleFetchRecipesWithoutFilter();
  }, [handleFetchRecipesWithoutFilter]);

  return (
    <BasicLayout containHeaderSearchBar prefixDataTestId={prefixDataTestId}>
      {pageIcon && (
        <CenteredTitleWithIcon
          icon={pageIcon}
          title={pageTitle}
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

      <RecipesFilterByCategory
        categories={categories}
        onFilterByCategory={handleFetchRecipesByCategory}
        onFilterByAll={handleFetchRecipesWithoutFilter}
        prefixDataTestId={`${prefixDataTestId}.RecipesFilterByCategory`}
      />

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
