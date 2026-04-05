import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";

/**
 * Hook to connect the API service to the auth token getter.
 * Call this once at the app root level.
 */
export function useApiAuth() {
  const { getToken, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      api.setTokenGetter(getToken);
    }
  }, [isAuthenticated, getToken]);
}
