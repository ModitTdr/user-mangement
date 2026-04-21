import type { UseFormRegisterReturn } from "react-hook-form";
import styles from "./style.module.scss";
import { useState } from "react";

interface CheckboxProps {
  label?: string;
  register?: UseFormRegisterReturn;
  value?: boolean;
  onCheckLabel?: string;
  offCheckLabel?: string;
}

const Checkbox = ({ label, register, value, onCheckLabel, offCheckLabel }: CheckboxProps) => {
  const [checked, isChecked] = useState(value);
  return (
    <div className={styles.checkboxContainer}>
      <label className={styles.label}>{label}</label>
      <label className={styles.checkbox}>
        <input type="checkbox" {...register} checked={checked} onChange={(e) => isChecked(e.target.checked)} />
        <span>{checked ? (onCheckLabel || 'Activated') : (offCheckLabel || 'Deactivated')}</span>
      </label>
    </div>
  )
}

export default Checkbox