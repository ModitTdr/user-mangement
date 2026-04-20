import type { UseFormRegister, FieldError } from "react-hook-form";
import type { UserListType } from "../../data/users";

type UserFormData = Omit<UserListType, "id">;

interface InputProps {
  label: string;
  type?: string;
  placeholder: string;
  name: keyof UserFormData;
  register: UseFormRegister<UserFormData>;
  error?: FieldError;
}

const Input = ({ label, type = "text", name, placeholder, register, error }: InputProps) => {
  return (
    <div className="inputs">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: `${label} is required` })}
      />
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};

export default Input;