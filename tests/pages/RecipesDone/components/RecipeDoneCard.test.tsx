import { screen, within } from "@testing-library/react";

import RecipeDoneCard from "@/pages/RecipesDone/components/RecipeDoneCard";

import renderElement from "../../../utils/render/renderElement";

import { sushiWithDetailsAndDoneDate } from "../../../mocks/recipes/meals/sushi";
import { RecipeWithDetailsAndDoneDate } from "@/store/slices/menu/menuSlice.types";
import { gilliganWithDetailsAndDoneDate } from "../../../mocks/recipes/drinks/alcoholic/gilligan";
import { frappeWithDetailsAndDoneDate } from "../../../mocks/recipes/drinks/frappe";

const RecipeDoneCardDefault = (
  props: Partial<React.ComponentProps<typeof RecipeDoneCard>>
) => (
  <RecipeDoneCard
    prefixDataTestId="Card"
    recipe={sushiWithDetailsAndDoneDate}
    {...props}
  />
);

const checkIfRendersBaseElements = (recipe: RecipeWithDetailsAndDoneDate) => {
  const card = screen.getByTestId("Card");
  const cardBody = within(card).getByTestId("Card.Body");

  const cardLinkImg = screen.getByTestId("Card.LinkImg");
  const cardTitle = within(cardBody).getByTestId("Card.Body.LinkTitle");
  const cardRecipeDoneDate = within(cardBody).getByTestId("Card.Body.DoneDate");

  for (let index = 0; index < recipe.tags.length; index += 1) {
    const tags = within(cardBody).getByTestId("Card.Body.Tags");
    within(tags).getByRole("listitem", { name: recipe.tags[index] });
  }

  within(cardBody).getByRole("button", { name: /share/i });
  within(cardTitle).getByRole("heading", { name: recipe.name });
  within(cardLinkImg).getByRole("img", { name: recipe.name });
  expect(cardLinkImg).toHaveAttribute("href", `/${recipe.type}s/${recipe.id}`);
  expect(cardRecipeDoneDate).toHaveTextContent(`Done in: ${recipe.doneDate}`);

  return { cardBody, card };
};

describe("page: RecipesDone - component: RecipeDoneCard", () => {
  it("renders a meal correctly", () => {
    renderElement(<RecipeDoneCardDefault />);

    const { cardBody } = checkIfRendersBaseElements(
      sushiWithDetailsAndDoneDate
    );

    const expectedSushiSubtitle = `${sushiWithDetailsAndDoneDate.nationality} - ${sushiWithDetailsAndDoneDate.category}`;

    within(cardBody).getByRole("heading", {
      name: new RegExp(expectedSushiSubtitle, "i"),
    });
  });

  it("renders an alcoholic drink correctly", () => {
    renderElement(
      <RecipeDoneCardDefault recipe={gilliganWithDetailsAndDoneDate} />
    );

    const { cardBody } = checkIfRendersBaseElements(
      gilliganWithDetailsAndDoneDate
    );

    within(cardBody).getByText(/alcoholic/i);
  });

  it("renders a non alcoholic drink correctly", () => {
    renderElement(
      <RecipeDoneCardDefault recipe={frappeWithDetailsAndDoneDate} />
    );

    const { cardBody } = checkIfRendersBaseElements(
      frappeWithDetailsAndDoneDate
    );

    expect(within(cardBody).queryByText(/alcoholic/i)).not.toBeInTheDocument();
  });

  it("is possible to copy the recipe link correctly", async () => {
    const { user } = renderElement(<RecipeDoneCardDefault />);

    const buttonShare = screen.getByRole("button", { name: /share/i });

    await user.click(buttonShare);

    const clipboardText = await navigator.clipboard.readText();

    expect(clipboardText).toMatch(
      new RegExp(`/meals/${sushiWithDetailsAndDoneDate.id}$`)
    );
  });

  it("shows a tooltip when hovering the share button", async () => {
    const { user } = renderElement(<RecipeDoneCardDefault />);

    const buttonShare = screen.getByRole("button", { name: /share/i });

    await user.hover(buttonShare);

    const tooltip = await screen.findByTestId("Card.Body.ButtonShare.Tooltip");

    expect(tooltip).toHaveTextContent("Copy recipe link");
  });
});
