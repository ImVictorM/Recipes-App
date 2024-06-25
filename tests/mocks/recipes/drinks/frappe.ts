import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";
import formatDateToDDMMYYYY from "@/utils/formatDateToDDMMYYYY";

export const frappe: Recipe = {
  id: "12768",
  img: "https://www.thecocktaildb.com/images/media/drink/vqwryq1441245927.jpg",
  name: "Frappé",
  type: "drink",
};

export const frappeWithDetails: RecipeWithDetails = {
  ...frappe,
  category: "Coffee / Tea",
  instructions:
    "Mix together. Blend at highest blender speed for about 1 minute. Pour into a glass and drink with a straw. Notes: This works best if everything is cold (if you make fresh coffee, mix it with the milk and let it sit in the fridge for 1/2 hour. If it is not frothy, add more milk, or even just some more milk powder. The froth gradually turns to liquid at the bottom of the glass, so you will find that you can sit and drink this for about 1/2 hour, with more iced coffee continually appearing at the bottom. Very refreshing.",
  alcoholic: "Non alcoholic",
  ingredientsMeasures: [
    ["Coffee", "1/2 cup black "],
    ["Milk", "1/2 cup "],
    ["Sugar", "1-2 tsp "],
  ],
  tags: [],
};

export const frappeWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate = {
  ...frappeWithDetails,
  doneDate: formatDateToDDMMYYYY(new Date()),
};
