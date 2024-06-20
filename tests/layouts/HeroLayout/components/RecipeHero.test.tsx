import { screen, act } from "@testing-library/react";

import RecipeHero from "@/layouts/HeroLayout/components/RecipeHero";

import renderElement from "../../../utils/render/renderElement";

import { sushiWithDetails } from "../../../mocks/recipes/meals/sushi";
import { gilliganWithDetails } from "../../../mocks/recipes/drinks/alcoholic/gilligan";

const RecipeHeroDefault = (
  props: Partial<React.ComponentProps<typeof RecipeHero>>
) => <RecipeHero recipe={sushiWithDetails} {...props} />;

describe("layout: HeroLayout - component: RecipeHero", () => {
  it("renders correctly", () => {
    renderElement(<RecipeHeroDefault />);

    const title = screen.getByTestId("RecipeHero.Presentation.Title");
    const subtitle = screen.getByTestId("RecipeHero.Presentation.Subtitle");
    const alcoholic = screen.queryByTestId(
      "RecipeHero.Presentation.Subtitle.Alcoholic"
    );

    screen.getByTestId("RecipeHero.Header.ButtonShare");
    screen.getByTestId("RecipeHero.Header.ButtonFavorite");

    expect(title).toHaveTextContent(sushiWithDetails.name);
    expect(subtitle).toHaveTextContent(sushiWithDetails.category);
    expect(alcoholic).not.toBeInTheDocument();
  });

  it("handles copy the recipe url to clipboard when clicking the share button", async () => {
    const { user } = renderElement(<RecipeHeroDefault />);

    const buttonShare = screen.getByTestId("RecipeHero.Header.ButtonShare");

    await act(async () => {
      await user.hover(buttonShare);
    });

    const shareTooltip = screen.getByTestId(
      "RecipeHero.Header.ButtonShare.Tooltip"
    );

    expect(shareTooltip).toHaveTextContent("Copy recipe link");

    await act(async () => {
      await user.click(buttonShare);
    });

    const clipboardContent = await navigator.clipboard.readText();

    expect(shareTooltip).toHaveTextContent("Recipe link copied!");
    expect(clipboardContent).toMatch(
      new RegExp(`/meals/${sushiWithDetails.id}$`)
    );
  });

  it("handles toggle recipe favorite correctly", async () => {
    const testEmail = "test@test.com";

    const { user, store } = renderElement(<RecipeHeroDefault />, {
      preloadedState: {
        user: { email: testEmail },
      },
    });

    const buttonFavorite = screen.getByTestId(
      "RecipeHero.Header.ButtonFavorite"
    );

    await act(async () => {
      await user.hover(buttonFavorite);
    });

    const favoriteTooltip = screen.getByTestId(
      "RecipeHero.Header.ButtonFavorite.Tooltip"
    );

    expect(favoriteTooltip).toHaveTextContent("Favorite recipe");

    await act(async () => {
      await user.click(buttonFavorite);
    });

    expect(favoriteTooltip).toHaveTextContent("Unfavorite recipe");
    expect(
      store
        .getState()
        .menu.recipesFavorite[testEmail].some(
          (recipe) => recipe.id === sushiWithDetails.id
        )
    ).toBe(true);

    await act(async () => {
      await user.click(buttonFavorite);
    });

    expect(favoriteTooltip).toHaveTextContent("Favorite recipe");

    expect(
      store
        .getState()
        .menu.recipesFavorite[testEmail].some(
          (recipe) => recipe.id === sushiWithDetails.id
        )
    ).toBe(false);
  });

  it('renders "alcoholic" before the category when the recipe is an alcoholic drink', () => {
    renderElement(<RecipeHeroDefault recipe={gilliganWithDetails} />);

    const subtitle = screen.getByTestId("RecipeHero.Presentation.Subtitle");

    const alcoholicSub = screen.getByTestId(
      "RecipeHero.Presentation.Subtitle.Alcoholic"
    );

    expect(subtitle).toContainElement(alcoholicSub);
    expect(alcoholicSub).toHaveTextContent("Alcoholic");
    expect(subtitle).toHaveTextContent(
      `Alcoholic ${gilliganWithDetails.category}`
    );
  });
});
