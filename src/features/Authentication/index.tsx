import { Outlet } from 'react-router'
import styles from './style.module.scss'

const AuthLayout = () => {
  return (
    <main className={styles.authpage_container}>
      <div className={styles.authpage_container__left}>
        <div className={styles.authpage_container__left__logo}>
          UserManagement
        </div>
        <div className={styles.authpage_container__left__title}>
          <h2>
            Sign in <br />
            to your workspace
          </h2>
        </div>
      </div>
      <div className={styles.authpage_container__right}>
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout