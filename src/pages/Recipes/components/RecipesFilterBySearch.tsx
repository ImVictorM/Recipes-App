import React, { useState } from "react";
import { RecipeFilterOptions } from "@/services/menu/common";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "@/sass/pages/recipes/components/_recipesFilterBySearch.scss";

export type RecipesFilterBySearchFormState = {
  searchQuery: string;
  searchFilter: RecipeFilterOptions;
};

export type RecipesFilterBySearchProps = {
  onSearch: (formState: RecipesFilterBySearchFormState) => void;
};

export default function RecipesFilterBySearch({
  onSearch,
}: RecipesFilterBySearchProps) {
  const [formState, setFormState] = useState<RecipesFilterBySearchFormState>({
    searchQuery: "",
    searchFilter: RecipeFilterOptions.NAME,
  });

  const handleCheckboxInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({
      searchQuery: "",
      searchFilter: e.target.value as RecipeFilterOptions,
    });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      formState.searchFilter === RecipeFilterOptions.FIRST_LETTER
    ) {
      window.alert("Your search must have only 1 (one) character.");
      return;
    }

    onSearch(formState);
  };

  return (
    <Form className="search-form" onSubmit={handleSearchSubmit}>
      <Form.Control
        data-testid="search-input"
        placeholder="Search for recipes"
        className="search-form--search-input"
        maxLength={
          formState.searchFilter === RecipeFilterOptions.FIRST_LETTER ? 1 : 60
        }
        name="searchQuery"
        value={formState.searchQuery}
        onChange={handleSearchInputChange}
      />

      <Container fluid>
        <Row>
          <Col>
            <Form.Check
              id="name"
              inline
              required
              type="radio"
              data-testid="name-search-radio"
              label="Name"
              defaultChecked={
                formState.searchFilter === RecipeFilterOptions.NAME
              }
              name="searchFilter"
              onChange={handleCheckboxInputChange}
              value={RecipeFilterOptions.NAME}
              className="search-form--checkbox"
            />
          </Col>
          <Col>
            <Form.Check
              inline
              type="radio"
              label="Ingredient"
              data-testid="ingredient-search-radio"
              id="ingredient"
              name="searchFilter"
              defaultChecked={
                formState.searchFilter === RecipeFilterOptions.INGREDIENT
              }
              onChange={handleCheckboxInputChange}
              value={RecipeFilterOptions.INGREDIENT}
              className="search-form--checkbox"
            />
          </Col>
          <Col>
            <Form.Check
              inline
              defaultChecked={
                formState.searchFilter === RecipeFilterOptions.FIRST_LETTER
              }
              label="First letter"
              type="radio"
              data-testid="first-letter-search-radio"
              id="firstLetter"
              name="searchFilter"
              onChange={handleCheckboxInputChange}
              value={RecipeFilterOptions.FIRST_LETTER}
              className="search-form--checkbox"
            />
          </Col>
        </Row>

        <Button
          variant="primary"
          data-testid="exec-search-btn"
          type="submit"
          className="w-100 mx-0 mt-2"
          disabled={formState.searchQuery === ""}
        >
          Search
        </Button>
      </Container>
    </Form>
  );
}
