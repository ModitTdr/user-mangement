import { navLinks } from "@/data/navLinks"
import styles from "./style.module.scss"

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
                  <a className={styles.navbar__link} href={link.url}>{link.title}</a>
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