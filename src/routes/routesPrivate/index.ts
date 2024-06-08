import { CocktailIcon, MealIcon } from "@/assets/icons";
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
import { createElement, lazy } from "react";

const RecipesFavorite = lazy(() => import("@/pages/RecipesFavorite"));
const RecipesDone = lazy(() => import("@/pages/RecipesDone"));
const Profile = lazy(() => import("@/pages/Profile"));
const Recipes = lazy(() => import("@/pages/Recipes"));
const RecipeDetails = lazy(() => import("@/pages/RecipeDetails"));
const RecipeError = lazy(() => import("@/pages/RecipeError"));
const RecipeInProgress = lazy(() => import("@/pages/RecipeInProgress"));

export const routesPrivate: RouteObject[] = [
  {
    path: "/favorite-recipes",
    element: createElement(RecipesFavorite),
  },
  {
    path: "/done-recipes",
    element: createElement(RecipesDone),
  },
  {
    path: "/profile",
    element: createElement(Profile),
  },
  {
    path: "/drinks",
    children: [
      {
        index: true,
        element: createElement(Recipes, {
          categories: cocktailCategories,
          onGetRecipes: getCocktails,
          onGetRecipesByFilter: getCocktailsByFilter,
          icon: { element: CocktailIcon, alt: "cocktail" },
          title: "Drinks",
        }),
      },
      {
        path: ":id",
        element: createElement(RecipeDetails),
        loader: drinkRecipeDetailsLoader,
        errorElement: createElement(RecipeError),
      },
      {
        path: ":id/in-progress",
        element: createElement(RecipeInProgress),
        loader: drinkRecipeInProgressLoader,
        errorElement: createElement(RecipeError),
      },
    ],
  },
  {
    path: "/meals",
    children: [
      {
        index: true,
        element: createElement(Recipes, {
          categories: mealCategories,
          onGetRecipes: getMeals,
          onGetRecipesByFilter: getMealsByFilter,
          icon: {
            element: MealIcon,
            alt: "meal",
          },
          title: "Meals",
        }),
      },
      {
        path: ":id",
        element: createElement(RecipeDetails),
        loader: mealRecipeDetailsLoader,
        errorElement: createElement(RecipeError),
      },
      {
        path: ":id/in-progress",
        element: createElement(RecipeInProgress),
        loader: mealRecipeInProgressLoader,
        errorElement: createElement(RecipeError),
      },
    ],
  },
];

export default routesPrivate;
