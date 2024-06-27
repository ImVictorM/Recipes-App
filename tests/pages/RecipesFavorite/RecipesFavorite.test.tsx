import { screen, waitFor, within, act } from "@testing-library/react";

import renderRoute from "../../helpers/render/renderRoute";

import { recipesWithDetails } from "../../mocks/recipes/recipes";
import { drinksWithDetails } from "../../mocks/recipes/drinks/drinks";
import { emailValid } from "../../mocks/user/email";

import { RenderRouteOptions } from "../../helpers/render/renderRoute/renderRoute.types";
import { RecipeWithDetails } from "@/store/slices/menu/menuSlice.types";
import { mealsWithDetails } from "../../mocks/recipes/meals/meals";

const defaultRecipesFavorite = recipesWithDetails;

const uiElements = {
  buttons: {
    get all() {
      return screen.getByRole("button", {
        name: /all/i,
      });
    },
    get food() {
      return screen.getByRole("button", {
        name: /food/i,
      });
    },
    get drinks() {
      return screen.getByRole("button", {
        name: /drinks/i,
      });
    },
  },
  links: {
    get profile() {
      return screen.getByRole("link", {
        name: /profile/i,
      });
    },
    get drinks() {
      return screen.getByRole("link", {
        name: /cocktail/i,
      });
    },
    get meals() {
      return screen.getByRole("link", {
        name: /meal/i,
      });
    },
  },
};

const lazyLoadPage = async (
  recipesFavorite: RecipeWithDetails[] = defaultRecipesFavorite,
  options: RenderRouteOptions = {
    preloadedState: {
      user: { email: emailValid },
      menu: {
        recipesDone: {},
        recipesFavorite: { [emailValid]: recipesFavorite },
        recipesInProgress: {},
      },
    },
  }
) => {
  const render = renderRoute(["/favorite-recipes"], options);

  await waitFor(() => screen.getByTestId("RecipesFavorite"), { timeout: 5000 });

  return render;
};

describe("page: RecipesFavorite - path: /favorite-recipes", () => {
  it("renders correctly", async () => {
    await lazyLoadPage();

    screen.getByRole("heading", { level: 1, name: /favorites/i });

    const recipesFavoriteList = screen.getByTestId("RecipesFavorite.List");

    for (let index = 0; index < defaultRecipesFavorite.length; index += 1) {
      const currentRecipe = defaultRecipesFavorite[index];
      const currentRecipeSubtitle = currentRecipe.nationality
        ? `${currentRecipe.nationality} - ${currentRecipe.category}`
        : currentRecipe.category;

      const uiCurrentRecipe = within(recipesFavoriteList).getByTestId(
        `RecipesFavorite.List.Item${index}`
      );

      within(uiCurrentRecipe).getByRole("img", { name: currentRecipe.name });
      within(uiCurrentRecipe).getByRole("heading", {
        name: currentRecipe.name,
      });
      within(uiCurrentRecipe).getByRole("heading", {
        name: currentRecipeSubtitle,
      });
    }

    expect(uiElements.buttons.all).toBeEnabled();
    expect(uiElements.buttons.drinks).toBeEnabled();
    expect(uiElements.buttons.food).toBeEnabled();

    expect(uiElements.links.drinks).toHaveAttribute("href", "/drinks");
    expect(uiElements.links.meals).toHaveAttribute("href", "/meals");
    expect(uiElements.links.profile).toHaveAttribute("href", "/profile");
  });

  it("renders correctly when the user doesn't have favorite recipes", async () => {
    await lazyLoadPage([]);

    const linkToMeals = screen.getByRole("link", { name: /search for meals/i });
    const linkToDrinks = screen.getByRole("link", {
      name: /search for drinks/i,
    });

    screen.getByRole("heading", {
      name: /you haven't favorite any recipes yet/i,
    });

    expect(linkToMeals).toHaveAttribute("href", "/meals");
    expect(linkToDrinks).toHaveAttribute("href", "/drinks");
  });

  it("renders correctly when the user doesn't have favorite meals", async () => {
    const { user } = await lazyLoadPage([...drinksWithDetails]);

    await act(async () => {
      await user.click(uiElements.buttons.food);
    });

    const linkToMeals = screen.getByRole("link", { name: /search for meals/i });
    const linkToDrinks = screen.queryByRole("link", {
      name: /search for drinks/i,
    });

    screen.getByRole("heading", {
      name: /you haven't favorite any food yet/i,
    });

    expect(linkToMeals).toHaveAttribute("href", "/meals");

    expect(linkToDrinks).not.toBeInTheDocument();
  });

  it("renders correctly when the user doesn't have favorite drinks", async () => {
    const { user } = await lazyLoadPage([...mealsWithDetails]);

    await act(async () => {
      await user.click(uiElements.buttons.drinks);
    });

    const linkToDrinks = screen.getByRole("link", {
      name: /search for drinks/i,
    });
    const linkToMeals = screen.queryByRole("link", {
      name: /search for meals/i,
    });

    screen.getByRole("heading", {
      name: /you haven't favorite any drinks yet/i,
    });

    expect(linkToDrinks).toHaveAttribute("href", "/drinks");

    expect(linkToMeals).not.toBeInTheDocument();
  });

  it("removes the recipe of the screen when clicking its unfavorite button", async () => {
    const { user, store } = await lazyLoadPage();

    const [firstFavoriteRecipe] = defaultRecipesFavorite;
    const uiFirstFavoriteRecipe = screen.getByTestId(
      `RecipesFavorite.List.Item0`
    );
    const unfavoriteButton = within(uiFirstFavoriteRecipe).getByRole("button", {
      name: /unfavorite/i,
    });

    await act(async () => {
      await user.click(unfavoriteButton);
    });

    const isRecipeInStore = store
      .getState()
      .menu.recipesFavorite[emailValid].some(
        (r) => r.id === firstFavoriteRecipe.id
      );

    expect(isRecipeInStore).toBe(false);
    expect(uiFirstFavoriteRecipe).not.toBeInTheDocument();
  });
});
