import type { UseFormRegisterReturn } from "react-hook-form";
import styles from "./style.module.scss";

interface CheckboxProps {
  label?: string;
  register?: UseFormRegisterReturn;
  value?: boolean;
  onCheckLabel?: string;
  offCheckLabel?: string;
}

const Checkbox = ({ label, register, value, onCheckLabel, offCheckLabel }: CheckboxProps) => {
  return (
    <div className={styles.checkboxContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <label className={styles.checkbox}>
        <input 
          type="checkbox" 
          {...register} 
          checked={!!value}
          onChange={(e) => {
            register?.onChange(e);
          }}
        />
        <span>{value ? (onCheckLabel || 'Activated') : (offCheckLabel || 'Deactivated')}</span>
      </label>
    </div>
  )
}

export default Checkbox;