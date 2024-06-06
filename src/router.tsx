import {
  Login,
  Recipes,
  Profile,
  RecipeDetails,
  RecipeInProgress,
  RecipesDone,
  RecipesFavorite,
  RecipeError,
} from "./pages";
import {
  Meal,
  getMealDetailsById,
  getMeals,
  getMealsByFilter,
  mealCategories,
} from "./services/menu/mealService";
import {
  Drink,
  cocktailCategories,
  getCocktailDetailsById,
  getCocktails,
  getCocktailsByFilter,
} from "./services/menu/cocktailService";
import { CocktailIcon, MealIcon } from "./assets/icons";
import {
  LoaderFunctionArgs,
  RouteObject,
  createBrowserRouter,
} from "react-router-dom";
import { MissingIdInRouteParametersError } from "./errors/http";
import { LoaderCallback, defer } from "./utils/reactRouterDom";

export type RecipeDetailsLoader = LoaderCallback<{
  recipe: Drink | Meal;
  recommendations: Promise<Drink[] | Meal[]>;
}>;

export type RecipeInProgressLoader = LoaderCallback<{
  recipe: Drink | Meal;
}>;

const mealRecipeDetailsLoader: RecipeDetailsLoader = async (
  args: LoaderFunctionArgs
) => {
  if (!args.params.id) throw new Error("Missing ID in route parameters");

  const mealPromise = getMealDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  const recommendationsPromise = getCocktails({
    signal: args.request.signal,
  });

  return defer({
    recipe: await mealPromise,
    recommendations: recommendationsPromise,
  });
};

const drinkRecipeDetailsLoader: RecipeDetailsLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();
  const drinkPromise = getCocktailDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  const recommendationsPromise = getMeals({
    signal: args.request.signal,
  });

  return defer({
    recipe: await drinkPromise,
    recommendations: recommendationsPromise,
  });
};

const mealRecipeInProgressLoader: RecipeInProgressLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();

  const meal = await getMealDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  return {
    recipe: meal,
  };
};

const drinkRecipeInProgressLoader: RecipeInProgressLoader = async (args) => {
  if (!args.params.id) throw new MissingIdInRouteParametersError();
  const drink = await getCocktailDetailsById(args.params.id, {
    signal: args.request.signal,
  });

  return {
    recipe: drink,
  };
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
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

export const router = createBrowserRouter(routes);

export default router;
