

interface InputProps {
  label?: string;
  type?: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputReactHook = ({ label, type = "text", name, value, onChange, placeholder }: InputProps) => {
  return (
    <div className="inputs">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputReactHook;
