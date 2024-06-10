import { Outlet, RouteObject } from "react-router-dom";
import RouteAuthRequired from "@/components/RouteAuthRequired";

import routesPrivate from "./routesPrivate";
import routesPublic from "./routesPublic";
import { Suspense, createElement } from "react";

export const routes: RouteObject[] = [
  {
    element: createElement(Suspense, { children: createElement(Outlet) }),
    children: routesPublic,
  },
  {
    element: createElement(RouteAuthRequired),
    children: routesPrivate,
  },
];

export default routes;
