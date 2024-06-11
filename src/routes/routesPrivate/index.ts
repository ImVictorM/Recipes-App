import React from "react";

import { RouteObject } from "react-router-dom";

import {
  drinkRecipeDetailsLoader,
  drinkRecipeInProgressLoader,
  mealRecipeDetailsLoader,
  mealRecipeInProgressLoader,
} from "./loaders";

import CocktailIcon from "@/assets/icons/cocktailIcon.svg";
import cocktailCategories from "@/services/menu/cocktail/categories";
import getCocktails from "@/services/menu/cocktail/getCocktails";
import getCocktailsByFilter from "@/services/menu/cocktail/getCocktailsByFilter";

import MealIcon from "@/assets/icons/mealIcon.svg";
import mealCategories from "@/services/menu/meal/categories";
import getMealsByFilter from "@/services/menu/meal/getMealsByFilter";
import getMeals from "@/services/menu/meal/getMeals";

const RecipesFavorite = React.lazy(() => import("@/pages/RecipesFavorite"));
const RecipesDone = React.lazy(() => import("@/pages/RecipesDone"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const Recipes = React.lazy(() => import("@/pages/Recipes/Recipes"));
const RecipeDetails = React.lazy(() => import("@/pages/RecipeDetails"));
const RecipeError = React.lazy(() => import("@/pages/RecipeError"));
const RecipeInProgress = React.lazy(() => import("@/pages/RecipeInProgress"));

export const routesPrivate: RouteObject[] = [
  {
    path: "/favorite-recipes",
    element: React.createElement(RecipesFavorite),
  },
  {
    path: "/done-recipes",
    element: React.createElement(RecipesDone),
  },
  {
    path: "/profile",
    element: React.createElement(Profile),
  },
  {
    path: "/drinks",
    children: [
      {
        index: true,
        element: React.createElement(Recipes, {
          categories: cocktailCategories,
          onGetRecipes: getCocktails,
          onGetRecipesByFilter: getCocktailsByFilter,
          icon: { element: CocktailIcon, alt: "cocktail" },
          title: "Drinks",
        }),
      },
      {
        path: ":id",
        element: React.createElement(RecipeDetails),
        loader: drinkRecipeDetailsLoader,
        errorElement: React.createElement(RecipeError),
      },
      {
        path: ":id/in-progress",
        element: React.createElement(RecipeInProgress),
        loader: drinkRecipeInProgressLoader,
        errorElement: React.createElement(RecipeError),
      },
    ],
  },
  {
    path: "/meals",
    children: [
      {
        index: true,
        element: React.createElement(Recipes, {
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
        element: React.createElement(RecipeDetails),
        loader: mealRecipeDetailsLoader,
        errorElement: React.createElement(RecipeError),
      },
      {
        path: ":id/in-progress",
        element: React.createElement(RecipeInProgress),
        loader: mealRecipeInProgressLoader,
        errorElement: React.createElement(RecipeError),
      },
    ],
  },
];

export default routesPrivate;
