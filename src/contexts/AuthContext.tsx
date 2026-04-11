import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
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
    const [initialized, setInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ fetch user dopiero gdy Auth0 gotowe
    useEffect(() => {
        if (auth0Loading) return;

        if (!auth0IsAuth || !auth0User) {
            setAppUser(null);
            setInitialized(true);
            return;
        }

        let isMounted = true;

        const fetchUserRole = async () => {
            setRoleLoading(true);
            setError(null);

            try {
                const token = await getAccessTokenSilently();

                const res = await fetch(`${API_BASE_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                let data = null;

                if (res.ok) {
                    data = await res.json();
                }

                if (!isMounted) return;

                setAppUser({
                    id: data?.id || auth0User.sub || "",
                    email: data?.email || auth0User.email || "",
                    name: data?.name || auth0User.name || "",
                    picture: data?.picture || auth0User.picture || "",
                    role: data?.role || "user",
                });
            } catch (err) {
                console.warn("Auth fallback:", err);

                if (!isMounted) return;

                // ✅ fallback – user dalej działa
                setAppUser({
                    id: auth0User.sub || "",
                    email: auth0User.email || "",
                    name: auth0User.name || "",
                    picture: auth0User.picture || "",
                    role: "user",
                });
            } finally {
                if (isMounted) {
                    setRoleLoading(false);
                    setInitialized(true);
                }
            }
        };

        fetchUserRole();

        return () => {
            isMounted = false;
        };
    }, [auth0Loading, auth0IsAuth, auth0User, getAccessTokenSilently]);

    // ✅ LOGIN
    const login = () => {
        loginWithRedirect({
            authorizationParams: {
                connection: "google-oauth2",
            },
        });
    };

    // ✅ LOGOUT
    const logout = () => {
        setAppUser(null);
        auth0Logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    const getToken = async () => {
        try {
            return await getAccessTokenSilently();
        } catch {
            return "";
        }
    };

    // ✅ KLUCZOWA POPRAWKA
    const isLoading = auth0Loading || roleLoading || !initialized;

    // ❗ NIE zależy od appUser
    const isAuthenticated = auth0IsAuth;

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
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}