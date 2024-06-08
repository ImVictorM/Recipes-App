import { RouteObject } from "react-router-dom";
import { RouteAuthRequired } from "../components";

import routesPrivate from "./routesPrivate";
import routesPublic from "./routesPublic";

export const routes: RouteObject[] = [
  ...routesPublic,
  {
    element: <RouteAuthRequired />,
    children: routesPrivate,
  },
];

export default routes;
