import type { RootState } from "@/store/store";
import { useSelector } from "react-redux"

export const useAuth = () => {
  const { user, isLoading, accessToken } = useSelector((state: RootState) => {
    return state.auth
  });

  return {
    user,
    isLoading,
    accessToken,
    isAuthenticated: !!accessToken
  }
}