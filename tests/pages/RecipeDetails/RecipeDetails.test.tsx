import axios from "axios";
import { waitFor, screen } from "@testing-library/react";

import renderRoute from "../../utils/render/renderRoute";
import normalizeText from "../../utils/normalizeText";

import getMealDetailsByIdResponse from "../../mocks/services/menu/meals/getMealDetailsByIdResponse";
import getCocktailsResponse from "../../mocks/services/menu/cocktail/getCocktailsResponse";
import { corba } from "../../mocks/services/menu/meals/meals";
import cocktails from "../../mocks/services/menu/cocktail/cocktails";
import { emailValid } from "../../mocks/user/email";

import { Meal } from "@/services/menu/meal/types";

describe("page: RecipeDetails - path: /{recipe}/{recipe-id}", () => {
  it("renders a meal correctly", async () => {
    const drinks = cocktails;

    /** Corba has 13 ingredients/measures */
    const expectedIngredientsCount = 13;

    vi.spyOn(axios, "get")
      .mockResolvedValueOnce(getMealDetailsByIdResponse(corba))
      .mockResolvedValueOnce(getCocktailsResponse(drinks));

    renderRoute([`/meals/${corba.idMeal}`], {
      preloadedState: { user: { email: emailValid } },
    });

    await waitFor(() => screen.getByTestId("RecipeDetails"), {
      timeout: 5000,
    });

    await waitFor(
      () => screen.getAllByTestId("RecipeDetails.Recommendations"),
      { timeout: 5000 }
    );

    const ingredients = screen.getAllByTestId(/RecipeDetails\.Ingredient/);
    const instructions = screen.getByTestId("RecipeDetails.Instructions");
    const video = screen.getByTestId("RecipeDetails.Video");
    const recommendations = screen.getAllByTestId(
      /RecipeDetails\.Recommendations\.Item\d+$/
    );

    screen.getByRole("heading", { level: 2, name: /ingredients/i });
    screen.getByRole("heading", { level: 2, name: /instructions/i });
    screen.getByRole("heading", { level: 3, name: /recommended drinks/i });
    screen.getByRole("button", { name: /start recipe/i });

    expect(
      screen.queryByRole("button", { name: /continue recipe/i })
    ).not.toBeInTheDocument();
    expect(video).toHaveAttribute(
      "src",
      corba.strYoutube!.replace("watch?v=", "embed/")
    );

    expect(instructions).toHaveTextContent(
      normalizeText(corba.strInstructions)
    );
    expect(ingredients).toHaveLength(expectedIngredientsCount);
    expect(recommendations).toHaveLength(drinks.length);

    let index = 0;
    let count = 1;

    while (count <= expectedIngredientsCount) {
      const ingredientKey = `strIngredient${count}` as keyof Meal;
      const measureKey = `strMeasure${count}` as keyof Meal;

      const expectedTextContent = `${corba[ingredientKey]} ${corba[measureKey]}`;

      expect(ingredients[index]).toHaveTextContent(expectedTextContent.trim());

      index += 1;
      count += 1;
    }
  });

  it("renders a drink correctly", async () => {});
});
