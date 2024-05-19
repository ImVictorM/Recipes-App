import { useState } from "react";
import { FilterOptions } from "@/services/menu/common";
import "../styles/components/searchBy.css";

export type SearchBarFormState = {
  searchQuery: string;
  searchFilter: FilterOptions;
};

export type SearchBarProps = {
  onSearch: (formState: SearchBarFormState) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
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

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formState.searchQuery.length !== 1 &&
      formState.searchFilter === FilterOptions.FIRST_LETTER
    ) {
      window.alert("Your search must have only 1 (one) character.");
      return;
    }

    onSearch(formState);
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
