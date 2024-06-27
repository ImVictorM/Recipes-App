import visibilitySlice from "./visibilitySlice";

export default visibilitySlice;

export const { toggleSearchBarVisibility } = visibilitySlice.actions;

export const { selectVisibility } = visibilitySlice.selectors;
