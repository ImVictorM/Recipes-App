import { screen, act } from "@testing-library/react";

import RecipesFilterByCategory from "@/pages/Recipes/components/RecipesFilterByCategory";

import * as useScrollLinearManual from "@/hooks/useScrollLinearManual";

import renderElement from "../../../utils/render/renderElement";
import categories from "../../../mocks/services/menu/categories";

const mockOnFilterByAll = vi.fn();
const mockOnFilterByCategory = vi.fn();

vi.mock("@/hooks/useScrollLinearManual", () => {
  return {
    default: () => ({
      isAtEnd: false,
      isAtStart: true,
      scrollTo: () => vi.fn(),
    }),
  };
});

const RecipesFilterByCategoryDefault = (
  props: Partial<React.ComponentProps<typeof RecipesFilterByCategory>>
) => (
  <RecipesFilterByCategory
    prefixDataTestId="Component"
    onFilterByAll={mockOnFilterByAll}
    onFilterByCategory={mockOnFilterByCategory}
    categories={categories}
    {...props}
  />
);

describe("page: Recipes - component: RecipesFilterByCategory", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly", () => {
    renderElement(<RecipesFilterByCategoryDefault />);

    expect(screen.getByRole("button", { name: /all/i })).toBeEnabled();
    expect(screen.getByTestId("Component.ButtonScrollRight")).toBeEnabled();
    expect(
      screen.queryByTestId("Component.ButtonScrollLeft")
    ).not.toBeInTheDocument();

    for (const { strCategory: category } of categories) {
      expect(screen.getByRole("button", { name: category })).toBeEnabled();
    }
  });

  it("renders both scroll controls when scroll is not at the end or at the start", () => {
    const mockScrollTo = vi.fn();

    vi.spyOn(useScrollLinearManual, "default").mockReturnValue({
      isAtEnd: false,
      isAtStart: false,
      scrollTo: mockScrollTo,
    });

    renderElement(<RecipesFilterByCategoryDefault />);

    screen.getByTestId("Component.ButtonScrollRight");
    screen.getByTestId("Component.ButtonScrollLeft");
  });

  it("handles the scroll right correctly", async () => {
    const mockScrollTo = vi.fn();

    vi.spyOn(useScrollLinearManual, "default").mockReturnValue({
      isAtEnd: false,
      isAtStart: true,
      scrollTo: mockScrollTo,
    });

    const { user } = renderElement(<RecipesFilterByCategoryDefault />);

    const buttonScrollRight = screen.getByTestId("Component.ButtonScrollRight");

    await act(async () => {
      await user.click(buttonScrollRight);
    });

    expect(
      screen.queryByTestId("Component.ButtonScrollLeft")
    ).not.toBeInTheDocument();
    expect(mockScrollTo).toHaveBeenCalledOnce();
    expect(mockScrollTo).toHaveBeenCalledWith("right");
  });

  it("handles the scroll left correctly", async () => {
    const mockScrollTo = vi.fn();

    vi.spyOn(useScrollLinearManual, "default").mockReturnValue({
      isAtEnd: true,
      isAtStart: false,
      scrollTo: mockScrollTo,
    });

    const { user } = renderElement(<RecipesFilterByCategoryDefault />);

    const buttonScrollLeft = screen.getByTestId("Component.ButtonScrollLeft");

    await act(async () => {
      await user.click(buttonScrollLeft);
    });

    expect(
      screen.queryByTestId("Component.ButtonScrollRight")
    ).not.toBeInTheDocument();
    expect(mockScrollTo).toHaveBeenCalledOnce();
    expect(mockScrollTo).toHaveBeenCalledWith("left");
  });

  it("calls the onFilterByAll handler correctly", async () => {
    const { user } = renderElement(<RecipesFilterByCategoryDefault />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /all/i }));
    });

    expect(mockOnFilterByAll).toHaveBeenCalledOnce();
  });

  it("calls the onFilterByCategory handler correctly", async () => {
    const { strCategory: category } = categories[0];
    const { user } = renderElement(<RecipesFilterByCategoryDefault />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: category }));
    });

    expect(mockOnFilterByCategory).toHaveBeenCalledOnce();
    expect(mockOnFilterByCategory).toHaveBeenCalledWith(category);
  });
});
