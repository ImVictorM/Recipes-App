import axios from "axios";

import { screen, waitFor, within, act } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event";

import toRecipe from "@/utils/mappings/recipe/toRecipe";

import renderRoute from "../../utils/render/renderRoute";

import mealCategories from "@/services/menu/meal/categories";
import cocktailCategories from "@/services/menu/cocktail/categories";

import { corba, meals } from "../../mocks/services/menu/meal/meals";
import getMealsResponse from "../../mocks/services/menu/meal/getMealsResponse";

import { cocktails } from "../../mocks/services/menu/cocktail/cocktails";
import getCocktailsResponse from "../../mocks/services/menu/cocktail/getCocktailsResponse";

import { RenderRouteOptions } from "../../utils/render/renderRoute/renderRoute.types";
import { RecipeCategory } from "@/services/menu/common/types";
import { Recipe } from "@/store/slices/menu/menuSlice.types";
import { emailValid } from "../../mocks/user/email";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const defaultRouteOptions = {
  preloadedState: {
    user: { email: emailValid },
  },
};

const MAX_RECIPES_PER_PAGE = 12;

const uiElements = {
  links: {
    get profile() {
      return screen.getByRole("link", {
        name: /circular profile user/i,
      });
    },
    get meals() {
      return screen.getByRole("link", {
        name: /meal plate/i,
      });
    },
    get drinks() {
      return screen.getByRole("link", {
        name: /cocktail glass/i,
      });
    },
  },
  buttons: {
    get search() {
      return screen.getByRole("button", {
        name: /search magnifying glass/i,
      });
    },
  },
};

const lazyLoadPageUtils = async () => {
  await waitFor(() => screen.getByTestId("Recipes.ComponentTitle"), {
    timeout: 5000,
  });
  await waitFor(() => screen.getByTestId("Recipes.RecipesFilterByCategory"), {
    timeout: 5000,
  });
};

const lazyLoadPage = async (
  initialRoutes: string[],
  options: RenderRouteOptions = defaultRouteOptions
) => {
  const render = renderRoute(initialRoutes, options);

  await lazyLoadPageUtils();

  await waitFor(() => screen.getByTestId("Recipes.List.Item0"), {
    timeout: 5000,
  });

  return render;
};

const checkRecipesAreInTheScreen = async (recipes: Recipe[]) => {
  for (let index = 0; index < recipes.length; index += 1) {
    const currRecipe = recipes[index];
    const currUiRecipe = await screen.findByTestId(`Recipes.List.Item${index}`);

    const imgRecipe = within(currUiRecipe).getByRole("img", {
      name: currRecipe.name,
    });

    within(currUiRecipe).getByText(currRecipe.name);
    expect(imgRecipe).toHaveAttribute("src", currRecipe.img);
  }
};

const checkCategoriesAreInTheScreen = async (categories: RecipeCategory[]) => {
  await waitFor(() => screen.getByTestId("Recipes.RecipesFilterByCategory"), {
    timeout: 5000,
  });

  for (const { strCategory: category } of categories) {
    screen.getByRole("button", { name: category });
  }
};

const checkIfRendersBaseElements = async (
  recipes: Recipe[],
  categories: RecipeCategory[]
) => {
  const firstTwelveRecipes = recipes.slice(0, MAX_RECIPES_PER_PAGE);
  const listRecipes = within(screen.getByTestId("Recipes.List")).getAllByTestId(
    /Recipes\.List\.Item\d+$/
  );
  const componentSearch = screen.getByTestId("Recipes.RecipesFilterBySearch");
  const componentError = screen.queryByTestId("Recipes.Error");

  screen.getByRole("heading", {
    level: 1,
    name: new RegExp(recipes[0].type, "i"),
  });

  await checkCategoriesAreInTheScreen(categories);
  await checkRecipesAreInTheScreen(firstTwelveRecipes);

  expect(listRecipes).toHaveLength(MAX_RECIPES_PER_PAGE);
  expect(componentError).not.toBeInTheDocument();
  expect(componentSearch).toHaveAttribute("aria-hidden", "true");
  expect(uiElements.links.profile).toHaveAttribute("href", "/profile");
  expect(uiElements.links.meals).toHaveAttribute("href", "/meals");
  expect(uiElements.links.drinks).toHaveAttribute("href", "/drinks");
  expect(uiElements.buttons.search).toBeEnabled();
};

const renderSearchForm = async (user: UserEvent) => {
  await act(async () => {
    await user.click(uiElements.buttons.search);
  });

  const searchForm = screen.getByTestId(
    "Recipes.RecipesFilterBySearch.Component"
  );

  const inputSearch = within(searchForm).getByRole("textbox", {
    name: /search for recipes/i,
  });
  const radioName = within(searchForm).getByRole("radio", {
    name: /name/i,
  });
  const radioIngredient = within(searchForm).getByRole("radio", {
    name: /ingredient/i,
  });
  const radioFirstLetter = within(searchForm).getByRole("radio", {
    name: /first letter/i,
  });
  const buttonSubmitSearch = within(searchForm).getByRole("button", {
    name: /search/i,
  });

  return {
    inputSearch,
    radioName,
    radioIngredient,
    radioFirstLetter,
    buttonSubmitSearch,
  };
};

describe("page: Recipes - path: /{recipe}", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("rendering initial recipes state", () => {
    it("renders meals correctly", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(getMealsResponse(meals));

      await lazyLoadPage(["/meals"]);

      await checkIfRendersBaseElements(meals.map(toRecipe), mealCategories);
    });

    it("renders drinks correctly", async () => {
      vi.spyOn(axios, "get").mockResolvedValue(getCocktailsResponse(cocktails));

      await lazyLoadPage(["/drinks"]);

      await checkIfRendersBaseElements(
        cocktails.map(toRecipe),
        cocktailCategories
      );
    });
  });

  it("shows an error element when there is an error", async () => {
    vi.spyOn(axios, "get").mockRejectedValue(new Error());

    renderRoute(["/drinks"], defaultRouteOptions);

    await lazyLoadPageUtils();

    expect(screen.queryByTestId("Recipes.Error")).toBeInTheDocument();
    expect(screen.queryByTestId("Recipes.List")).not.toBeInTheDocument();
  });

  it("shows a search form when clicking the search button in the header", async () => {
    vi.spyOn(axios, "get").mockResolvedValue(getMealsResponse(meals));

    const { user } = await lazyLoadPage(["/meals"]);

    await act(async () => {
      await user.click(uiElements.buttons.search);
    });

    expect(screen.getByTestId("Recipes.RecipesFilterBySearch")).toHaveAttribute(
      "aria-hidden",
      "false"
    );
  });

  it("redirects to its details page when only one recipe is returned", async () => {
    const [firstMeal] = meals;
    vi.spyOn(axios, "get").mockResolvedValue(getMealsResponse([firstMeal]));

    renderRoute(["/meals"], defaultRouteOptions);

    await lazyLoadPageUtils();

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith(firstMeal.idMeal);
  });

  it("shows an alert when none recipe is returned when filtering recipes", async () => {
    const categoryToSearch = mealCategories[0].strCategory;
    const mockAlert = vi.fn();

    vi.spyOn(window, "alert").mockImplementation(mockAlert);
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getMealsResponse(meals))
      .mockResolvedValueOnce(getMealsResponse([]));

    const { user } = await lazyLoadPage(["/meals"]);

    await user.click(screen.getByRole("button", { name: categoryToSearch }));

    await waitFor(() =>
      expect(mockAlert).toHaveBeenCalledWith(
        "Sorry, we haven't found any recipes for these filters."
      )
    );
  });

  it("can get recipes without category filter when clicking the all button", async () => {
    const mealsOnMount = meals.slice(0, 6);
    const mealsAfterClickingAll = meals.slice(6);

    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getMealsResponse(mealsOnMount))
      .mockResolvedValueOnce(getMealsResponse(mealsAfterClickingAll));

    const { user } = await lazyLoadPage(["/meals"]);

    await checkRecipesAreInTheScreen(mealsOnMount.map(toRecipe));

    await user.click(screen.getByRole("button", { name: /all/i }));

    await checkRecipesAreInTheScreen(mealsAfterClickingAll.map(toRecipe));
  });

  it("can filter recipes by category correctly", async () => {
    const category = mealCategories[0].strCategory;
    const mealsFiltered = meals.filter((m) => m.strCategory === category);

    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getMealsResponse(meals))
      .mockResolvedValueOnce(getMealsResponse(mealsFiltered));

    const { user } = await lazyLoadPage(["/meals"]);

    await user.click(screen.getByRole("button", { name: category }));

    await checkRecipesAreInTheScreen(mealsFiltered.map(toRecipe));
  });

  it("can filter recipes by search correctly", async () => {
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getMealsResponse(meals))
      .mockResolvedValueOnce(getMealsResponse([corba]));

    const { user } = await lazyLoadPage(["/meals"]);

    const { radioName, inputSearch, buttonSubmitSearch } =
      await renderSearchForm(user);

    await user.click(radioName);
    await user.type(inputSearch, "corba");
    await user.click(buttonSubmitSearch);

    expect(mockNavigate).toHaveBeenCalledWith(corba.idMeal);
  });

  it("shows an error message when trying to filter by category fails", async () => {
    const category = mealCategories[0].strCategory;

    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getMealsResponse(meals))
      .mockRejectedValueOnce(new Error());

    const { user } = await lazyLoadPage(["/meals"]);

    await user.click(screen.getByRole("button", { name: category }));

    const error = await screen.findByTestId("Recipes.Error");

    within(error).getByRole("heading", {
      level: 3,
      name: /something went wrong/i,
    });
    within(error).getByText(
      new RegExp(
        `there was an error when trying to filter recipes by the category ${category}`,
        "i"
      )
    );
  });

  it("shows an error message when trying to filter by search fails", async () => {
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getMealsResponse(meals))
      .mockRejectedValueOnce(new Error());

    const { user } = await lazyLoadPage(["/meals"]);

    const { radioName, inputSearch, buttonSubmitSearch } =
      await renderSearchForm(user);

    await user.click(radioName);
    await user.type(inputSearch, "corba");
    await user.click(buttonSubmitSearch);

    const error = await screen.findByTestId("Recipes.Error");

    within(error).getByRole("heading", {
      level: 3,
      name: /something went wrong/i,
    });
    within(error).getByText(
      /there was an error when trying to filter recipes by name corba/i
    );
  });
});
