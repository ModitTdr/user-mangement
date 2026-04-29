import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./style.module.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string | boolean; label: string }[];
  label?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  selectSize?: "sm" | "md" | "lg";
  className?: string;
}

const Select = ({ label, options, register, error, selectSize = "md", className, ...props }: SelectProps) => {
  return (
    <div className={`${styles.selectContainer} ${className || ""}`}>
      {label && <label>{label}</label>}
      <select
        className={`${styles.select} ${styles[`select--${selectSize}`]}`}
        {...props}
        {...register}
      >
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};

export default Select;
