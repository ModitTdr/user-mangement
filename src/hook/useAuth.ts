import type { RootState } from "@/store/store";
import { useSelector } from "react-redux"

export const useAuth = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  return {
    user,
    isLoading,
    isAuthenticated: !!user
  }
}