import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";

export const poutine: Recipe = {
  type: "meal",
  id: "52804",
  img: "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
  name: "Poutine",
};

export const poutineWithDetails: RecipeWithDetails = {
  ...poutine,
  category: "Miscellaneous",
  instructions:
    "Heat oil in a deep fryer or deep heavy skillet to 365°F (185°C).\r\nWarm gravy in saucepan or microwave.\r\nPlace the fries into the hot oil, and cook until light brown, about 5 minutes.\r\nRemove to a paper towel lined plate to drain.\r\nPlace the fries on a serving platter, and sprinkle the cheese over them.\r\nLadle gravy over the fries and cheese, and serve immediately.",
  tags: ["Un", "Healthy", "Speciality", "Hangover", "Food"],
  video: "https://www.youtube.com/watch?v=UVAMAoA2_WU",
  nationality: "Canadian",
  ingredientsMeasures: [
    ["Vegetable Oil", "Dash"],
    ["Beef Gravy", "1 Can"],
    ["Potatoes", "5 thin cut"],
    ["Cheese Curds", "2 cups"],
  ],
};

export const poutineWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate = {
  ...poutineWithDetails,
  doneDate: "26/06/2024",
};
