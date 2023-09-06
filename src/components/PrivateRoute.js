import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();

  const { displayName: name } = user || {};

  return name ? children : <Navigate to={"/login"} replace />;
}
export default PrivateRoute;
