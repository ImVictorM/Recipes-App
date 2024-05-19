import { RouteObject, createBrowserRouter } from "react-router-dom";
import {
  // DoneRecipes,
  Drinks,
  // FavoriteRecipes,
  Login,
  Meals,
  // Profile,
  // RecipeDetails,
  // RecipeInProgress,
} from "./pages";

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
    element: <Drinks />,
    // children: [
    //   {
    //     path: ":id",
    //     element: <RecipeDetails />,
    //   },
    //   {
    //     path: ":id/in-progress",
    //     element: <RecipeInProgress />,
    //   },
    // ],
  },
  {
    path: "/meals",
    element: <Meals />,
    // children: [
    //   {
    //     path: ":id",
    //     element: <RecipeDetails />,
    //   },
    //   {
    //     path: ":id/in-progress",
    //     element: <RecipeInProgress />,
    //   },
    // ],
  },
];

const router = createBrowserRouter(routes);

export default router;
