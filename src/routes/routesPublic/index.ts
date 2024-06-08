import { createElement, lazy } from "react";
import { RouteObject } from "react-router-dom";

const Login = lazy(() => import("@/pages/Login"));

const routesPublic: RouteObject[] = [
  {
    path: "/",
    element: createElement(Login),
  },
];

export default routesPublic;
