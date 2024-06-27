import { waitFor, screen, act } from "@testing-library/react";

import renderRoute from "../../helpers/render/renderRoute";

import { emailValid, emailInvalid } from "../../mocks/user/email";

import { RenderRouteOptions } from "../../helpers/render/renderRoute/renderRoute.types";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const lazyRenderLogin = async (
  initialRoutes = ["/"],
  options?: RenderRouteOptions
): Promise<ReturnType<typeof renderRoute>> => {
  const render = renderRoute(initialRoutes, options);

  await waitFor(() => screen.getByTestId("Login"), { timeout: 5000 });

  return render;
};

const formControls = {
  get inputEmail() {
    return screen.getByRole("textbox", {
      name: "Enter your email",
    });
  },

  get buttonSubmit() {
    return screen.getByRole("button", {
      name: "Enter",
    });
  },
};

describe("page: Login - path: /", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly", async () => {
    await lazyRenderLogin();

    const formLogin = screen.getByTestId("Login.Form");

    screen.getByRole("heading", { level: 1, name: "Login" });

    expect(formLogin).toContainElement(formControls.inputEmail);
    expect(formLogin).toContainElement(formControls.buttonSubmit);

    expect(formControls.inputEmail).toHaveValue("");
    expect(formControls.buttonSubmit).toBeDisabled();
  });

  it("handles login correctly", async () => {
    const { user, store } = await lazyRenderLogin();

    await act(async () => {
      await user.type(formControls.inputEmail, emailValid);
    });

    expect(formControls.inputEmail).toHaveValue(emailValid);
    expect(formControls.buttonSubmit).toBeEnabled();

    await act(async () => {
      await user.click(formControls.buttonSubmit);
    });

    expect(store.getState().user.email).toBe(emailValid);
    expect(mockNavigate).toHaveBeenCalledWith("/meals");
  });

  it("makes the button disabled when email is not valid", async () => {
    const { user } = await lazyRenderLogin();

    await act(async () => {
      await user.type(formControls.inputEmail, emailInvalid);
    });

    expect(formControls.inputEmail).toHaveValue(emailInvalid);
    expect(formControls.buttonSubmit).not.toBeEnabled();
  });

  it("redirects to previous protected page when user tried to access it at first", async () => {
    const { user } = renderRoute(["/profile"]);

    await waitFor(
      () => expect(screen.queryByTestId("Profile")).not.toBeInTheDocument(),
      { timeout: 5000 }
    );

    await waitFor(() => screen.getByTestId("Login"), { timeout: 5000 });

    await act(async () => {
      await user.type(formControls.inputEmail, emailValid);
    });

    await act(async () => {
      await user.click(formControls.buttonSubmit);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/profile");
  });
});
