import * as reactRouterDom from "react-router-dom";
import { screen, act } from "@testing-library/react";

import RecipeError from "@/pages/ErrorBoundaries/RecipeError";

import renderElement from "../../../helpers/render/renderElement";

const mockNavigate = vi.fn();
const mockRouteError = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    isRouteErrorResponse: () => false,
    useNavigate: () => mockNavigate,
    useRouteError: () => mockRouteError,
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

  it("renders correctly when there is a route error", () => {
    vi.spyOn(reactRouterDom, "isRouteErrorResponse").mockImplementation(
      () => true
    );
    vi.spyOn(reactRouterDom, "useRouteError").mockImplementation(() => ({
      status: 404,
      statusText: "NOT_FOUND",
    }));

    renderElement(<RecipesErrorDefault />);

    screen.getByText("Error code: 404 - NOT_FOUND");
  });
});
