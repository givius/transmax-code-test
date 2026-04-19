import { memo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { ALGORITHMS, type AlgorithmDistribution } from '@/lib';
import { ALGORITHM_COLOR } from '@/utils';

type DonutChartProps = {
  distribution: AlgorithmDistribution;
};

const DonutChart = ({ distribution }: DonutChartProps) => {
  // Recharts re-creates slices on every render; keeping the data shape
  // in sync with `distribution` is cheap (5 entries).
  const data = ALGORITHMS.map((algorithm) => ({
    name: algorithm,
    value: distribution[algorithm],
  }));

  return (
    <div className="flex items-center gap-6">
      <div className="shrink-0" style={{ width: 300, height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={1}
              stroke="none"
              isAnimationActive={false}
              label={({ value }) => `${value}%`}
            >
              {ALGORITHMS.map((algorithm) => (
                <Cell key={algorithm} fill={ALGORITHM_COLOR[algorithm]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="flex flex-col gap-1 flex-1">
        {ALGORITHMS.map((algorithm) => (
          <li key={algorithm} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: ALGORITHM_COLOR[algorithm] }}
              />
              <span>{algorithm}</span>
            </div>
            <span className="text-muted">{distribution[algorithm]}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Memoised: re-renders only when `distribution` changes (skipped on pause
// toggles or unrelated parent re-renders).
export default memo(DonutChart);
