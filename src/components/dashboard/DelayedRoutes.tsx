import { Badge, Card } from '@/components/core';
import { useDelayedRoutes } from '@/hooks';
import { ROUTE_SEVERITY_COLOR } from '@/utils';

const DelayedRoutes = () => {
  const { data, loading, error } = useDelayedRoutes();

  return (
    <Card
      title="Delayed Routes"
      status={data && <Badge color="warning" title={`${data.length} active`} />}
      error={error}
      loading={loading}
    >
      {data?.length ? (
        data.map((route, index) => (
          <div
            key={route.id}
            className={`flex justify-between pb-4 ${index + 1 < data.length ? 'tm-border-b' : ''}`}
          >
            <div className="flex gap-4">
              <div
                className={`size-3 rounded-full ${ROUTE_SEVERITY_COLOR[route.severity]} mt-2`}
              ></div>
              <div className="flex flex-col">
                <p>{route.name}</p>
                <small className="text-muted">{route.via.join(' ⋅ ')}</small>
              </div>
            </div>

            <div className="flex flex-col">
              <small className="text-muted text-right">{route.distanceKm} Km</small>
              <div>
                <span className="text-3xl">{route.delayMinutes}</span>
                <small className="text-muted">min</small>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-muted text-center p-8">No delayed routes</div>
      )}
    </Card>
  );
};
export default DelayedRoutes;
