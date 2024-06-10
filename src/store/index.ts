import { combineReducers, configureStore } from "@reduxjs/toolkit";

import menuSlice from "./slices/menuSlice";
import visibilitySlice from "./slices/visibilitySlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  menu: menuSlice.reducer,
  visibility: visibilitySlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.DEV,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
