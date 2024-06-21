import { RenderOptions } from "@testing-library/react";

import { AppStore, RootState } from "@/store/types";

export type ExtendedRenderOptions = {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
} & Omit<RenderOptions, "queries">;
