import { navLinks } from "@/data/navLinks"
import styles from "./style.module.scss"
import { NavLink } from "react-router"
import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import Button from "../ui/Button"
import { Moon, Sun } from "lucide-react"

const Navbar = () => {
  const { isDark, toggleDarkMode } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <h1 className={styles.navbar__title}>UserManagement</h1>
        <ul className={styles.navbar__navlinks}>
          {
            navLinks.map((link) => {
              return (
                <li key={link.id}>
                  <NavLink
                    className={
                      ({ isActive }) => `${styles.navbar__link}
                      ${isActive
                          ? styles[`navbar__link--active`]
                          : ""
                        }`}
                    to={link.url}
                  >
                    {link.title}
                  </NavLink>
                </li>
              )
            })
          }
        </ul>

        <Button size="icon" variant="outline" onClick={toggleDarkMode}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </nav>
    </header >
  )
}

export default Navbar