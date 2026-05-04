import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./style.module.scss";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  inputSize?: "sm" | "md" | "lg" | "full";
  className?: string;
  type?: string;
}

const Input = ({ label, register, error, inputSize = "md", className, type = "text", ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={`${styles.input} ${className || ""}`}>
      {label && <label htmlFor={props.name}>{label}</label>}

      <div className={styles.input__wrapper}>
        <input
          className={`${styles.input__field} ${styles[`input__field--${inputSize}`]}`}
          id={props.name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          {...props}
          {...register}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.input__eye}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeIcon size={16} /> : <EyeClosedIcon size={16} />}
          </button>
        )}
      </div>

      {error && <span className={styles.input__error}>{error.message}</span>}
    </div>
  );
};

export default Input;