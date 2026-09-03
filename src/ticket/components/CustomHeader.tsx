import { Link, useLocation } from "react-router";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";


function validatePath(path: string) {
  if (path === '/') return 'tickets'
  if (path.includes('/usuarios')) return 'usuarios'
  if (path.includes('/clientes')) return 'clientes'
  if (path.includes('/metricas')) return 'metricas'
  return null
}

export const CustomHeader = () => {

  const { pathname } = useLocation()
  const selectedLink = validatePath(pathname)


  const { authStatus, isAdmin, isSupervisor, logout } = useAuthStore();


  return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        Web / APP
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(`text-sm font-medium transition-colors hover:text-primary`,
              selectedLink === 'tickets' && 'underline underline-offset-4'
            )}>
            Tickets
          </Link>
          {
            isAdmin() && (
              <Link
                to="/admin/usuarios"
                className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                  selectedLink === 'usuarios' && 'underline underline-offset-4'
                )}>
                Usuarios
              </Link>

            )
          }

          {
            isAdmin() && (
              <Link
                to="/admin/clientes"
                className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                  selectedLink === 'clientes' && 'underline underline-offset-4'
                )}>
                Clientes
              </Link>
            )
          }

          {
            isSupervisor() && (
              <Link
                to="/supervisor/metricas"
                className={cn(`text-sm font-medium transition-colors hover:text-primary`,
                  selectedLink === 'metricas' && 'underline underline-offset-4'
                )}>
                Metricas
              </Link>
            )
          }
        </nav>

        <div className="flex items-center space-x-4">

          {
            authStatus !== 'no-authenticated' &&
             (
              <Button
                variant='outline' size='sm' className='ml-2' onClick={logout}
              >
                Logout
              </Button>
            )
          }
        </div>
      </div>
    </div>
  </header>;
};