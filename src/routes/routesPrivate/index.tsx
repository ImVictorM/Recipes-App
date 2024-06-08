import { CocktailIcon, MealIcon } from "@/assets/icons";
import {
  RecipesFavorite,
  RecipesDone,
  Profile,
  Recipes,
  RecipeDetails,
  RecipeError,
  RecipeInProgress,
} from "@/pages";
import {
  cocktailCategories,
  getCocktails,
  getCocktailsByFilter,
} from "@/services/menu/cocktailService";
import {
  mealCategories,
  getMeals,
  getMealsByFilter,
} from "@/services/menu/mealService";
import { RouteObject } from "react-router-dom";
import {
  drinkRecipeDetailsLoader,
  drinkRecipeInProgressLoader,
  mealRecipeDetailsLoader,
  mealRecipeInProgressLoader,
} from "./loaders";

export const routesPrivate: RouteObject[] = [
  {
    path: "/favorite-recipes",
    element: <RecipesFavorite />,
  },
  {
    path: "/done-recipes",
    element: <RecipesDone />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/drinks",
    children: [
      {
        index: true,
        element: (
          <Recipes
            categories={cocktailCategories}
            onGetRecipes={getCocktails}
            onGetRecipesByFilter={getCocktailsByFilter}
            icon={{ element: CocktailIcon, alt: "cocktail" }}
            title="Drinks"
          />
        ),
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: drinkRecipeDetailsLoader,
        errorElement: <RecipeError />,
      },
      {
        path: ":id/in-progress",
        element: <RecipeInProgress />,
        loader: drinkRecipeInProgressLoader,
        errorElement: <RecipeError />,
      },
    ],
  },
  {
    path: "/meals",
    children: [
      {
        index: true,
        element: (
          <Recipes
            categories={mealCategories}
            onGetRecipes={getMeals}
            onGetRecipesByFilter={getMealsByFilter}
            icon={{
              element: MealIcon,
              alt: "meal",
            }}
            title="Meals"
          />
        ),
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: mealRecipeDetailsLoader,
        errorElement: <RecipeError />,
      },
      {
        path: ":id/in-progress",
        element: <RecipeInProgress />,
        loader: mealRecipeInProgressLoader,
        errorElement: <RecipeError />,
      },
    ],
  },
];

export default routesPrivate;
