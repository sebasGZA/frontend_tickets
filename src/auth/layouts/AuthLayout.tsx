import { Outlet } from "react-router"

export const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl 2xl:max-w-6xl">
        <Outlet />
      </div>
    </div>
  )
}