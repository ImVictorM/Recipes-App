import { useState } from "react";
import { useAppDispatch } from "@/hooks";
import { FilterOptions } from "@/services/menu/common";
import "../styles/components/searchBy.css";
import { getMealsByFilter } from "@/services/menu/mealApi";
import { getCocktailsByFilter } from "@/services/menu/cocktailApi";
import { useNavigate } from "react-router-dom";
import { setDrinks, setMeals } from "@/store/slices/menuSlice";

export type SearchBarProps = {
  searchFor: "meals" | "drinks";
};

type SearchBarFormState = {
  searchQuery: string;
  searchFilter: FilterOptions;
};

export default function SearchBar({ searchFor }: SearchBarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emptyRecipesMessage =
    "Sorry, we haven't found any recipes for these filters.";
  const [formState, setFormState] = useState<SearchBarFormState>({
    searchQuery: "",
    searchFilter: FilterOptions.NAME,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMealsFetching = async () => {
    const meals = await getMealsByFilter(
      formState.searchQuery,
      formState.searchFilter
    );

    if (meals.length === 0) {
      window.alert(emptyRecipesMessage);
    } else if (meals.length === 1) {
      navigate(`/meals/${meals[0].idMeal}`);
    } else {
      dispatch(setMeals(meals));
    }
  };

  const handleCocktailsFetching = async () => {
    const drinks = await getCocktailsByFilter(
      formState.searchQuery,
      formState.searchFilter
    );

    if (drinks.length === 0) {
      window.alert(emptyRecipesMessage);
    } else if (drinks.length === 1) {
      navigate(`/drinks/${drinks[0].idDrink}`);
    } else {
      dispatch(setDrinks(drinks));
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formState.searchQuery.length !== 1 &&
      formState.searchFilter === FilterOptions.FIRST_LETTER
    ) {
      window.alert("Your search must have only 1 (one) character.");
      return;
    }

    if (searchFor === "meals") {
      await handleMealsFetching();
    } else {
      await handleCocktailsFetching();
    }
  };

  return (
    <form className="container-search" onSubmit={handleSearchSubmit}>
      <div className="filters">
        <label htmlFor="search">
          <input
            className="input-search"
            data-testid="search-input"
            placeholder="Search"
            id="search"
            maxLength={
              formState.searchFilter === FilterOptions.FIRST_LETTER ? 1 : 60
            }
            name="searchQuery"
            value={formState.searchQuery}
            onChange={handleFormChange}
          />
        </label>
      </div>

      <div className="search-bar">
        <div className="searchbar-input">
          <label htmlFor="name">
            <input
              required
              type="radio"
              data-testid="name-search-radio"
              id="name"
              defaultChecked={formState.searchFilter === FilterOptions.NAME}
              name="searchFilter"
              onChange={handleFormChange}
              value={FilterOptions.NAME}
            />
            Name
          </label>

          <label htmlFor="ingredient">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="searchFilter"
              defaultChecked={
                formState.searchFilter === FilterOptions.INGREDIENT
              }
              onChange={handleFormChange}
              value={FilterOptions.INGREDIENT}
            />
            Ingredient
          </label>

          <label htmlFor="firstLetter">
            <input
              defaultChecked={
                formState.searchFilter === FilterOptions.FIRST_LETTER
              }
              type="radio"
              data-testid="first-letter-search-radio"
              id="firstLetter"
              name="searchFilter"
              onChange={handleFormChange}
              value={FilterOptions.FIRST_LETTER}
            />
            First letter
          </label>
        </div>

        <button
          className="btn-search"
          data-testid="exec-search-btn"
          type="submit"
          disabled={formState.searchQuery === ""}
        >
          Search
        </button>
      </div>
    </form>
  );
}
