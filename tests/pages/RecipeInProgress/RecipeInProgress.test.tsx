import axios from "axios";

import { screen, waitFor, act } from "@testing-library/react";

import renderRoute from "../../utils/render/renderRoute";
import normalizeText from "../../utils/normalizeText";
import extractIngredientsFromRecipe from "../../utils/extractIngredientsFromRecipe";

import getCocktailDetailsByIdResponse from "../../mocks/services/menu/cocktail/getCocktailDetailsByIdResponse";
import getMealDetailsByIdResponse from "../../mocks/services/menu/meal/getMealDetailsByIdResponse";
import { kumpir } from "../../mocks/services/menu/meal/meals";
import { emailValid } from "../../mocks/user/email";
import { ace } from "../../mocks/services/menu/cocktail/cocktails";

import { MenuRecipe } from "@/services/menu/common/types";
import { RenderRouteOptions } from "../../utils/render/renderRoute/renderRoute.types";
import { RecipeInProgress } from "@/store/slices/menu/menuSlice.types";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const checkRecipeRenderInitialBaseElements = (
  recipe: MenuRecipe,
  expectedTotalIngredients: number,
  ingredientsInProgress: string[]
) => {
  const ingredientsInput = screen.getAllByTestId(
    /RecipeInProgress\.Ingredient\d+\.Checkbox$/
  );
  const ingredientsLabel = screen.getAllByTestId(
    /RecipeInProgress\.Ingredient\d+\.Label$/
  );
  const buttonFinish = screen.getByRole("button", { name: /finish recipe/i });

  screen.getByRole("heading", { name: /ingredients/i, level: 2 });
  screen.getByRole("heading", { name: /instructions/i, level: 2 });

  expect(buttonFinish).toBeDisabled();
  expect(ingredientsInput).toHaveLength(expectedTotalIngredients);
  expect(ingredientsLabel).toHaveLength(expectedTotalIngredients);

  let count = 1;

  while (count <= expectedTotalIngredients) {
    const ingredientKey = `strIngredient${count}` as keyof MenuRecipe;
    const measureKey = `strMeasure${count}` as keyof MenuRecipe;

    const checkboxLabel = normalizeText(
      `${recipe[ingredientKey]} ${recipe[measureKey]}`
    );

    const currentIngredientCheckbox = screen.getByLabelText(checkboxLabel);

    const isNotInProgress = ingredientsInProgress.some((i) =>
      new RegExp(i).test(checkboxLabel || "")
    );

    if (isNotInProgress) {
      expect(currentIngredientCheckbox).not.toBeChecked();
    } else {
      expect(currentIngredientCheckbox).toBeChecked();
    }

    count += 1;
  }
};

const lazyRenderPage = async (
  initialRoutes: string[],
  recipesInProgress: RecipeInProgress,
  options: RenderRouteOptions = {
    preloadedState: {
      user: { email: emailValid },
      menu: {
        recipesDone: {},
        recipesFavorite: {},
        recipesInProgress: {
          [emailValid]: recipesInProgress,
        },
      },
    },
  }
) => {
  const render = renderRoute(initialRoutes, options);

  await waitFor(() => screen.getByTestId("RecipeInProgress"), {
    timeout: 5000,
  });

  return render;
};

describe("page: RecipeInProgress - path: /{recipe}/{recipe-id}/in-progress", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a meal with a video correctly", async () => {
    const kumpirIngredients = extractIngredientsFromRecipe(kumpir);

    vi.spyOn(axios, "get").mockResolvedValue(
      getMealDetailsByIdResponse(kumpir)
    );

    await lazyRenderPage([`/meals/${kumpir.idMeal}/in-progress`], {
      meals: { [kumpir.idMeal]: kumpirIngredients },
      drinks: {},
    });

    const video = screen.getByTestId("RecipeInProgress.Video");

    checkRecipeRenderInitialBaseElements(
      kumpir,
      kumpirIngredients.length,
      kumpirIngredients
    );

    expect(video).toHaveAttribute(
      "src",
      kumpir.strYoutube!.replace("watch?v=", "embed/")
    );
  });

  it("renders a drink without a video correctly", async () => {
    const aceIngredients = extractIngredientsFromRecipe(ace);

    vi.spyOn(axios, "get").mockResolvedValue(
      getCocktailDetailsByIdResponse(ace)
    );

    await lazyRenderPage([`/drinks/${ace.idDrink}/in-progress`], {
      meals: {},
      drinks: { [ace.idDrink]: aceIngredients },
    });

    checkRecipeRenderInitialBaseElements(
      ace,
      aceIngredients.length,
      aceIngredients
    );

    expect(
      screen.queryByTestId("RecipeInProgress.Video")
    ).not.toBeInTheDocument();
  });

  it("navigates to recipe details if recipe is not in progress", async () => {
    vi.spyOn(axios, "get").mockResolvedValue(
      getCocktailDetailsByIdResponse(ace)
    );

    await lazyRenderPage([`/drinks/${ace.idDrink}/in-progress`], {
      meals: {},
      drinks: {},
    });

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith(`/drinks/${ace.idDrink}`);
  });

  it("changes the global state correctly when clicking an ingredient checkbox", async () => {
    const [firstIngredient] = extractIngredientsFromRecipe(ace);

    vi.spyOn(axios, "get").mockResolvedValue(
      getCocktailDetailsByIdResponse(ace)
    );

    const { user, store } = await lazyRenderPage(
      [`/drinks/${ace.idDrink}/in-progress`],
      {
        meals: {},
        drinks: { [ace.idDrink]: [firstIngredient] },
      }
    );

    const firstIngredientCheckbox = screen.getByLabelText(
      new RegExp(`${firstIngredient}`)
    );

    expect(firstIngredientCheckbox).not.toBeChecked();

    await act(async () => {
      await user.click(firstIngredientCheckbox);
    });

    expect(firstIngredientCheckbox).toBeChecked();
    expect(
      store.getState().menu.recipesInProgress[emailValid].drinks[ace.idDrink]
    ).toEqual([]);
  });

  it("enables the finish recipe button when all ingredients are checked", async () => {
    const aceIngredients = extractIngredientsFromRecipe(ace);

    vi.spyOn(axios, "get").mockResolvedValue(
      getCocktailDetailsByIdResponse(ace)
    );

    const { user, store } = await lazyRenderPage(
      [`/drinks/${ace.idDrink}/in-progress`],
      {
        meals: {},
        drinks: { [ace.idDrink]: aceIngredients },
      }
    );

    const checkboxIngredients = screen.getAllByTestId(
      /RecipeInProgress\.Ingredient\d+\.Checkbox/
    );

    for (const checkbox of checkboxIngredients) {
      expect(checkbox).not.toBeChecked();

      await act(async () => {
        await user.click(checkbox);
      });

      expect(checkbox).toBeChecked();
    }

    expect(
      screen.getByRole("button", { name: /finish recipe/i })
    ).toBeEnabled();
    expect(
      store.getState().menu.recipesInProgress[emailValid].drinks[ace.idDrink]
    ).toEqual([]);
  });

  it("can finish a recipe correctly", async () => {
    vi.spyOn(axios, "get").mockResolvedValue(
      getCocktailDetailsByIdResponse(ace)
    );

    const { user, store } = await lazyRenderPage(
      [`/drinks/${ace.idDrink}/in-progress`],
      {
        meals: {},
        drinks: { [ace.idDrink]: [] },
      }
    );

    const finishButton = screen.getByRole("button", {
      name: /finish recipe/i,
    });

    await act(async () => {
      await user.click(finishButton);
    });

    expect(
      store.getState().menu.recipesInProgress[emailValid].drinks[ace.idDrink]
    ).toBeUndefined();
    expect(
      store
        .getState()
        .menu.recipesDone[emailValid].findIndex((r) => r.id === ace.idDrink)
    ).not.toBe(-1);
    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith("/done-recipes");
  });
});
