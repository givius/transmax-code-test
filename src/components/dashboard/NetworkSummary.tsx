import { Card } from '@/components/core';
import { useNetworkSummary } from '@/hooks';

const NetworkSummary = () => {
  const { data, loading, error } = useNetworkSummary();

  return (
    <Card title="Network Summary" error={error} loading={loading}>
      {data && (
        <div className="grid grid-cols-2 gap-6">
          <div className="summary-card">
            <p>Total ramps</p>
            <h3>{data.totalRamps}</h3>
          </div>
          <div className="summary-card">
            <p>Active</p>
            <h3 className="success">{data.activeRamps}</h3>
          </div>
          <div className="summary-card">
            <p>Incidents</p>
            <h3 className={data.incidents > data.alertThresholdPercent ? 'error' : 'warning'}>
              {data.incidents}
            </h3>
          </div>
          <div className="summary-card">
            <p>Avg delay</p>
            <div className="flex items-baseline-last">
              <h3>{data.averageDelayMinutes}</h3>
              <p>min</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
export default NetworkSummary;
