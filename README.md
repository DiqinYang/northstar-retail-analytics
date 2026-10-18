# Northstar — Retail Analytics

A complete Vue 3 + Vite application with Vue Router, Pinia, Vue SFCs and fictional fixtures. ReportFilters.vue and EChart.vue separate filter controls and chart lifecycle from routed reports.

## Run

Use Node.js 24 and npm. This repository is self-contained; no sibling project or workspace root is required.

```sh
git clone https://github.com/DiqinYang/northstar-retail-analytics.git
cd northstar-retail-analytics
npm ci --ignore-scripts
npm run dev
```

```sh
npm test
npm run format:check
npm run build
npm run preview
```

Vite prints the localhost URL. Production output is generated into the ignored dist/ directory. Dependencies are pinned by this repository's own package-lock.json.

## Routes and features

- `/`: retail overview, reporting period, region/category filters, revenue charts and regional comparison.
- `/suppliers`: delivery comparison and selectable supplier radar scorecards.
- `/records`: searchable/sortable records, pagination and CSV export of all matching rows.

## Try the workflow

1. Change region/category and observe the overview and table update.
2. Open Supplier performance and change the supplier scorecard.
3. Open Data explorer, search for a product, sort and export.
4. Reload a report URL: navigation remains on that report; fictional filter state resets.

## Source map

- `src/router/`: route definitions and lazy-loaded pages.
- `src/views/`: page components.
- `src/components/`: reusable domain UI.
- `src/composables/`: view adapters, navigation and lifecycle effects.
- `src/stores/`: shared state, derived values, actions and business tests.
- `src/data/`: fictional starting records.
- `src/assets/`: CSS and any original illustrations.

Run `npm test` from this repository root for business tests. See [architecture](ARCHITECTURE.md) for design decisions and [screenshots](screenshots/) for visual examples.

## Scope and privacy

All data is synthetic and stays in memory. Reloading restores the starting data. No client API, authentication, real publication, payment or customer data is included. This is an independent reconstruction of interface patterns, not the original production repository or complete original business logic. The production HTML CSP blocks outgoing connections; Vite development uses its local hot-update connection.

## Review and licenses

Read [architecture](ARCHITECTURE.md) for state ownership and component boundaries, and [privacy review](PRIVACY.md) for the publication boundary. Third-party licenses are in licenses/. No blanket open-source license is granted to the original demo application code.
