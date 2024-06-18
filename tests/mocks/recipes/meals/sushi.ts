import { Recipe, RecipeWithDetails } from "@/store/slices/menu/menuSlice.types";

export const sushi: Recipe = {
  type: "meal",
  id: "53065",
  img: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
  name: "Sushi",
};

export const sushiWithDetails: RecipeWithDetails = {
  ...sushi,
  category: "Seafood",
  instructions: "Sushi instructions",
  tags: [],
  video: "https://www.youtube.com/watch?v=ub68OxEypaY",
  nationality: "Japanese",
  ingredientsMeasures: [
    ["Sushi Rice", "300ml "],
    ["Rice wine", "100ml"],
    ["Caster Sugar", "2 tbs"],
    ["Mayonnaise", "3 tbs"],
    ["Rice wine", "1 tbs"],
    ["Soy Sauce", "1 tbs"],
    ["Cucumber", "1"],
  ],
};
