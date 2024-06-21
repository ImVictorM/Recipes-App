import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { render } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import setupStore from "@/store/setupStore";
import { ExtendedRenderOptions } from "../common/types";

export default function renderElement(
  element: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: React.PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  const testPath = "/testing-element";

  const testRouter = createMemoryRouter(
    [
      {
        path: testPath,
        element: element,
      },
    ],
    {
      initialEntries: [testPath],
    }
  );

  return {
    user: userEvent.setup(),
    store,
    ...render(<RouterProvider router={testRouter} />, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}
