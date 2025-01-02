import ROUTES from "@constants/routes";
import { auth } from "@appServices/AuthService";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "@contexts/AuthContext";

const SecureRoutes: React.FC = () => {
  const { user } = useAuthContext();

  return auth.currentUser ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default SecureRoutes;
