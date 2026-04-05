import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import pl from "@/i18n/pl";

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: Props) {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-alert mx-auto" />
          <p className="text-sm text-muted-foreground">{pl.auth.checkingAuth}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/?login=required" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3 max-w-md">
          <h1 className="text-2xl font-black text-destructive">{pl.auth.accessDenied}</h1>
          <p className="text-muted-foreground">{pl.auth.accessDeniedDesc}</p>
          <a href="/" className="text-sm text-alert underline">{pl.auth.backToHome}</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
