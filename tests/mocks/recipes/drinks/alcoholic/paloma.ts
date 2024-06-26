import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";

export const paloma: Recipe = {
  type: "drink",
  id: "17253",
  img: "https://www.thecocktaildb.com/images/media/drink/samm5j1513706393.jpg",
  name: "Paloma",
};

export const palomaWithDetails: RecipeWithDetails = {
  ...paloma,
  category: "Cocktail",
  instructions: "Stir together and serve over ice.",
  alcoholic: "Alcoholic",
  ingredientsMeasures: [
    ["Grape Soda", "3 oz"],
    ["Tequila", "1 1/2 oz"],
  ],
  tags: [],
};

export const palomaWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate = {
  ...palomaWithDetails,
  doneDate: "26/06/2024",
};
