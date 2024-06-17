import { within } from "@testing-library/dom";

import RecipesEmptyByType from "@/components/ui/RecipesEmptyByType";
import renderElement from "../../utils/render/renderElement";

const RecipeEmptyByTypeDefault = (
  props: Partial<React.ComponentProps<typeof RecipesEmptyByType>>
) => <RecipesEmptyByType action="favorite" type="drink" {...props} />;

describe("component: RecipeEmptyByType", () => {
  it("renders correctly when type is drink", () => {
    const { container } = renderElement(<RecipeEmptyByTypeDefault />);

    const linkToDrinks = within(container).getByRole("link", {
      name: "Search for drinks",
    });

    within(container).getByRole("heading", {
      name: /You haven't favorite any drinks yet/,
    });
    expect(linkToDrinks).toHaveAttribute("href", "/drinks");
  });

  it("renders correctly when type is meal", () => {
    const { container } = renderElement(
      <RecipeEmptyByTypeDefault type="meal" />
    );

    const linkToMeals = within(container).getByRole("link", {
      name: "Search for meals",
    });

    within(container).getByRole("heading", {
      name: /You haven't favorite any food yet/,
    });

    expect(linkToMeals).toHaveAttribute("href", "/meals");
  });

  it("renders correctly when type is all", () => {
    const { container } = renderElement(
      <RecipeEmptyByTypeDefault type="all" />
    );

    const linkToMeals = within(container).getByRole("link", {
      name: "Search for meals",
    });
    const linkToDrinks = within(container).getByRole("link", {
      name: "Search for drinks",
    });

    within(container).getByRole("heading", {
      name: /You haven't favorite any recipes yet/,
    });

    expect(linkToMeals).toHaveAttribute("href", "/meals");
    expect(linkToDrinks).toHaveAttribute("href", "/drinks");
  });
});
