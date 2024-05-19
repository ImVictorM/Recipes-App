import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { menuSlice, visibilitySlice, userSlice } from "./slices";

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
