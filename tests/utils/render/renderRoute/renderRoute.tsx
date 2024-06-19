import React from "react";
import {
  render,
  screen,
  within,
  act,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

import routes from "@/routing/routes";
import { setupStore } from "@/store";

import { RenderRouteOptions } from "./renderRoute.types";

function filterRoutesRelevant(
  routes: RouteObject[],
  initialRoutes: string[]
): RouteObject[] {
  return routes.reduce((acc, route) => {
    if (initialRoutes.includes(route.path || "") || route.path === "*") {
      return [...acc, route];
    } else if (route.children) {
      const filteredChildren = filterRoutesRelevant(
        route.children,
        initialRoutes
      );

      if (filteredChildren.length > 0) {
        return [...acc, { ...route, children: filteredChildren }];
      }
    }
    return acc;
  }, [] as RouteObject[]);
}

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
    return <Provider store={store}>{children}</Provider>;
  }

  const routesTest = filterRoutesRelevant(routes, initialRoutes);

  const routerTest = createMemoryRouter(routesTest, {
    initialEntries: initialRoutes,
    initialIndex: initialRouteIndex,
  });

  return {
    user: userEvent.setup(),
    store: store,
    screen,
    within,
    waitFor,
    waitForElementToBeRemoved,
    act,
    ...render(<RouterProvider router={routerTest} />, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}
