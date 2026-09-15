import "./style.scss"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router"

const UserManagement = () => {
  return (
    <main className="userdashboard">
      <Navbar />
      <Outlet />
    </main>
  )
}

export default UserManagement