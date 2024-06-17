import { useContext } from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function ProtectedRouteWrapper({ children, allowedRoles, ...props }) {
  const { user } = useContext(AuthContext); // Get the user from the context
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === "faculty") {
      return <Navigate to="/faculty/dashboard" replace />;
    } else if (user.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

export default ProtectedRouteWrapper;
