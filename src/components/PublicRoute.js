import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PublicRoute({ children }) {
  const { user } = useAuth();

  const { displayName: name } = user || {};

  return !name ? children : <Navigate to={"/"} replace />;
}
export default PublicRoute;
