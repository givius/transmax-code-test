import type { Color } from '@/utils';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: Color;
  label?: string;
};

const Spinner = (props: SpinnerProps) => {
  const { size = 'lg', color = 'primary', label } = props;

  return (
    <span
      className={`tm-spinner ${size} ${color}`}
      role="status"
      aria-live="polite"
      aria-label={label ?? 'Loading'}
    >
      <span className="tm-spinner-ring" />
      {label && <span className="tm-spinner-label">{label}</span>}
    </span>
  );
};

export default Spinner;
