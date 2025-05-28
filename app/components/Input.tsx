type InputProps = {
  name: string;
  type?: "hidden" | "text" | "email" | "password";
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export const Input = (props: InputProps) => {
  const {
    name,
    type = "text",
    placeholder = "",
    defaultValue = "",
    className = "",
  } = props;
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`border border-gray-200 px-2 flex-1 ${className}`}
      defaultValue={defaultValue}
    />
  );
};
