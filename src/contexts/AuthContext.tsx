import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { API_BASE_URL } from "@/config/auth";

export type UserRole = "user" | "admin";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  role: UserRole;
}

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  getToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user: auth0User,
    isAuthenticated: auth0IsAuth,
    isLoading: auth0Loading,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
    error: auth0Error,
  } = useAuth0();

  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // After Auth0 authenticates, fetch role from backend
  useEffect(() => {
    if (!auth0IsAuth || !auth0User) {
      setAppUser(null);
      return;
    }

    const fetchUserRole = async () => {
      setRoleLoading(true);
      setError(null);
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setAppUser({
            id: data.id || auth0User.sub || "",
            email: data.email || auth0User.email || "",
            name: data.name || auth0User.name || "",
            picture: data.picture || auth0User.picture || "",
            role: data.role || "user",
          });
        } else {
          // Backend unavailable — fall back to basic user (no admin)
          console.warn("Backend /auth/me unavailable, defaulting to user role");
          setAppUser({
            id: auth0User.sub || "",
            email: auth0User.email || "",
            name: auth0User.name || "",
            picture: auth0User.picture || "",
            role: "user",
          });
        }
      } catch (err) {
        console.warn("Failed to fetch user role from backend:", err);
        // Graceful degradation — still allow basic access
        setAppUser({
          id: auth0User.sub || "",
          email: auth0User.email || "",
          name: auth0User.name || "",
          picture: auth0User.picture || "",
          role: "user",
        });
      } finally {
        setRoleLoading(false);
      }
    };

    fetchUserRole();
  }, [auth0IsAuth, auth0User, getAccessTokenSilently]);

  const login = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
      },
    });
  };

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
    setAppUser(null);
  };

  const getToken = () => getAccessTokenSilently();

  const isLoading = auth0Loading || roleLoading;
  const isAuthenticated = auth0IsAuth && !!appUser;
  const isAdmin = appUser?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user: appUser,
        isAuthenticated,
        isLoading,
        isAdmin,
        error: error || auth0Error?.message || null,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
