import { navLinks } from "@/data/navLinks"
import "./navbar.scss"

const Navbar = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <h1>UserManagement</h1>
        <ul>
          {
            navLinks.map((link) => {
              return (
                <li key={link.id}>
                  <a href={link.url}>{link.title}</a>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </header>
  )
}

export default Navbar