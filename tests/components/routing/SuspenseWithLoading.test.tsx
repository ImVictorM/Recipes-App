import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { screen, waitFor, render } from "@testing-library/react";

import SuspenseWithLoading from "@/components/routing/SuspenseWithLoading";

type MockLazyComponentType = {
  default: React.ComponentType;
};

const MockLazyComponent = React.lazy(() => {
  return new Promise<MockLazyComponentType>((resolve) =>
    setTimeout(
      () =>
        resolve({
          default: () => (
            <div data-testid="MockLazyComponent">ZZzzzzZZzz..</div>
          ),
        }),
      500
    )
  );
});

describe("component: SuspenseWithLoading", () => {
  it("shows loading while component is being loaded", async () => {
    const router = createMemoryRouter(
      [
        {
          element: <SuspenseWithLoading />,
          children: [
            {
              path: "/",
              element: <MockLazyComponent />,
            },
          ],
        },
      ],
      {
        initialEntries: ["/"],
      }
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId("Loading"), { timeout: 5000 });
    await waitFor(() => screen.getByTestId("MockLazyComponent"), {
      timeout: 5000,
    });
    screen.getByText(/zzzzzzz/i);
  });
});
