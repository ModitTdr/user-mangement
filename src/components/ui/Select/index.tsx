import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./style.module.scss"

interface SelectProps {
  options: { value: string; label: string }[];
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

const Select = ({ label, value, options, register, onChange }: SelectProps) => {
  return (
    <div className={`${styles.selectContainer}`}>
      {label && <label>{label}</label>}
      <select
        className={`${styles.select}`}
        value={value}
        onChange={onChange}
        {...register}
      >
        {
          options.map((option) => (
            <option key={option.value} value={option.value} >
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default Select
