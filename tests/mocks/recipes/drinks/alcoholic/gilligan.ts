import formatDateToDDMMYYYY from "@/utils/formatDateToDDMMYYYY";

import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";

export const gilligan: Recipe = {
  type: "drink",
  id: "16943",
  img: "https://www.thecocktaildb.com/images/media/drink/wysqut1461867176.jpg",
  name: "A Gilligan's Island",
};

export const gilliganWithDetails: RecipeWithDetails = {
  ...gilligan,
  category: "Cocktail",
  instructions: "Shaken, not stirred!",
  alcoholic: "Alcoholic",
  ingredientsMeasures: [
    ["Vodka", "1 oz "],
    ["Peach schnapps", "1 oz "],
    ["Orange juice", "3 oz "],
    ["Cranberry juice", "3 oz "],
  ],
  tags: [],
};

export const gilliganWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate = {
  ...gilliganWithDetails,
  doneDate: formatDateToDDMMYYYY(new Date()),
};
