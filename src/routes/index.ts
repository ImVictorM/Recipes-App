import React from "react";
import { Outlet, RouteObject } from "react-router-dom";

const RouteAuthRequired = React.lazy(
  () => import("@/components/RouteAuthRequired")
);

import routesPrivate from "./routesPrivate";
import routesPublic from "./routesPublic";

export const routes: RouteObject[] = [
  {
    element: React.createElement(React.Suspense, {
      children: React.createElement(Outlet),
    }),
    children: routesPublic,
  },
  {
    element: React.createElement(RouteAuthRequired),
    children: routesPrivate,
  },
];

export default routes;
