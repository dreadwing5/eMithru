import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export const getAuthToken = () => {
  const { user } = useContext(AuthContext);
  return user ? user.token : null;
};
