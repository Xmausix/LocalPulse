import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "@/contexts/AuthContext";
import { AUTH0_CONFIG } from "@/config/auth";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppShell from "@/components/AppShell";
import { Loader2 } from "lucide-react";

// Lazy-loaded pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const SubmitPage = lazy(() => import("./pages/SubmitPage"));
const MySubmissionsPage = lazy(() => import("./pages/MySubmissionsPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

const App = () => (
  <Auth0Provider
    domain={AUTH0_CONFIG.domain}
    clientId={AUTH0_CONFIG.clientId}
    authorizationParams={{
      redirect_uri: AUTH0_CONFIG.redirectUri,
      audience: AUTH0_CONFIG.audience,
    }}
    cacheLocation="localstorage"
  >
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppShell>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public routes — Polish URLs */}
                  <Route path="/" element={<Index />} />
                  <Route path="/artykuly/:slug" element={<ArticlePage />} />
                  <Route path="/mapa" element={<MapPage />} />

                  {/* Authenticated routes */}
                  <Route
                    path="/zglos"
                    element={
                      <ProtectedRoute>
                        <SubmitPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/moje-zgloszenia"
                    element={
                      <ProtectedRoute>
                        <MySubmissionsPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin routes — fully isolated */}
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute requireAdmin>
                        <AdminPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AppShell>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Auth0Provider>
);

export default App;
