import { Loader2 } from "lucide-react";
import styles from "./style.module.scss";

const LoaderText = ({ children, loaderSize = 18 }: { children: React.ReactNode, loaderSize?: number }) => {
  return (
    <div className={styles.loaderText}>
      <span>{children}</span>
      <Loader2 className="animate-spin" size={loaderSize} />
    </div>
  )
}

export default LoaderText