interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
}

const colors = {
  primary: "bg-blue-500 hover:bg-blue-700 text-white",
  secondary: "bg-gray-500 hover:bg-gray-700 text-white",
};

export const Button = (props: ButtonProps) => {
  const { children, onClick, type, variant = "primary" } = props;
  return (
    <button
      type={type || "button"}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${colors[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
