import {
  LoaderFunctionArgs,
  RouteObject,
  createBrowserRouter,
} from "react-router-dom";
import {
  // FavoriteRecipes,
  Login,
  Recipes,
  // Profile,
  RecipeDetails,
  RecipeInProgress,
  RecipesDone,
} from "./pages";
import {
  getMealDetailsById,
  getMeals,
  getMealsByFilter,
  mealCategories,
} from "./services/menu/mealApi";
import {
  cocktailCategories,
  getCocktailDetailsById,
  getCocktails,
  getCocktailsByFilter,
} from "./services/menu/cocktailApi";
import {
  toRecipeWithDetails,
  toRecipeWithDetailsAndRecommendations,
} from "./utils/mappers";
import { cocktailIcon, mealIcon } from "./assets/icons";
import {
  RecipeWithDetails,
  RecipeWithDetailsAndRecommendation,
} from "./store/slices/menuSlice";

type ArgsWithId = {
  id: string;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  // {
  //   path: "/favorite-recipes",
  //   element: <FavoriteRecipes />,
  // },
  {
    path: "/done-recipes",
    element: <RecipesDone />,
  },
  // {
  //   path: "/profile",
  //   element: <Profile />,
  // },
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
            icon={{ src: cocktailIcon, alt: "cocktail" }}
            title="Drinks"
          />
        ),
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: async (
          args: LoaderFunctionArgs
        ): Promise<RecipeWithDetailsAndRecommendation> => {
          const params = args.params as ArgsWithId;
          const drink = await getCocktailDetailsById(params.id, {
            signal: args.request.signal,
          });

          if (drink) {
            const recommendationsForDrinks = await getMeals();
            return toRecipeWithDetailsAndRecommendations(
              drink,
              recommendationsForDrinks
            );
          }
          throw new Response("Drink not found", { status: 404 });
        },
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
              src: mealIcon,
              alt: "meal",
            }}
            title="Meals"
          />
        ),
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: async (
          args: LoaderFunctionArgs
        ): Promise<RecipeWithDetailsAndRecommendation> => {
          const params = args.params as ArgsWithId;
          const meal = await getMealDetailsById(params.id, {
            signal: args.request.signal,
          });

          if (meal) {
            const recommendationsForMeals = await getCocktails();
            return toRecipeWithDetailsAndRecommendations(
              meal,
              recommendationsForMeals
            );
          }
          throw new Response("Meal not found", { status: 404 });
        },
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
