import React from "react";

import { RouteObject } from "react-router-dom";

import {
  drinkRecipeDetailsLoader,
  drinkRecipeInProgressLoader,
  mealRecipeDetailsLoader,
  mealRecipeInProgressLoader,
} from "./loaders";

const RecipesFavorite = React.lazy(() => import("@/pages/RecipesFavorite"));
const RecipesDone = React.lazy(() => import("@/pages/RecipesDone"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const Recipes = React.lazy(() => import("@/pages/Recipes"));
const RecipeDetails = React.lazy(() => import("@/pages/RecipeDetails"));
const RecipeError = React.lazy(
  () => import("@/pages/ErrorBoundaries/RecipeError")
);
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
          type: "drink",
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
          type: "meal",
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
