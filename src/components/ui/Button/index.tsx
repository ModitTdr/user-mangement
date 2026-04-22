import React from 'react';
import styles from "./style.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "icon";
  variant?: "ghost" | "danger" | "success" | "outline";
  type?: "button" | "submit" | "reset";
  hidden?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, size = "sm", variant, onClick, type = "button", hidden = false, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[`btn--${size}`]} ${variant ? styles[`btn--${variant}`] : ''} ${hidden ? styles['btn--hidden'] : ''} ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;
