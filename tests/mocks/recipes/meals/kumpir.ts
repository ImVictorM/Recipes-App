import {
  Recipe,
  RecipeWithDetails,
  RecipeWithDetailsAndDoneDate,
} from "@/store/slices/menu/menuSlice.types";

export const kumpir: Recipe = {
  type: "meal",
  id: "52978",
  img: "https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
  name: "Kumpir",
};

export const kumpirWithDetails: RecipeWithDetails = {
  ...kumpir,
  category: "Side",
  instructions:
    "If you order kumpir in Turkey, the standard filling is first, lots of butter mashed into the potato, followed by cheese. There’s then a row of other toppings that you can just point at to your heart’s content – sweetcorn, olives, salami, coleslaw, Russian salad, allsorts – and you walk away with an over-stuffed potato because you got ever-excited by the choices on offer.\r\n\r\nGrate (roughly – you can use as much as you like) 150g of cheese.\r\nFinely chop one onion and one sweet red pepper.\r\nPut these ingredients into a large bowl with a good sprinkling of salt and pepper, chilli flakes (optional).",
  tags: ["Side", "Dish"],
  video: "https://www.youtube.com/watch?v=IEDEtZ4UVtI",
  nationality: "Turkish",
  ingredientsMeasures: [
    ["Potatoes", "2 large"],
    ["Butter", "2 tbs"],
    ["Cheese", "150g"],
    ["Onion", "1 large"],
    ["Red Pepper", "1 large"],
    ["Red Chilli Flakes", "Pinch"],
  ],
};

export const kumpirWithDetailsAndDoneDate: RecipeWithDetailsAndDoneDate = {
  ...kumpirWithDetails,
  doneDate: "26/06/2024",
};
