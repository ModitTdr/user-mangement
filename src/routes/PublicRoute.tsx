import { useAuth } from "@/hook/useAuth";
import React from "react";
import { Navigate } from "react-router";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" />
  return <>{children}</>
};

export default PublicRoute;