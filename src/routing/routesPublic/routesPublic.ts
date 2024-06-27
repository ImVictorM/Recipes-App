import React from "react";
import { RouteObject } from "react-router-dom";

const Login = React.lazy(() => import("@/pages/Login"));

const routesPublic: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(Login),
  },
];

export default routesPublic;
