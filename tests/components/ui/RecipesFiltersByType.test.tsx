import { screen, within } from "@testing-library/dom";

import RecipesFilterByType from "@/components/ui/RecipesFilterByType";

import renderElement from "../../utils/render/renderElement";

const RecipesFilterByTypeDefault = (
  props: Partial<React.ComponentProps<typeof RecipesFilterByType>>
) => <RecipesFilterByType onFilterByType={() => {}} {...props} />;

const filterButtons = {
  get all() {
    return screen.getByTestId("RecipeFiltersByType.ButtonAll");
  },

  get meal() {
    return screen.getByTestId("RecipeFiltersByType.ButtonMeal");
  },

  get drink() {
    return screen.getByTestId("RecipeFiltersByType.ButtonDrink");
  },
};

describe("component: RecipeFiltersByType", () => {
  it("renders correctly", () => {
    renderElement(<RecipesFilterByTypeDefault />);

    within(filterButtons.all).getByTestId("RecipeFiltersByType.ButtonAll.Img");
    expect(
      within(filterButtons.all).getByTestId(
        "RecipeFiltersByType.ButtonAll.Text"
      )
    ).toHaveTextContent("All");

    within(filterButtons.meal).getByTestId(
      "RecipeFiltersByType.ButtonMeal.Img"
    );
    expect(
      within(filterButtons.meal).getByTestId(
        "RecipeFiltersByType.ButtonMeal.Text"
      )
    ).toHaveTextContent("Food");

    within(filterButtons.drink).getByTestId(
      "RecipeFiltersByType.ButtonDrink.Img"
    );
    expect(
      within(filterButtons.drink).getByTestId(
        "RecipeFiltersByType.ButtonDrink.Text"
      )
    ).toHaveTextContent("Drinks");
  });

  it("calls the onFilterByType handler with the right parameter", async () => {
    const onFilterByTypeMock = vi.fn();

    const { user } = renderElement(
      <RecipesFilterByTypeDefault onFilterByType={onFilterByTypeMock} />
    );

    await user.click(filterButtons.all);
    expect(onFilterByTypeMock).toHaveBeenCalledWith("all");

    await user.click(filterButtons.meal);
    expect(onFilterByTypeMock).toHaveBeenCalledWith("meal");

    await user.click(filterButtons.drink);
    expect(onFilterByTypeMock).toHaveBeenCalledWith("drink");

    expect(onFilterByTypeMock).toHaveBeenCalledTimes(3);
  });
});
