import HeroSection from "./components/dashboard/HeroSection"
import UserList from "./components/dashboard/UserList"
import "./styles/userdashboard.scss"

function App() {
  return (
    <main className="userdashboard">
      <HeroSection />
      <UserList />
    </main>
  )
}

export default App
