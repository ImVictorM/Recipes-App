import React from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";

import routes from "@/routing/routes";
import setupStore from "@/store/setupStore";

import { RenderRouteOptions } from "./renderRoute.types";

export default function renderRoute(
  initialRoutes: string[],
  {
    initialRouteIndex = 0,
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: RenderRouteOptions = {}
) {
  function Wrapper({ children }: React.PropsWithChildren) {
    return (
      <React.Suspense>
        <Provider store={store}>{children}</Provider>
      </React.Suspense>
    );
  }

  const routerTest = createMemoryRouter(routes, {
    initialEntries: initialRoutes,
    initialIndex: initialRouteIndex,
  });

  return {
    user: userEvent.setup(),
    store: store,
    ...render(<RouterProvider router={routerTest} />, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}
