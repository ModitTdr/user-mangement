import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./style.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  inputSize?: "sm" | "md" | "lg";
  className?: string;
}

const Input = ({ label, register, error, inputSize = "md", className, ...props }: InputProps) => {
  return (
    <div className={`${styles.input} ${styles[`input--${inputSize}`]} ${className || ""}`}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input
        id={props.name}
        {...props}
        {...register}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};

export default Input;