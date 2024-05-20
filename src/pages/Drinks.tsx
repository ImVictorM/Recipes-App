import { MenuFiltersByCategory, PaginatedList, SearchBar } from "@/components";
import { SearchBarFormState } from "@/components/SearchBar";
import { useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import {
  cocktailsCategories,
  getCocktails,
  getCocktailsByFilter,
} from "@/services/menu/cocktailApi";
import { FilterOptions } from "@/services/menu/common";
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

  const handleCocktailsSearch = async (formState: SearchBarFormState) => {
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
    const drinks = await getCocktailsByFilter(category, FilterOptions.CATEGORY);
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
      <h1 data-testid="page-title">Drinks</h1>

      {visibility.showSearchBar && (
        <SearchBar onSearch={handleCocktailsSearch} />
      )}

      <MenuFiltersByCategory
        categories={cocktailsCategories}
        onFilterByCategory={handleFilterCocktailsByCategory}
        onFilterByAll={handleLoadInitialDrinks}
      />

      <PaginatedList
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
