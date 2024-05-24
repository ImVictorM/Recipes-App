import { RouteObject, createBrowserRouter } from "react-router-dom";
import {
  // DoneRecipes,
  // FavoriteRecipes,
  Login,
  Recipes,
  // Profile,
  RecipeDetails,
  // RecipeInProgress,
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
import { toRecipeDetails } from "./utils/mappers";
import { cocktailIcon, mealIcon } from "./assets/icons";
import { RecipeWithDetails } from "./store/slices/menuSlice";

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
  // {
  //   path: "/done-recipes",
  //   element: <DoneRecipes />,
  // },
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
            onNavigateToRecipe={({ id }) => `/drinks/${id}`}
          />
        ),
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: async (args): Promise<RecipeWithDetails> => {
          const params = args.params as ArgsWithId;
          const drink = await getCocktailDetailsById(params.id, {
            signal: args.request.signal,
          });

          if (drink) {
            const recommendationsForDrinks = await getMeals();
            return toRecipeDetails(drink, recommendationsForDrinks);
          }
          throw new Response("Drink not found", { status: 404 });
        },
      },
      {
        path: ":id/in-progress",
        element: <RecipeDetails inProgress />,
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
            onNavigateToRecipe={({ id }) => `/meals/${id}`}
            title="Meals"
          />
        ),
      },
      {
        path: ":id/in-progress",
        element: <RecipeDetails inProgress />,
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: async (args): Promise<RecipeWithDetails> => {
          const params = args.params as ArgsWithId;
          const meal = await getMealDetailsById(params.id, {
            signal: args.request.signal,
          });

          if (meal) {
            const recommendationsForMeals = await getCocktails();
            return toRecipeDetails(meal, recommendationsForMeals);
          }
          throw new Response("Meal not found", { status: 404 });
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
