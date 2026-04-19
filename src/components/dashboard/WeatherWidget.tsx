import { Badge, Card } from '@/components/core';
import { useWeather } from '@/hooks';
import { CONDITION_IMAGE, formatTime } from '@/utils';

const WeatherWidget = () => {
  const { data, loading, error } = useWeather();

  return (
    <Card
      title="Weather"
      status={data && <Badge color="success" title={data.city} />}
      error={error}
      loading={loading}
    >
      {data && (
        <>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h5 className="text-muted">{data.city}</h5>
              <span className="text-6xl">{data.temperature}°</span>
              <p className="text-muted">{formatTime(new Date(data.datetime))}</p>
            </div>
            <div>
              <img src={CONDITION_IMAGE[data.condition]} alt={data.condition} className="size-32" />
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-muted">Humidity</span>
            <span>{data.humidity}%</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted">Chance of Rain</span>
            <span>{data.chanceOfRain}%</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted">Wind</span>
            <span className="flex gap-1">
              <span>{data.windSpeed}</span>
              <span className="text-muted">{data.windUnit}</span>
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted">Tomorrow</span>
            <div className="flex gap-2">
              <span>{data.tomorrow.temperature}°</span>
              <img
                src={CONDITION_IMAGE[data.tomorrow.condition]}
                alt={data.tomorrow.condition}
                className="size-10 -m-1.5"
              />
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
export default WeatherWidget;
