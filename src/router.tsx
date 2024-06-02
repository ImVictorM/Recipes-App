import {
  LoaderFunctionArgs,
  RouteObject,
  createBrowserRouter,
} from "react-router-dom";
import {
  Login,
  Recipes,
  Profile,
  RecipeDetails,
  RecipeInProgress,
  RecipesDone,
  RecipesFavorite,
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
import { toRecipeWithDetails } from "./utils/recipeMappers";
import { CocktailIcon, MealIcon } from "./assets/icons";
import { RecipeWithDetails } from "./store/slices/menuSlice";
import { LoaderFunction, deferredLoader } from "./utils/reactRouterDom";

export type RecipeDetailsLoader = LoaderFunction<{
  recipeWithRecommendations: Promise<[Drink | Meal, Drink[] | Meal[]]>;
}>;

export const mealRecipeDetailsLoader: RecipeDetailsLoader = deferredLoader(
  (args) => {
    const params = args.params as ArgsWithId;

    const mealAndRecommendationsPromise = Promise.all([
      getMealDetailsById(params.id, {
        signal: args.request.signal,
      }),
      getCocktails({
        signal: args.request.signal,
      }),
    ]);

    return {
      recipeWithRecommendations: mealAndRecommendationsPromise,
    };
  }
);

export const drinkRecipeDetailsLoader: RecipeDetailsLoader = deferredLoader(
  (args) => {
    const params = args.params as ArgsWithId;

    const drinkAndRecommendationsPromise = Promise.all([
      getCocktailDetailsById(params.id, {
        signal: args.request.signal,
      }),
      getMeals({
        signal: args.request.signal,
      }),
    ]);

    return {
      recipeWithRecommendations: drinkAndRecommendationsPromise,
    };
  }
);

type ArgsWithId = {
  id: string;
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
        loader: mealRecipeDetailsLoader,
      },
      {
        path: ":id/in-progress",
        element: <RecipeInProgress />,
        loader: async (
          args: LoaderFunctionArgs
        ): Promise<RecipeWithDetails> => {
          const params = args.params as ArgsWithId;
          const drink = await getCocktailDetailsById(params.id, {
            signal: args.request.signal,
          });

          if (drink) {
            return toRecipeWithDetails(drink);
          }
          throw new Response("Drink not found", { status: 404 });
        },
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
      },
      {
        path: ":id/in-progress",
        element: <RecipeInProgress />,
        loader: async (
          args: LoaderFunctionArgs
        ): Promise<RecipeWithDetails> => {
          const params = args.params as ArgsWithId;
          const meal = await getMealDetailsById(params.id, {
            signal: args.request.signal,
          });

          if (meal) {
            return toRecipeWithDetails(meal);
          }
          throw new Response("Meal not found", { status: 404 });
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
