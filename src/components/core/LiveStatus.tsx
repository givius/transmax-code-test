import { useState } from 'react';
import type { Color } from '@/utils';

type Status = 'live' | 'offline';

const STATUS_CLASS_MAP: Record<Status, Extract<Color, 'success' | 'error'>> = {
  live: 'success',
  offline: 'error',
};

// This component will display the live/offline status
const LiveStatus = () => {
  const [status] = useState<Status>('live');

  return <span className={`tm-pill border ${STATUS_CLASS_MAP[status]} uppercase`}>{status}</span>;
};
export default LiveStatus;
