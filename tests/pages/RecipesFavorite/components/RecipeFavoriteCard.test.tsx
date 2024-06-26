import { screen, within, act } from "@testing-library/react";

import RecipeFavoriteCard from "@/pages/RecipesFavorite/components/RecipeFavoriteCard";

import renderElement from "../../../utils/render/renderElement";

import { sushiWithDetails } from "../../../mocks/recipes/meals/sushi";
import { palomaWithDetails } from "../../../mocks/recipes/drinks/alcoholic/paloma";
import { RecipeWithDetails } from "@/store/slices/menu/menuSlice.types";
import { emailValid } from "../../../mocks/user/email";

const recipeDefault = sushiWithDetails;

const RecipeFavoriteCardDefault = (
  props: Partial<React.ComponentProps<typeof RecipeFavoriteCard>>
) => (
  <RecipeFavoriteCard
    prefixDataTestId="Card"
    recipe={recipeDefault}
    {...props}
  />
);

const uiElements = {
  buttons: {
    get unfavorite() {
      return screen.getByRole("button", {
        name: /unfavorite/i,
      });
    },
    get share() {
      return screen.getByRole("button", { name: /share/i });
    },
  },
};

const checkCardRendersBaseElements = (recipe: RecipeWithDetails) => {
  const expectedCardLink = `${recipe.type}s/${recipe.id}`;
  const expectCardSubtitle = recipe.nationality
    ? `${recipe.nationality} - ${recipe.category}`
    : recipe.category;

  const card = screen.getByTestId("Card");
  const cardBody = within(card).getByTestId("Card.Body");

  const cardLinkImg = within(card).getByTestId("Card.LinkImg");
  const cardLinkTitle = within(cardBody).getByTestId("Card.Body.LinkTitle");

  expect(cardLinkImg).toHaveAttribute("href", expectedCardLink);
  expect(cardLinkTitle).toHaveAttribute("href", expectedCardLink);

  within(cardLinkTitle).getByRole("heading", { name: recipe.name });
  within(cardLinkImg).getByRole("img", { name: recipe.name });

  within(cardBody).getByRole("heading", { name: expectCardSubtitle });
  within(cardBody).getByRole("button", { name: /unfavorite/i });
  within(cardBody).getByRole("button", { name: /share/i });

  return { card, cardBody };
};

describe("page: RecipesFavorite - component: RecipeFavoriteCard", () => {
  it("renders correctly", () => {
    renderElement(<RecipeFavoriteCardDefault />);

    checkCardRendersBaseElements(recipeDefault);
  });

  it("renders an alcoholic label when the recipe is an alcoholic drink", () => {
    renderElement(<RecipeFavoriteCardDefault recipe={palomaWithDetails} />);

    const { cardBody } = checkCardRendersBaseElements(palomaWithDetails);

    within(cardBody).getByText(/alcoholic/i);
  });

  it("shows a tooltip when hovering the share button", async () => {
    const { user } = renderElement(<RecipeFavoriteCardDefault />);

    await user.hover(uiElements.buttons.share);

    const tooltip = await screen.findByTestId("Card.Body.ButtonShare.Tooltip");

    expect(tooltip).toHaveTextContent("Copy recipe link");
  });

  it("shows a tooltip when hovering the unfavorite button", async () => {
    const { user } = renderElement(<RecipeFavoriteCardDefault />);

    await user.hover(uiElements.buttons.unfavorite);

    const tooltip = await screen.findByTestId(
      "Card.Body.ButtonUnfavorite.Tooltip"
    );

    expect(tooltip).toHaveTextContent("Unfavorite recipe");
  });

  it("can copy the recipe link correctly", async () => {
    const { user } = renderElement(<RecipeFavoriteCardDefault />);

    await user.click(uiElements.buttons.share);

    const clipboardText = await navigator.clipboard.readText();

    expect(clipboardText).toMatch(new RegExp(`meals/${recipeDefault.id}`, "i"));
  });

  it("can unfavorite a recipe correctly", async () => {
    const { user, store } = renderElement(<RecipeFavoriteCardDefault />, {
      preloadedState: {
        user: { email: emailValid },
        menu: {
          recipesFavorite: { [emailValid]: [recipeDefault] },
          recipesDone: {},
          recipesInProgress: {},
        },
      },
    });

    await act(async () => {
      await user.click(uiElements.buttons.unfavorite);
    });

    expect(store.getState().menu.recipesFavorite[emailValid]).toEqual([]);
  });
});
