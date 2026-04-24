import "./style.scss"
import HeroSection from "./components/HeroSection"
import UserList from "./components/UserList"

const UserManagement = () => {
  return (
    <main className="userdashboard">
      <HeroSection />
      <UserList />
    </main>
  )
}

export default UserManagement