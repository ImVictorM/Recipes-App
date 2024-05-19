import { MenuFiltersByCategory, SearchBar } from "@/components";
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
import { Link, useNavigate } from "react-router-dom";

function Drinks() {
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
      <h1 className="mt-4" data-testid="page-title">
        Drinks
      </h1>

      {visibility.showSearchBar && (
        <SearchBar onSearch={handleCocktailsSearch} />
      )}

      <MenuFiltersByCategory
        categories={cocktailsCategories}
        onFilterByCategory={handleFilterCocktailsByCategory}
        onFilterByAll={handleLoadInitialDrinks}
      />

      <ul className="mt-5">
        {menu.drinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => {
          return (
            <Link key={idDrink} to={`/drinks/${idDrink}`}>
              <li data-testid={`${index}-recipe-card`}>
                <img
                  src={strDrinkThumb}
                  alt={strDrink}
                  data-testid={`${index}-card-img`}
                  className="img"
                />
                <p data-testid={`${index}-card-name`}>{strDrink}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </BasicLayout>
  );
}

export default Drinks;
