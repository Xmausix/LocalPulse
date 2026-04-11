import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X,  Search, Radio, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import SearchDialog from "@/components/SearchDialog";
import { useAuth } from "@/contexts/AuthContext";
import pl from "@/i18n/pl";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const location = useLocation();
    const { isAdmin } = useAuth();

    const navItems = [
        { path: "/", label: pl.nav.home },
        { path: "/categories", label: pl.nav.category },
        { path: "/mapa", label: pl.nav.map },
        ...(isAdmin ? [{ path: "/login", label: pl.nav.admin }] : []),
    ];

    return (
        <>
            <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
                {/* Breaking ticker */}
                <div className="bg-alert text-alert-foreground overflow-hidden">
                    <div className="container flex items-center gap-2 py-1 text-xs font-semibold">
            <span className="flex items-center gap-1 shrink-0">
              <Radio className="h-3 w-3 animate-pulse-live" />
                {pl.hero.live}
            </span>
                        <div className="overflow-hidden whitespace-nowrap">
              <span className="inline-block animate-[slide-in_0.5s_ease-out]">
                {pl.header.breakingTicker}
              </span>
                        </div>
                    </div>
                </div>

                <div className="container flex h-14 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-alert">
                            <Radio className="h-4 w-4 text-alert-foreground" />
                        </div>
                        <span className="text-xl font-black tracking-tight">
              PULSE<span className="text-alert">NEWS</span>
            </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path}>
                                <Button
                                    variant={location.pathname === item.path ? "secondary" : "ghost"}
                                    size="sm"
                                    className="text-sm font-medium"
                                >
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                    </nav>

                    {/* Right side buttons */}
                    <div className="flex items-center gap-2">


                        {/* Search */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => setSearchOpen(true)}
                            aria-label={pl.search.title}
                        >
                            <Search className="h-4 w-4" />
                        </Button>


                        {/* User */}
                        <UserMenu />

                        {/* Mobile menu toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 md:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Menu"
                        >
                            {mobileOpen ? (
                                <X className="h-4 w-4" />
                            ) : (
                                <Menu className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile nav */}
                {mobileOpen && (
                    <nav className="md:hidden border-t bg-card animate-slide-in">
                        <div className="container py-2 flex flex-col gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Button
                                        variant={
                                            location.pathname === item.path ? "secondary" : "ghost"
                                        }
                                        className="w-full justify-start"
                                    >
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </nav>
                )}
            </header>

            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
}