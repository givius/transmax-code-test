# Situational Awareness Dashboard

A dark-themed traffic-management dashboard built for a take-home assessment. Four widgets on a single page: **Weather**, **Delayed Routes**, **Ramp Chart** (the live one), and **Network Summary**.

## Stack

- React 19 + Vite 8
- TypeScript, strict mode, `@/*` path alias
- Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first config)
- Recharts for the donut and the sparkline
- Vitest + React Testing Library

## Getting started

```bash
npm install
npm run dev
```

That's it — the app opens at `http://localhost:5173`.

Other scripts you may want:

```bash
npm run build        # type-check + production build
npm run test:run     # run the tests once
npm run coverage     # tests with coverage report
npm run lint         # eslint
npm run format       # prettier
```

## Project layout

```
src/
├── app/App.tsx                 # Page layout only, no logic
├── main.tsx                    # React entry
├── components/
│   ├── core/                   # Badge, Button, Card, Spinner, Topbar, …
│   └── dashboard/              # One folder per widget
├── hooks/                      # One hook per widget + a generic useApi
├── lib/                        # Provided API + types (treated as an SDK)
├── utils/                      # formatTime, getDominantAlgorithm, colour maps
└── styles/                     # CSS tokens + `.tm-*` component classes
```

## How it works

### Widgets are independent

Every widget owns its own data via a dedicated hook. There's no global store, no context, and no prop drilling. The three static widgets share a generic `useApi<T>(fn)` that handles loading, error and cancellation. Only `useRampData` is more involved, because it owns the live stream.

### Pause freezes the display, not the stream

When you click **Pause**, data keeps arriving — we just stop writing it to state. `isPaused` is mirrored into a ref so the streaming callback can read the current value without re-subscribing on every toggle. The donut, the sparkline, the caption and the percentage all freeze together because they read from the same piece of state.

### Small perf touches

- `useMemo` on `getDominantAlgorithm(distribution)` — no need to recompute `Math.max` on unrelated re-renders.
- `React.memo` on `DonutChart` and `Sparkline` — they skip re-rendering while paused.
- Recharts animations are off. At two updates per second, animation is jitter, not polish.
- The sparkline buffer is capped at 120 points (60 s × 2 Hz) via a pure helper — immutable updates, safe for React.

### Styling

Design tokens live as CSS variables on `:root` / `.dark` in `styles/global.css` and are mapped to Tailwind utilities in `tailwind.config.ts` (`bg-panel`, `text-primary`, `chart-1`, …). App-level classes are namespaced `.tm-*` in `styles/components.css`; the file starts with `@reference 'tailwindcss'` so `@apply` works there. Dark mode is forced via `<body class="dark">` — the mock is dark only. Layout goes single-column under 1024 px and three-column above.

## Testing

Vitest with jsdom. `test/setup.ts` wires up jest-dom matchers and a small `ResizeObserver` polyfill (Recharts needs one under jsdom).

Run once:

```bash
npm run test:run
```

What's covered:

- **Utilities** — `rampTransforms`, `formatTime`, `getDominantAlgorithm` (including tie and empty cases).
- **Hooks** — `useApi` (resolve + error); `useRampData` (loading, first tick, pause freezes state, unsubscribe on unmount).
- **Core components** — Badge, Button, Card (default / loading / error), Spinner, LiveStatus, TimeNow.
- **Widgets** — Weather, Delayed Routes, Network Summary (including the `alertThresholdPercent` colour branch).
- **Charts** — DonutChart legend, Sparkline render, RampChart loading + dominant caption + Pause click.

A note on the live-stream test: I mock `getRampAlgorithms` via `vi.mock('@/lib')` rather than `vi.useFakeTimers()`. Both are valid — the mock keeps the test fast and avoids any chance of timer-related flakiness.

## Trade-offs

- **Data location.** The spec suggests `src/data/` for hardcoded constants. I kept the provided JSON under `src/lib/mocks/` and route it through `get*` functions so every widget shares the same `useApi` hook — swapping to a real HTTP call later is a one-line change. Moving them to `.ts` constants is trivial if you prefer.
- **Live status is hardcoded.** The `LiveStatus` pill always reads "live"; the offline branch is ready for when a real connectivity signal is wired in.

## Spec coverage

- ✅ Four widget cards on a single page
- ✅ Weather, Delayed Routes and Network Summary driven by hardcoded data through hooks
- ✅ Ramp Chart is the only live widget; updates every 500 ms
- ✅ Donut + 60-second sparkline + working Pause button
- ✅ Severity modelled as a discriminated union with `satisfies Record<Severity, string>`
- ✅ Each widget testable in isolation; no prop drilling
- ✅ Unit tests across utilities, hooks, components, widgets and charts
- ✅ TypeScript `strict` mode enabled; generic `useApi<T>`
- ✅ Roboto loaded from Google Fonts
- ✅ Responsive: one column under `lg`, three columns above
