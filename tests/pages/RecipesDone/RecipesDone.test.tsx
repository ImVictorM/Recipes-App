import { screen, waitFor, within, act } from "@testing-library/react";

import renderRoute from "../../helpers/render/renderRoute";

import { RenderRouteOptions } from "../../helpers/render/renderRoute/renderRoute.types";

import { recipesWithDetailsAndDoneDate } from "../../mocks/recipes/recipes";
import { drinksWithDetailsAndDoneDate } from "../../mocks/recipes/drinks/drinks";
import { emailValid } from "../../mocks/user/email";

import { RecipeWithDetailsAndDoneDate } from "@/store/slices/menu/menuSlice.types";
import { mealsWithDetailsAndDoneDate } from "../../mocks/recipes/meals/meals";

const defaultRecipesDone = recipesWithDetailsAndDoneDate;

const lazyLoadPage = async (
  doneRecipes: RecipeWithDetailsAndDoneDate[] = defaultRecipesDone,
  options: RenderRouteOptions = {
    preloadedState: {
      user: { email: emailValid },
      menu: {
        recipesDone: { [emailValid]: doneRecipes },
        recipesFavorite: {},
        recipesInProgress: {},
      },
    },
  }
) => {
  const render = renderRoute(["/done-recipes"], options);

  await waitFor(() => screen.getByTestId("RecipesDone"), { timeout: 5000 });

  return render;
};

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

describe("page: RecipesDone - path: /done-recipes", () => {
  it("renders correctly", async () => {
    await lazyLoadPage();

    screen.getByRole("heading", { level: 1, name: /done recipes/i });

    const recipesDoneList = screen.getByTestId("RecipesDone.List");

    for (let index = 0; index < defaultRecipesDone.length; index += 1) {
      const currentRecipe = defaultRecipesDone[index];
      const currentRecipeSubtitle = currentRecipe.nationality
        ? `${currentRecipe.nationality} - ${currentRecipe.category}`
        : currentRecipe.category;

      const uiCurrentRecipe = within(recipesDoneList).getByTestId(
        `RecipesDone.List.Item${index}`
      );

      within(uiCurrentRecipe).getByRole("img", { name: currentRecipe.name });
      within(uiCurrentRecipe).getByRole("heading", {
        name: currentRecipe.name,
      });
      within(uiCurrentRecipe).getByRole("heading", {
        name: currentRecipeSubtitle,
      });
      within(uiCurrentRecipe).getByText(
        new RegExp(`done in: ${currentRecipe.doneDate}`, "i")
      );
    }

    expect(uiElements.buttons.all).toBeEnabled();
    expect(uiElements.buttons.drinks).toBeEnabled();
    expect(uiElements.buttons.food).toBeEnabled();

    expect(uiElements.links.drinks).toHaveAttribute("href", "/drinks");
    expect(uiElements.links.meals).toHaveAttribute("href", "/meals");
    expect(uiElements.links.profile).toHaveAttribute("href", "/profile");
  });

  it("renders correctly when the user doesn't have done recipes", async () => {
    await lazyLoadPage([]);

    const linkToMeals = screen.getByRole("link", { name: /search for meals/i });
    const linkToDrinks = screen.getByRole("link", {
      name: /search for drinks/i,
    });

    screen.getByRole("heading", {
      name: /you haven't completed any recipes yet/i,
    });

    expect(linkToMeals).toHaveAttribute("href", "/meals");
    expect(linkToDrinks).toHaveAttribute("href", "/drinks");
  });

  it("renders correctly when the user doesn't have done meals", async () => {
    const { user } = await lazyLoadPage([...drinksWithDetailsAndDoneDate]);

    await act(async () => {
      await user.click(uiElements.buttons.food);
    });

    const linkToMeals = screen.getByRole("link", { name: /search for meals/i });
    const linkToDrinks = screen.queryByRole("link", {
      name: /search for drinks/i,
    });

    screen.getByRole("heading", {
      name: /you haven't completed any food yet/i,
    });

    expect(linkToMeals).toHaveAttribute("href", "/meals");

    expect(linkToDrinks).not.toBeInTheDocument();
  });

  it("renders correctly when the user doesn't have done drinks", async () => {
    const { user } = await lazyLoadPage([...mealsWithDetailsAndDoneDate]);

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
      name: /you haven't completed any drinks yet/i,
    });

    expect(linkToDrinks).toHaveAttribute("href", "/drinks");

    expect(linkToMeals).not.toBeInTheDocument();
  });
});
