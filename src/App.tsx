import type { PropsWithChildren } from "react"
import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router"

import { CustomfullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { useAuthStore } from "./auth/store/auth.store"
import { appRouter } from "./app.router"

const queryClient = new QueryClient()

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore()
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 90,
    refetchOnWindowFocus: true,
  })

  if (isLoading) return <CustomfullScreenLoading />

  return children
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
