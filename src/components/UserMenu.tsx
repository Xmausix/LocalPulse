import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, Shield, FileText } from "lucide-react";
import pl from "@/i18n/pl";

export default function UserMenu() {
  const { user, isAuthenticated, isLoading, isAdmin, login, logout } = useAuth();

  if (isLoading) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />;
  }

  if (!isAuthenticated) {
    return (
      <Button variant="outline" size="sm" className="gap-1.5" onClick={login}>
        <LogIn className="h-4 w-4" /> {pl.auth.signIn}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.picture} alt={user?.name} />
            <AvatarFallback>
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium truncate">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          {isAdmin && (
            <span className="inline-flex items-center gap-1 text-[10px] text-alert font-bold mt-1">
              <Shield className="h-3 w-3" /> ADMIN
            </span>
          )}
        </div>
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="gap-2 cursor-pointer">
              <Shield className="h-4 w-4" /> {pl.nav.admin}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to="/moje-zgloszenia" className="gap-2 cursor-pointer">
            <FileText className="h-4 w-4" /> {pl.nav.mySubmissions}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="gap-2 text-destructive cursor-pointer">
          <LogOut className="h-4 w-4" /> {pl.auth.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
