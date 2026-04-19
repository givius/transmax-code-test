import { Badge, Button, Card } from '@/components/core';
import DonutChart from './DonutChart';
import Sparkline from './Sparkline';
import { useRampData } from '@/hooks';

const RampChart = () => {
  const {
    distribution,
    dominantAlgorithm,
    dominantPercent,
    sparkline,
    totalRamps,
    isPaused,
    togglePause,
    loading,
  } = useRampData();

  return (
    <Card
      title="Ramp Chart"
      status={totalRamps > 0 && <Badge color="success" title={`${totalRamps} ramps`} />}
      loading={loading}
    >
      {distribution && (
        <>
          <DonutChart distribution={distribution} />

          <div className="flex justify-between pt-4">
            <h5 className="uppercase text-muted">{dominantAlgorithm ?? '—'} — Last 60s</h5>
            <span className="text-primary">{dominantPercent}%</span>
          </div>

          <Sparkline points={sparkline} />

          <div className="flex justify-end pt-2">
            <Button
              label={isPaused ? 'Resume' : 'Pause'}
              onClick={togglePause}
              ariaPressed={isPaused}
            />
          </div>
        </>
      )}
    </Card>
  );
};
export default RampChart;
