import "./button.scss";
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "icon";
  variant?: "ghost" | "danger" | "success" | "outline";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({ children, size = "sm", variant, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      className={`btn btn--${size} btn--${variant}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button;
