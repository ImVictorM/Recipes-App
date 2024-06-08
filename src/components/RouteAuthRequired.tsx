import { useAppSelector } from "@/hooks";
import { selectUser } from "@/store/slices/userSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RouteAuthRequired() {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  if (!user.email) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}
