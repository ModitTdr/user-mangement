import styles from "./style.module.scss";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode,
  status?: string,
}

const Badge = ({ children, status, ...props }: BadgeProps) => {
  return (
    <span className={styles.badge} data-status={status} {...props}>
      {children}
    </span>
  )
}

export default Badge
