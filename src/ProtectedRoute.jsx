import { useContext } from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function ProtectedRouteWrapper({ children, ...props }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRouteWrapper;
