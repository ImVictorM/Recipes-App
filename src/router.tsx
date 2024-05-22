import { RouteObject, createBrowserRouter } from "react-router-dom";
import {
  // DoneRecipes,
  Drinks,
  // FavoriteRecipes,
  Login,
  Meals,
  // Profile,
  RecipeDetails,
  // RecipeInProgress,
} from "./pages";
import { getMealDetailsById, getMeals } from "./services/menu/mealApi";
import { RecipeDetailsItem } from "./pages/RecipeDetails";
import {
  getCocktailDetailsById,
  getCocktails,
} from "./services/menu/cocktailApi";
import { toRecipeDetails } from "./utils/mappers";

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
        element: <Drinks />,
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: async (args): Promise<RecipeDetailsItem> => {
          const params = args.params as ArgsWithId;
          const drink = await getCocktailDetailsById(params.id);

          if (drink) {
            const recommendationsForDrinks = await getMeals();
            return toRecipeDetails(drink, recommendationsForDrinks);
          }
          throw new Response("Drink not found", { status: 404 });
        },
      },
      // {
      //   path: ":id/in-progress",
      //   element: <RecipeInProgress />,
      // },
    ],
  },
  {
    path: "/meals",
    children: [
      {
        index: true,
        element: <Meals />,
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: async (args): Promise<RecipeDetailsItem> => {
          const params = args.params as ArgsWithId;
          const meal = await getMealDetailsById(params.id);

          if (meal) {
            const recommendationsForMeals = await getCocktails();
            return toRecipeDetails(meal, recommendationsForMeals);
          }
          throw new Response("Meal not found", { status: 404 });
        },
      },
      // {
      //   path: ":id/in-progress",
      //   element: <RecipeInProgress />,
      // },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
