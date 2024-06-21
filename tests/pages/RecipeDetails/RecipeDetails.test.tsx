import axios from "axios";
import { waitFor, screen, act } from "@testing-library/react";

import renderRoute from "../../utils/render/renderRoute";
import normalizeText from "../../utils/normalizeText";

import getMealDetailsByIdResponse from "../../mocks/services/menu/meal/getMealDetailsByIdResponse";
import getCocktailDetailsByIdResponse from "../../mocks/services/menu/cocktail/getCocktailDetailsByIdResponse";
import getCocktailsResponse from "../../mocks/services/menu/cocktail/getCocktailsResponse";
import getMealsResponse from "../../mocks/services/menu/meal/getMealsResponse";
import { abc, cocktails } from "../../mocks/services/menu/cocktail/cocktails";
import { corba, meals } from "../../mocks/services/menu/meal/meals";
import { emailValid } from "../../mocks/user/email";

import { MenuRecipe } from "@/services/menu/common/types";
import { RenderRouteOptions } from "../../utils/render/renderRoute/renderRoute.types";
import toRecipeWithDetails from "@/utils/mappings/recipe/toRecipeWithDetails";
import formatDateToDDMMYYYY from "@/utils/formatDateToDDMMYYYY";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const checkRecipeRendersInitialBaseElements = (
  recipe: MenuRecipe,
  expectedIngredientsCount: number,
  expectedRecommendationsLength?: number
) => {
  const ingredients = screen.getAllByTestId(/RecipeDetails\.Ingredient/);
  const instructions = screen.getByTestId("RecipeDetails.Instructions");

  const buttonContinue = screen.queryByRole("button", {
    name: /continue recipe/i,
  });

  screen.getByRole("heading", { level: 2, name: /ingredients/i });
  screen.getByRole("heading", { level: 2, name: /instructions/i });
  screen.getByRole("button", { name: /start recipe/i });

  expect(buttonContinue).not.toBeInTheDocument();

  expect(instructions).toHaveTextContent(normalizeText(recipe.strInstructions));
  expect(ingredients).toHaveLength(expectedIngredientsCount);

  if (expectedRecommendationsLength) {
    const recommendations = screen.getAllByTestId(
      /RecipeDetails\.Recommendations\.Item\d+$/
    );

    expect(recommendations).toHaveLength(expectedRecommendationsLength);
  }

  let index = 0;
  let count = 1;

  while (count <= expectedIngredientsCount) {
    const ingredientKey = `strIngredient${count}` as keyof MenuRecipe;
    const measureKey = `strMeasure${count}` as keyof MenuRecipe;

    const expectedTextContent = `${recipe[ingredientKey]} ${recipe[measureKey]}`;

    expect(ingredients[index]).toHaveTextContent(
      normalizeText(expectedTextContent)
    );

    index += 1;
    count += 1;
  }
};

const renderAndWaitForPageToLoad = async (
  initialRoutes: string[],
  options: RenderRouteOptions = {
    preloadedState: { user: { email: emailValid } },
  }
) => {
  const render = renderRoute(initialRoutes, options);

  await waitFor(() => screen.getByTestId("RecipeDetails"), {
    timeout: 5000,
  });

  await waitFor(() => screen.getAllByTestId("RecipeDetails.Recommendations"), {
    timeout: 5000,
  });

  return render;
};

/** corba has 13 ingredients/measures */
const expectedCorbaIngredientsCount = 13;
const expectedCorbaRecommendationsLength = cocktails.length;
/** abc has 3 ingredients/measures */
const expectedAbcIngredientsCount = 3;
const expectedAbcRecommendationsLength = meals.length;

describe("page: RecipeDetails - path: /{recipe}/{recipe-id}", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a meal correctly", async () => {
    const drinks = cocktails;
    /** Corba has 13 ingredients/measures */

    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getMealDetailsByIdResponse(corba))
      .mockResolvedValueOnce(getCocktailsResponse(drinks));

    await renderAndWaitForPageToLoad([`/meals/${corba.idMeal}`]);

    checkRecipeRendersInitialBaseElements(
      corba,
      expectedCorbaIngredientsCount,
      expectedCorbaRecommendationsLength
    );

    const video = screen.getByTestId("RecipeDetails.Video");

    screen.getByRole("heading", { level: 3, name: /recommended drinks/i });

    expect(video).toHaveAttribute(
      "src",
      corba.strYoutube!.replace("watch?v=", "embed/")
    );
  });

  it("renders an alcoholic drink correctly", async () => {
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getCocktailDetailsByIdResponse(abc))
      .mockResolvedValueOnce(getMealsResponse(meals));

    await renderAndWaitForPageToLoad([`/drinks/${abc.idDrink}`]);

    checkRecipeRendersInitialBaseElements(
      abc,
      expectedAbcIngredientsCount,
      expectedAbcRecommendationsLength
    );

    screen.getByRole("heading", { level: 3, name: /recommended food/i });

    expect(screen.queryByTestId("RecipeDetails.Video")).not.toBeInTheDocument();
  });

  it("can start a recipe correctly", async () => {
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getCocktailDetailsByIdResponse(abc))
      .mockResolvedValueOnce(getMealsResponse(meals));

    const { user, store } = await renderAndWaitForPageToLoad([
      `/drinks/${abc.idDrink}`,
    ]);

    const buttonStart = screen.getByRole("button", { name: /start recipe/i });

    await act(async () => {
      await user.click(buttonStart);
    });

    const drinksInProgress =
      store.getState().menu.recipesInProgress[emailValid]?.drinks[
        abc.idDrink
      ] || null;

    expect(mockNavigate).toHaveBeenCalledWith("in-progress");
    expect(drinksInProgress).not.toBeNull();
    expect(drinksInProgress).toEqual([
      "Amaretto",
      "Baileys irish cream",
      "Cognac",
    ]);
  });

  it("renders and can continue recipe already in progress correctly", async () => {
    const preloadedState = {
      user: { email: emailValid },
      menu: {
        recipesDone: {},
        recipesFavorite: {},
        recipesInProgress: {
          [emailValid]: {
            drinks: {
              [abc.idDrink]: ["Amaretto"],
            },
            meals: {},
          },
        },
      },
    };

    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getCocktailDetailsByIdResponse(abc))
      .mockResolvedValueOnce(getMealsResponse(meals));

    const { user } = await renderAndWaitForPageToLoad(
      [`/drinks/${abc.idDrink}`],
      {
        preloadedState,
      }
    );

    const buttonContinue = screen.getByRole("button", {
      name: /continue recipe/i,
    });
    const buttonStart = screen.queryByRole("button", { name: /start recipe/i });

    await act(async () => {
      await user.click(buttonContinue);
    });

    expect(buttonStart).not.toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith("in-progress");
  });

  it("renders correctly when the recipe is already done", async () => {
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getCocktailDetailsByIdResponse(abc))
      .mockResolvedValueOnce(getMealsResponse(meals));

    await renderAndWaitForPageToLoad([`/drinks/${abc.idDrink}`], {
      preloadedState: {
        user: { email: emailValid },
        menu: {
          recipesDone: {
            [emailValid]: [
              {
                ...toRecipeWithDetails(abc),
                doneDate: formatDateToDDMMYYYY(new Date()),
              },
            ],
          },
          recipesFavorite: {},
          recipesInProgress: {},
        },
      },
    });

    const buttonContinue = screen.queryByRole("button", {
      name: /continue recipe/i,
    });

    const buttonStart = screen.queryByRole("button", {
      name: /start recipe/i,
    });

    expect(buttonContinue).not.toBeInTheDocument();
    expect(buttonStart).not.toBeInTheDocument();
  });

  it("shows an error message when it is not possible to load the recommendations", async () => {
    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getCocktailDetailsByIdResponse(abc))
      .mockRejectedValueOnce(new Error());

    renderRoute([`/drinks/${abc.idDrink}`], {
      preloadedState: { user: { email: emailValid } },
    });

    await waitFor(() => screen.getByTestId("RecipeDetails"), {
      timeout: 5000,
    });

    await waitFor(() =>
      screen.getByTestId("RecipeDetails.Recommendations.Error")
    );

    checkRecipeRendersInitialBaseElements(abc, expectedAbcIngredientsCount);

    const error = screen.getByTestId("RecipeDetails.Recommendations.Error");
    const expectedErrorText =
      /There was an error trying to load the recommendations/;

    expect(error).toHaveTextContent(expectedErrorText);
  });
});
