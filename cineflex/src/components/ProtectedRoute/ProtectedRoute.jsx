import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { ROUTE_PATHS } from "../../constants";

const ProtectedRoute = () => {
  const { isUserLoggedIn } = useContext(UserContext);

  return isUserLoggedIn ? <Outlet /> : <Navigate to={ROUTE_PATHS.login} />;
};

export default ProtectedRoute;
