import { waitFor, screen } from "@testing-library/react";

import renderRoute from "../../utils/render/renderRoute";

import { emailValid } from "../../mocks/user/email";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const lazyRenderProfile = async () => {
  const render = renderRoute(["/profile"], {
    preloadedState: { user: { email: emailValid } },
  });

  await waitFor(() => screen.getByTestId("Profile"), { timeout: 5000 });

  return render;
};

const profile = {
  links: {
    get recipesDone() {
      return screen.getByRole("link", { name: /done recipes/i });
    },
    get recipesFavorite() {
      return screen.getByRole("link", { name: /favorite recipes/i });
    },
  },
  buttons: {
    get logout() {
      return screen.getByRole("button", { name: /logout/i });
    },
  },
};

describe("page: Profile - path: /profile", () => {
  afterEach(() => {
    vi.resetModules();
  });

  it("renders correctly", async () => {
    await lazyRenderProfile();

    screen.getByRole("heading", { level: 1, name: /profile/i });

    expect(profile.links.recipesDone).toHaveAttribute("href", "/done-recipes");
    expect(profile.links.recipesFavorite).toHaveAttribute(
      "href",
      "/favorite-recipes"
    );
    expect(profile.buttons.logout).toBeEnabled();
  });

  it("removes the user from global storage and redirects to / when clicking the logout button", async () => {
    const { user, store } = await lazyRenderProfile();

    await user.click(profile.buttons.logout);

    expect(store.getState().user.email).toBeFalsy();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
