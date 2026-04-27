import { Loader2 } from "lucide-react";
import styles from "./style.module.scss";

const LoaderText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.loaderText}>
      <span>{children}</span>
      <Loader2 className="animate-spin" />
    </div>
  )
}

export default LoaderText