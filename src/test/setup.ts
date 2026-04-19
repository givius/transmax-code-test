import '@testing-library/jest-dom';

// Recharts' ResponsiveContainer uses ResizeObserver, which jsdom doesn't ship.
class ResizeObserverPolyfill {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(globalThis as any).ResizeObserver = ResizeObserverPolyfill;
