type ButtonProps = {
  label: string;
  onClick?: () => void;
  type: "button" | "submit";
};

const Button = ({ label, onClick, type }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="mt-4 p-2 bg-blue-500 text-white rounded"
    >
      {label}
    </button>
  );
};

export default Button;
