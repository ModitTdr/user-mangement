import { navLinks } from "@/data/navLinks"
import styles from "./style.module.scss"
import { NavLink } from "react-router"

const Navbar = () => {
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
      </nav>
    </header >
  )
}

export default Navbar