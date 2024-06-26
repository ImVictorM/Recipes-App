import {
  RecipeWithDetailsAndDoneDate,
  RecipeWithDetails,
  Recipe,
} from "@/store/slices/menu/menuSlice.types";

export const bigMac: Recipe = {
  type: "meal",
  id: "53013",
  img: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
  name: "Big Mac",
};

export const bigMacWithDetails: RecipeWithDetails = {
  ...bigMac,
  category: "Beef",
  instructions:
    "For the Big Mac sauce, combine all the ingredients in a bowl, season with salt and chill until ready to use.\r\n2. To make the patties, season the mince with salt and pepper and form into 4 balls using about 1/3 cup mince each. Place each onto a square of baking paper and flatten to form into four x 15cm circles. Heat oil in a large frypan over high heat. In 2 batches, cook beef patties for 1-2 minutes each side until lightly charred and cooked through. Remove from heat and keep warm. Repeat with remaining two patties.\r\n3. Carefully slice each burger bun into three acrossways, then lightly toast.\r\n4. To assemble the burgers, spread a little Big Mac sauce over the bottom base. Top with some chopped onion, shredded lettuce, slice of cheese, beef patty and some pickle slices. Top with the middle bun layer, and spread with more Big Mac sauce, onion, lettuce, pickles, beef patty and then finish with more sauce. Top with burger lid to serve.\r\n5. After waiting half an hour for your food to settle, go for a jog.",
  tags: [],
  video: "https://www.youtube.com/watch?v=C5J39YnnPsg",
  nationality: "American",
  ingredientsMeasures: [
    ["Minced Beef", "400g"],
    ["Olive Oil", "2 tbs"],
    ["Sesame Seed Burger Buns", "2"],
    ["Onion", "Chopped"],
    ["Iceberg Lettuce", "1/4 "],
    ["Cheese", "2 sliced"],
    ["Dill Pickles", "2 large"],
    ["Mayonnaise", "1 cup "],
    ["White Wine Vinegar", "2 tsp"],
    ["Pepper", "Pinch"],
    ["Mustard", "2 tsp"],
    ["Onion Salt", "1 1/2 tsp "],
    ["Garlic Powder", "1 1/2 tsp "],
    ["Paprika", "1/2 tsp"],
  ],
};

export const bigMacWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate = {
  ...bigMacWithDetails,
  doneDate: "26/06/2024",
};
