import { navLinks } from "@/data/navLinks"
import styles from "./style.module.scss"
import { NavLink } from "react-router"
import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import Button from "../ui/Button"
import { LogOutIcon, Moon, Sun } from "lucide-react"
import { useDispatch } from "react-redux"
import { logOut } from "@/features/Authentication/authSlice"
import { LogoutUser } from "@/features/Authentication/services/authService"
import { useMutation } from "@/hook/useMutation"
import toast from "react-hot-toast"

const Navbar = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }
  const { isDark, toggleDarkMode } = context;
  const mutation = useMutation({ mutateFn: LogoutUser })

  const dispatch = useDispatch()
  const handleLogout = async () => {
    const res = await mutation.mutate();
    toast.success(res.message)
    dispatch(logOut());
  }

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
        <div className={styles.navbar__navbuttons}>
          <Button size="icon" variant="outline" onClick={toggleDarkMode}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button size="icon" variant="outline" onClick={handleLogout}>
            <LogOutIcon size={18} />
          </Button>
        </div>
      </nav>
    </header >
  )
}

export default Navbar