import { Outlet } from "react-router"
import { CustomHeader } from "../components/CustomHeader"
import { CustomFooter } from "../components/CustomFooter"

export const BaseLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <CustomHeader />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8">
          <Outlet />
        </div>
      </main>

      <CustomFooter />
    </div>
  )
}