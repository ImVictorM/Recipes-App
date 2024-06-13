import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

import routes from "@/routes";
import { setupStore } from "@/store";

import { ExtendedRenderOptions } from "./common.types";

type RenderRouteOptions = {
  initialRouteIndex?: number;
} & ExtendedRenderOptions;

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
