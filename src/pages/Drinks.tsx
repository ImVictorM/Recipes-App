import { cocktailIcon } from "@/assets/icons";
import {
  RecipeFiltersByCategory,
  RecipeListWithPagination,
  RecipeSearchBar,
} from "@/components";
import { RecipeSearchBarFormState } from "@/components/RecipeSearchBar";
import { useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import {
  cocktailsCategories,
  getCocktails,
  getCocktailsByFilter,
} from "@/services/menu/cocktailApi";
import { RecipeFilterOptions } from "@/services/menu/common";
import { selectMenu, setDrinks } from "@/store/slices/menuSlice";
import { selectVisibility } from "@/store/slices/visibilitySlice";
import { EMPTY_RECIPES_MESSAGE } from "@/utils/constants";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Drinks() {
  const dispatch = useDispatch();
  const visibility = useAppSelector(selectVisibility);
  const menu = useAppSelector(selectMenu);
  const navigate = useNavigate();

  const handleCocktailsSearch = async (formState: RecipeSearchBarFormState) => {
    const drinks = await getCocktailsByFilter(
      formState.searchQuery,
      formState.searchFilter
    );

    if (drinks.length === 0) {
      window.alert(EMPTY_RECIPES_MESSAGE);
    } else if (drinks.length === 1) {
      navigate(`/drinks/${drinks[0].idDrink}`);
    } else {
      dispatch(setDrinks(drinks));
    }
  };

  const handleFilterCocktailsByCategory = async (category: string) => {
    const drinks = await getCocktailsByFilter(
      category,
      RecipeFilterOptions.CATEGORY
    );
    dispatch(setDrinks(drinks));
  };

  const handleLoadInitialDrinks = useCallback(async () => {
    const meals = await getCocktails();
    dispatch(setDrinks(meals));
  }, [dispatch]);

  useEffect(() => {
    handleLoadInitialDrinks();
  }, [handleLoadInitialDrinks]);

  return (
    <BasicLayout containHeaderSearchBar>
      <div className="purple-centered-title">
        <img src={cocktailIcon} alt="cocktail" />
        <h1 data-testid="page-title">Drinks</h1>
      </div>

      {visibility.showSearchBar && (
        <RecipeSearchBar onSearch={handleCocktailsSearch} />
      )}

      <RecipeFiltersByCategory
        categories={cocktailsCategories}
        onFilterByCategory={handleFilterCocktailsByCategory}
        onFilterByAll={handleLoadInitialDrinks}
      />

      <RecipeListWithPagination
        items={menu.drinks.map(({ idDrink, strDrinkThumb, strDrink }) => ({
          id: idDrink,
          img: strDrinkThumb,
          name: strDrink,
        }))}
        navigateTo={({ id }) => `/drinks/${id}`}
      />
    </BasicLayout>
  );
}
