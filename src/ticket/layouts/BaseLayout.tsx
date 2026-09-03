import { Outlet } from "react-router"
import { CustomHeader } from "../components/CustomHeader"
import { CustomFooter } from "../components/CustomFooter"

export const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader />
      <Outlet />
      <CustomFooter />
    </div>
  )
}