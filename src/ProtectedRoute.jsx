import { useContext } from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function ProtectedRouteWrapper({ children, allowedRoles, ...props }) {
  const { user } = useContext(AuthContext); // Get the user from the contex
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.roleName)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default ProtectedRouteWrapper;
