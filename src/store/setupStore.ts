import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { RootState } from "./types";

const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.DEV,
    preloadedState,
  });
};

export default setupStore;
