import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function validatePath(path: string) {
  if (path === "/") return "tickets";
  if (path.includes("/usuarios")) return "usuarios";
  if (path.includes("/clientes")) return "clientes";
  if (path.includes("/metricas")) return "metricas";
  return null;
}

interface NavLink {
  to: string;
  label: string;
  key: string;
  visible: boolean;
}

export const CustomHeader = () => {
  const { pathname } = useLocation();
  const selectedLink = validatePath(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { authStatus, isAdmin, isSupervisor, logout } = useAuthStore();

  const links: NavLink[] = [
    { to: "/", label: "Tickets", key: "tickets", visible: true },
    { to: "/admin/usuarios", label: "Usuarios", key: "usuarios", visible: isAdmin() },
    { to: "/admin/clientes", label: "Clientes", key: "clientes", visible: isAdmin() },
    { to: "/supervisor/metricas", label: "Métricas", key: "metricas", visible: isSupervisor() },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-slate-50/95 backdrop-blur supports-backdrop-filter:bg-slate-50/80">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="font-semibold text-base tracking-tight">
            Tickets<span className="text-primary">.</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {links
              .filter((link) => link.visible)
              .map((link) => (
                <Link
                  key={link.key}
                  to={link.to}
                  className={cn(
                    "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    selectedLink === link.key && "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-2">
            {authStatus === "authenticated" && (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="hidden md:inline-flex gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                Salir
              </Button>
            )}

            {/* Trigger mobile */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger render={
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              } />
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>Menú</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-1">
                  {links
                    .filter((link) => link.visible)
                    .map((link) => (
                      <Link
                        key={link.key}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                          selectedLink === link.key && "bg-muted text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}

                  {authStatus === "authenticated" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="mt-4 gap-1.5"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Salir
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};