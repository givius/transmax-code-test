import type { Color } from '@/utils';

type BadgeProps = {
  title: string | number;
  color: Color;
};

const Badge = (props: BadgeProps) => {
  const { title, color } = props;
  return <span className={`tm-badge ${color}`}>{title}</span>;
};
export default Badge;
