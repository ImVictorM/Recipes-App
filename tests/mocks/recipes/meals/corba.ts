import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";

export const corba: Recipe = {
  type: "meal",
  id: "52977",
  img: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
  name: "Corba",
};

export const corbaWithDetails: RecipeWithDetails = {
  ...corba,
  category: "Side",
  instructions:
    "Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.",
  tags: ["Soup"],
  video: "https://www.youtube.com/watch?v=VVnZd8A84z4",
  nationality: "Turkish",
  ingredientsMeasures: [
    ["Lentils", "1 cup "],
    ["Onion", "1 large"],
    ["Carrots", "1 large"],
    ["Tomato Puree", "1 tbs"],
    ["Cumin", "2 tsp"],
    ["Paprika", "1 tsp "],
    ["Mint", "1/2 tsp"],
    ["Thyme", "1/2 tsp"],
    ["Black Pepper", "1/4 tsp"],
    ["Red Pepper Flakes", "1/4 tsp"],
    ["Vegetable Stock", "4 cups "],
    ["Water", "1 cup "],
    ["Sea Salt", "Pinch"],
  ],
};

export const corbaWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate = {
  ...corbaWithDetails,
  doneDate: "13/06/2024",
};
