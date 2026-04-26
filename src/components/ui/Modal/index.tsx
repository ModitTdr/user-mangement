import { X } from "lucide-react"
import styles from "./style.module.scss"
import Button from "../Button"

export const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContainer__modal}>
        {children}
        <Button onClick={onClose} size="icon" variant="ghost" className={styles.modalContainer__modal__trigger}>
          <X size={18} color="rgba(0, 0, 0, 0.3)" />
        </Button>
      </div>
    </div>
  )
}

export const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.modalContainer__modal__header}>
      {children}
    </div>
  )
}

export const ModalTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className={styles.modalContainer__modal__header__title}>
      {children}
    </h2>
  )
}

export const ModalDescription = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className={styles.modalContainer__modal__header__description}>
      {children}
    </p>
  )
}

export const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.modalContainer__modal__body}>
      {children}
    </div>
  )
}

export const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.modalContainer__modal__footer}>
      {children}
    </div>
  )
}