import { selectUser } from "@/store/slices/user";
import { Navigate, useLocation } from "react-router-dom";

import SuspenseWithLoading from "../SuspenseWithLoading";

import useAppSelector from "@/hooks/useAppSelector";

export default function RouteAuthRequired() {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!user.email) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <SuspenseWithLoading />;
}
