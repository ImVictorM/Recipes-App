import { within } from "@testing-library/react";

import RecipeBasicCard from "@/components/ui/RecipeBasicCard";

import renderElement from "../../helpers/render/renderElement";

import { sushi } from "../../mocks/recipes/meals/sushi";
import { gilligan } from "../../mocks/recipes/drinks/alcoholic/gilligan";

import { Recipe } from "@/store/slices/menu/menuSlice.types";

const RecipeBasicCardDefault = (
  props: Partial<React.ComponentProps<typeof RecipeBasicCard>>
) => <RecipeBasicCard recipe={sushi} {...props} />;

const checkElementsByRecipeType = (container: HTMLElement, recipe: Recipe) => {
  const card = within(container).getByTestId("BasicCard");
  const cardImg = within(card).getByTestId("BasicCard.Img");
  const cardBody = within(card).getByTestId("BasicCard.Body");
  const cardTitle = within(cardBody).getByTestId("BasicCard.Body.Title");
  const cardLink = within(container).getByTestId("BasicCard.Link");

  expect(card).toHaveClass(/recipe-card/);

  expect(cardImg).toHaveRole("img");
  expect(cardImg).toHaveAttribute("src", recipe.img);
  expect(cardImg).toHaveAttribute("alt", recipe.name);

  expect(cardLink).toHaveAttribute("href", `/${recipe.type}s/${recipe.id}`);
  expect(cardTitle).toHaveTextContent(recipe.name);
  expect(cardTitle).toHaveAttribute("title", recipe.name);
};

describe("component: RecipeBasicCard", () => {
  it("renders a meal correctly correctly", () => {
    const { container } = renderElement(<RecipeBasicCardDefault />);

    checkElementsByRecipeType(container, sushi);
  });

  it("renders a drink correctly", () => {
    const { container } = renderElement(
      <RecipeBasicCardDefault recipe={gilligan} />
    );

    checkElementsByRecipeType(container, gilligan);
  });

  it("applies additional style when scaleOnHover is true", () => {
    const { container } = renderElement(
      <RecipeBasicCardDefault scaleOnHover={true} />
    );

    const card = within(container).getByTestId("BasicCard");

    expect(card).toHaveClass(/recipe-card/);
    expect(card).toHaveClass(/recipe-card--scale-on-hover/);
  });
});
