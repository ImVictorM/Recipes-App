import { waitFor, screen, act } from "@testing-library/react";

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

describe("page: Profile - path: /profile", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders correctly", async () => {
    await lazyRenderProfile();

    screen.getByRole("heading", { level: 1, name: /profile/i });
    screen.getByRole("link", { name: /done recipes/i });
    screen.getByRole("link", { name: /favorite recipes/i });
    screen.getByRole("button", { name: /logout/i });
  });

  it("removes the user from global storage and redirects to / when clicking the logout button", async () => {
    const { user, store } = await lazyRenderProfile();

    const logoutButton = screen.getByRole("button", { name: /logout/i });

    await act(async () => {
      await user.click(logoutButton);
    });

    expect(store.getState().user.email).toBeFalsy();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
