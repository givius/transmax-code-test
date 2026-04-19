import { useEffect, useState } from 'react';
import { formatTime } from '@/utils';

const TimeNow = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30); // update every 30s
    return () => clearInterval(id);
  }, []);

  return <span className="text-sm text-muted">{formatTime(now)}</span>;
};

export default TimeNow;
