import { Topbar } from '@/components/core';
import WeatherWidget from '@/components/dashboard/WeatherWidget';
import DelayedRoutes from '@/components/dashboard/DelayedRoutes';
import NetworkSummary from '@/components/dashboard/NetworkSummary';
import RampChart from '@/components/dashboard/RampChart/RampChart';

const App = () => {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Topbar />

            <main className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <WeatherWidget />

                    <div className="lg:col-span-2">
                        <DelayedRoutes />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <RampChart />
                    </div>

                    <NetworkSummary />
                </div>
            </main>
    </div>
  );
};

export default App;
