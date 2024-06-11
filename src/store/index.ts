import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { menu, user, visibility } from "./slices";

const rootReducer = combineReducers({
  user: user.reducer,
  menu: menu.reducer,
  visibility: visibility.reducer,
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
