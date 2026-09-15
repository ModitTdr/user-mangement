import { useAuth } from "@/hook/useAuth";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated || !allowedRoles?.includes("ADMIN")) return <Navigate to="/login" />
  return <>{children}</>

};

export default PrivateRoute;