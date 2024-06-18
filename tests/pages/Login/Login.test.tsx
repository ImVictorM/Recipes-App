import renderRoute from "../../utils/render/renderRoute";

import { RenderRouteOptions } from "../../utils/render/renderRoute/renderRoute.types";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const lazyRenderLoading = async (
  initialRoutes = ["/"],
  options?: RenderRouteOptions
) => {
  const render = renderRoute(initialRoutes, options);
  const { screen, waitForElementToBeRemoved } = render;

  if (screen.queryByTestId("Login")) return render;

  const loading = await screen.findByTestId("Loading");

  await waitForElementToBeRemoved(loading);

  return render;
};

const emailValid = "email@email.com";
const emailInvalid = "email";

describe("page: Login - path: /", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly", async () => {
    const { screen, within } = await lazyRenderLoading();

    const formLogin = screen.getByTestId("Login.Form");
    const inputEmail = within(formLogin).getByRole("textbox", {
      name: "Enter your email",
    });
    const buttonSubmit = within(formLogin).getByRole("button", {
      name: "Enter",
    });

    screen.getByRole("heading", { level: 1, name: "Login" });
    expect(inputEmail).toHaveValue("");
    expect(buttonSubmit).toBeDisabled();
  });

  it("handles login correctly", async () => {
    const { screen, user, act, store } = await lazyRenderLoading();

    const inputEmail = screen.getByRole("textbox", {
      name: "Enter your email",
    });
    const buttonSubmit = screen.getByRole("button", {
      name: "Enter",
    });

    await act(async () => {
      await user.type(inputEmail, emailValid);
    });

    expect(inputEmail).toHaveValue(emailValid);
    expect(buttonSubmit).toBeEnabled();

    await act(async () => {
      await user.click(buttonSubmit);
    });

    expect(store.getState().user.email).toBe(emailValid);
    expect(mockNavigate).toHaveBeenCalledWith("/meals");
  });

  it("makes the button disabled when email is not valid", async () => {
    const { screen, user, act } = await lazyRenderLoading();

    const inputEmail = screen.getByRole("textbox", {
      name: "Enter your email",
    });
    const buttonSubmit = screen.getByRole("button", {
      name: "Enter",
    });

    await act(async () => {
      await user.type(inputEmail, emailInvalid);
    });

    expect(inputEmail).toHaveValue(emailInvalid);
    expect(buttonSubmit).not.toBeEnabled();
  });
});
