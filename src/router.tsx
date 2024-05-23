import { RouteObject, createBrowserRouter } from "react-router-dom";
import {
  // DoneRecipes,
  // FavoriteRecipes,
  Login,
  RecipePage,
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
import { RecipeDetailsItem } from "./pages/RecipeDetails";
import {
  cocktailCategories,
  getCocktailDetailsById,
  getCocktails,
  getCocktailsByFilter,
} from "./services/menu/cocktailApi";
import { toRecipeDetails } from "./utils/mappers";
import { cocktailIcon, mealIcon } from "./assets/icons";

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
          <RecipePage
            categories={cocktailCategories}
            getRecipes={getCocktails}
            getRecipesByFilter={getCocktailsByFilter}
            icon={{ src: cocktailIcon, alt: "cocktail" }}
            title="Drinks"
            recipeNavigateTo={({ id }) => `/drinks/${id}`}
          />
        ),
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: async (args): Promise<RecipeDetailsItem> => {
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
        element: (
          <RecipePage
            categories={mealCategories}
            getRecipes={getMeals}
            getRecipesByFilter={getMealsByFilter}
            icon={{
              src: mealIcon,
              alt: "meal",
            }}
            recipeNavigateTo={({ id }) => `/meals/${id}`}
            title="Meals"
          />
        ),
      },
      {
        path: ":id",
        element: <RecipeDetails />,
        loader: async (args): Promise<RecipeDetailsItem> => {
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
      // {
      //   path: ":id/in-progress",
      //   element: <RecipeInProgress />,
      // },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
