import React from "react";
import { RouteObject } from "react-router-dom";

const RouteAuthRequired = React.lazy(
  () => import("@/components/RouteAuthRequired")
);
const SuspenseWithLoading = React.lazy(
  () => import("@/components/SuspenseWithLoading")
);

import routesPrivate from "./routesPrivate";
import routesPublic from "./routesPublic";

export const routes: RouteObject[] = [
  {
    element: React.createElement(SuspenseWithLoading),
    children: routesPublic,
  },
  {
    element: React.createElement(RouteAuthRequired),
    children: routesPrivate,
  },
];

export default routes;
