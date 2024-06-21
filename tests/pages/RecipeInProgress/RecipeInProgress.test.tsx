import axios from "axios";

import { screen, waitFor } from "@testing-library/react";

import renderRoute from "../../utils/render/renderRoute";
import normalizeText from "../../utils/normalizeText";
import extractIngredientsFromRecipe from "../../utils/extractIngredientsFromRecipe";

import getMealDetailsByIdResponse from "../../mocks/services/menu/meal/getMealDetailsByIdResponse";
import { kumpir } from "../../mocks/services/menu/meal/meals";
import { emailValid } from "../../mocks/user/email";

import { MenuRecipe } from "@/services/menu/common/types";
import { RenderRouteOptions } from "../../utils/render/renderRoute/renderRoute.types";
import { RecipeInProgress } from "@/store/slices/menu/menuSlice.types";

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

  let index = 0;
  let count = 1;

  while (count <= expectedTotalIngredients) {
    const ingredientKey = `strIngredient${count}` as keyof MenuRecipe;
    const measureKey = `strMeasure${count}` as keyof MenuRecipe;

    const expectedTextContent = `${recipe[ingredientKey]} ${recipe[measureKey]}`;

    const currentIngredientCheckbox = screen.getByTestId(
      `RecipeInProgress.Ingredient${index}.Checkbox`
    );
    const currentIngredientLabel = screen.getByTestId(
      `RecipeInProgress.Ingredient${index}.Label`
    );

    expect(currentIngredientLabel).toHaveTextContent(
      normalizeText(expectedTextContent)
    );
    const isNotInProgress = ingredientsInProgress.some((i) =>
      new RegExp(i).test(currentIngredientLabel.textContent || "")
    );

    if (isNotInProgress) {
      expect(currentIngredientCheckbox).not.toBeChecked();
    } else {
      expect(currentIngredientCheckbox).toBeChecked();
    }

    index += 1;
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
  afterEach(() => {
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

  it("renders a drink without a video correctly", async () => {});

  it("enables the finish recipe button when all ingredients are checked and finish a recipe correctly ", async () => {});
});
