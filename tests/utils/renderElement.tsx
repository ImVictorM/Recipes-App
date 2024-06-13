import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { setupStore } from "@/store";
import { ExtendedRenderOptions } from "./common.types";

export default function renderElement(
  element: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: React.PropsWithChildren) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  return {
    user: userEvent.setup(),
    store,
    ...render(element, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}
