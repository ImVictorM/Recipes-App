import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";

export const abc: Recipe = {
  type: "drink",
  id: "13501",
  img: "https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg",
  name: "ABC",
};

export const abcWithDetails: RecipeWithDetails = {
  ...abc,
  category: "Shot",
  instructions: "Layered in a shot glass.",
  alcoholic: "Alcoholic",
  ingredientsMeasures: [
    ["Amaretto", "1/3 "],
    ["Baileys irish cream", "1/3 "],
    ["Cognac", "1/3 "],
  ],
  tags: [],
};

export const abcWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate = {
  ...abcWithDetails,
  doneDate: "26/06/2024",
};
