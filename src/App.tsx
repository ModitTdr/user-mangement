import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default App;