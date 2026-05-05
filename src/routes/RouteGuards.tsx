import { useAuth } from "@/hook/useAuth"
import { Navigate } from "react-router"

export const RouteGuard = ({ children, type }: {
  children: React.ReactNode,
  type: "protected" | "public"
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null


  if (type === "protected") {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    } else {
      return <>{children}</>
    }
  } else {
    if (isAuthenticated) {
      return <Navigate to="/" />
    } else {
      return <>{children}</>
    }
  }
}

