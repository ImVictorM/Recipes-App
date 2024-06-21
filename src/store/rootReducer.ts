import { combineReducers } from "@reduxjs/toolkit";
import { menu, user, visibility } from "./slices";

const rootReducer = combineReducers({
  user: user.reducer,
  menu: menu.reducer,
  visibility: visibility.reducer,
});

export default rootReducer;
