import LiveStatus from './LiveStatus';
import TimeNow from './TimeNow';

const Topbar = () => {
  return (
    <header className="px-6 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="tracking-wider uppercase">Situational Awareness Dashboard</h1>

          <p className="text-sm text-muted">Melbourne Traffic Management — CoreITS</p>
        </div>

        <div className="flex items-center gap-6">
          <LiveStatus />
          <TimeNow />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
