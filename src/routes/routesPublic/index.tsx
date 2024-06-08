import { Login } from "@/pages";
import { RouteObject } from "react-router-dom";

const routesPublic: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
];

export default routesPublic;
