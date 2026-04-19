type ButtonProps = {
  label: string;
  onClick?: () => void;
  ariaPressed?: boolean;
};
const Button = (props: ButtonProps) => {
  const { label, onClick, ariaPressed } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ariaPressed}
      className="rounded-full border border-border px-8 py-2 hover:bg-panel-2 transition-colors"
    >
      {label}
    </button>
  );
};
export default Button;
