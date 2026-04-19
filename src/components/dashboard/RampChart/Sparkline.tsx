import { memo } from 'react';
import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';
import type { SparklinePoint } from '@/lib';

type SparklineProps = {
  points: SparklinePoint[];
  height?: number;
};

const Sparkline = ({ points, height = 80 }: SparklineProps) => {
  return (
    <>
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
            <YAxis domain={[0, 100]} hide />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-muted text-xs">
        <span>-60s</span>
        <span>now</span>
      </div>
    </>
  );
};

// Memoised: re-renders only when `points` changes (same reference is
// preserved across pause toggles in useRampData).
export default memo(Sparkline);
