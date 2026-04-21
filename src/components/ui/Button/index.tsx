import React from 'react';
import styles from "./style.module.scss"

interface ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "icon";
  variant?: "ghost" | "danger" | "success" | "outline";
  type?: "button" | "submit" | "reset";
  hidden?: boolean;
  onClick?: () => void;
}

const Button = ({ children, size = "sm", variant, onClick, type = "button", hidden = false }: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[`btn--${size}`]} ${variant ? styles[`btn--${variant}`] : ''} ${hidden ? styles['btn--hidden'] : ''}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button;
