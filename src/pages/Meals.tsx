import { MenuFiltersByCategory, PaginatedList, SearchBar } from "@/components";
import { SearchBarFormState } from "@/components/SearchBar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { BasicLayout } from "@/layouts";
import { FilterOptions } from "@/services/menu/common";
import {
  getMeals,
  getMealsByFilter,
  mealsCategories,
} from "@/services/menu/mealApi";
import { selectMenu, setMeals } from "@/store/slices/menuSlice";
import { selectVisibility } from "@/store/slices/visibilitySlice";
import { EMPTY_RECIPES_MESSAGE } from "@/utils/constants";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Meals() {
  const dispatch = useAppDispatch();
  const visibility = useAppSelector(selectVisibility);
  const menu = useAppSelector(selectMenu);
  const navigate = useNavigate();

  const handleMealsSearch = async (formState: SearchBarFormState) => {
    const meals = await getMealsByFilter(
      formState.searchQuery,
      formState.searchFilter
    );

    if (meals.length === 0) {
      window.alert(EMPTY_RECIPES_MESSAGE);
    } else if (meals.length === 1) {
      navigate(`/meals/${meals[0].idMeal}`);
    } else {
      dispatch(setMeals(meals));
    }
  };

  const handleFilterMealsByCategory = async (category: string) => {
    const mealsByCategory = await getMealsByFilter(
      category,
      FilterOptions.CATEGORY
    );
    dispatch(setMeals(mealsByCategory));
  };

  const handleLoadInitialMeals = useCallback(async () => {
    const meals = await getMeals();
    dispatch(setMeals(meals));
  }, [dispatch]);

  useEffect(() => {
    handleLoadInitialMeals();
  }, [handleLoadInitialMeals]);

  return (
    <BasicLayout containHeaderSearchBar>
      <h1 className="mt-4" data-testid="page-title">
        Meals
      </h1>

      {visibility.showSearchBar && <SearchBar onSearch={handleMealsSearch} />}

      <MenuFiltersByCategory
        categories={mealsCategories}
        onFilterByCategory={handleFilterMealsByCategory}
        onFilterByAll={handleLoadInitialMeals}
      />

      <PaginatedList
        items={menu.meals.map(({ idMeal, strMealThumb, strMeal }) => ({
          id: idMeal,
          img: strMealThumb,
          name: strMeal,
        }))}
        navigateTo={({ id }) => `/meals/${id}`}
      />
    </BasicLayout>
  );
}
