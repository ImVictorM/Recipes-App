import { screen, act } from "@testing-library/react";

import RecipeError from "@/pages/ErrorBoundaries/RecipeError";

import renderElement from "../../../utils/render/renderElement";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const RecipesErrorDefault = () => <RecipeError />;

describe("page: RecipeError - ErrorBoundary", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly", () => {
    renderElement(<RecipesErrorDefault />);

    screen.getByRole("heading", { name: /Oops, something went wrong!/i });
    screen.getByRole("button", { name: "Reload" });
    expect(screen.getByTestId("RecipeError.Text")).toHaveTextContent(
      /Something happened when trying to show this page content/
    );
  });

  it("reloads the page when clicking the reload button", async () => {
    const { user } = renderElement(<RecipesErrorDefault />);

    const buttonReload = screen.getByRole("button", { name: "Reload" });

    await act(async () => {
      await user.click(buttonReload);
    });

    expect(mockNavigate).toHaveBeenCalledWith(0);
  });
});
