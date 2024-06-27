import { screen, waitFor } from "@testing-library/react";

import renderRoute from "../../helpers/render/renderRoute";
import { emailValid } from "../../mocks/user/email";

const protectedRoute = "/profile";

describe("component: RouteAuthRequired", () => {
  it("redirects to login page when user is not authenticated", async () => {
    renderRoute([protectedRoute]);

    await waitFor(() => screen.getByTestId("Login"), { timeout: 5000 });
  });

  it("shows the page when user is authenticated", async () => {
    renderRoute([protectedRoute], {
      preloadedState: { user: { email: emailValid } },
    });

    await waitFor(() => screen.getByTestId("Profile"), { timeout: 5000 });
  });
});
