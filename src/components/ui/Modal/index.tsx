import { X } from "lucide-react"
import styles from "./style.module.scss"
import Button from "../Button"

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Modal = ({ children, onClose, ...props }: ModalProps & { onClose: () => void }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContainer__modal} {...props}>
        {children}
        <Button onClick={onClose} size="icon" variant="ghost" className={styles.modalContainer__modal__trigger}>
          <X size={18} color="rgba(0, 0, 0, 0.3)" />
        </Button>
      </div>
    </div>
  )
}

export const ModalHeader = ({ children, ...props }: ModalProps) => {
  return (
    <div className={styles.modalContainer__modal__header} {...props}>
      {children}
    </div>
  )
}

export const ModalTitle = ({ children, ...props }: ModalProps) => {
  return (
    <h2 className={styles.modalContainer__modal__header__title} {...props}>
      {children}
    </h2>
  )
}

export const ModalDescription = ({ children, ...props }: ModalProps) => {
  return (
    <p className={styles.modalContainer__modal__header__description} {...props}>
      {children}
    </p>
  )
}

export const ModalBody = ({ children, ...props }: ModalProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.modalContainer__modal__body} {...props}>
      {children}
    </div>
  )
}

export const ModalFooter = ({ children, ...props }: ModalProps) => {
  return (
    <div className={styles.modalContainer__modal__footer} {...props}>
      {children}
    </div>
  )
}