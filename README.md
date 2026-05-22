# Horizon Panel

A modern, production-ready **SaaS platform admin dashboard** built with React 19, TanStack Router, shadcn/ui, and Tailwind CSS v4. Themed around a developer-facing SaaS product — tracking API usage, deployments, incidents, engineering tasks, and team members. Fully publicly accessible — no authentication required.


## What Is This Dashboard For?

Horizon Panel simulates the internal admin interface of a SaaS platform. It covers the operational surface a platform team would need day-to-day:

| Area | What it tracks |
|------|----------------|
| **Dashboard** | Monthly active users, API request volume, average response time, error rate, request vs error area chart, recent deployments, service health uptime, top API endpoints |
| **Incidents** | Active and resolved incidents across services — declare, investigate, monitor, and resolve with a timeline audit trail |
| **Tasks** | Engineering sprint work — ENG-XXXX tickets with labels (Bug / Feature / Improvement / Infra / Security), priority levels, and status tracking |
| **Users** | Platform team members with roles (Owner / Engineer / Analyst / Viewer) and status (Active / Invited / Suspended) |
| **Settings** | Profile, account, appearance (theme + font), notifications, display preferences |

---

## Features

- **Custom Sidebar** — Collapsible with per-section accent colours (indigo for Core, rose for System, emerald for Preferences). Collapsed mode shows large distinct icons. Aurora glow in dark mode, frosted glass in light mode.
- **Theme-Aware Header** — Glass backdrop with blur that intensifies on scroll. Animated 3-segment theme pill (Light / System / Dark). Profile chip showing avatar + name.
- **Dashboard** — Area chart (requests vs errors), stat cards, recent deployments feed, service health bars, top-endpoint table. Export dialog (CSV / JSON / Excel / PDF) and Generate Report dialog (4 report types, 3-step flow).
- **Incidents Page** — Declare, filter (All / Active / Resolved), and inspect incidents. Timeline dialog per incident. Stats strip with active count, critical count, resolved count, and MTTR.
- **Task Management** — Colour-coded label badges with icons, priority colour scale, realistic engineering task titles. Full CRUD via slide-in drawer.
- **User Management** — Platform-relevant roles with icons. Full data table with filtering, bulk actions, invite flow.
- **Theme System** — Light / dark / system modes using OKLCH colour variables. Everything reacts to theme change in real-time.
- **Responsive** — Mobile-first, works on all screen sizes.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Routing | TanStack Router v1 (file-based) |
| State | Zustand + TanStack Query |
| UI Components | shadcn/ui + Radix UI |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Fake Data | Faker.js (seeded) |
| Build | Vite 8 |
| Package Manager | pnpm |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
git clone https://github.com/webdevhemant/admin-panel.git
cd admin-panel
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm test` | Run tests |
| `pnpm test:coverage` | Run tests with coverage |

---

## Project Structure

```
src/
│
├── assets/
│   ├── brand-icons/          # SVG brand/integration logos
│   └── custom/               # Custom icon components (sidebar variants, theme icons)
│
├── components/
│   ├── layout/               # App shell
│   │   ├── app-sidebar.tsx   # Custom sidebar — brand header, nav groups, user card
│   │   ├── header.tsx        # Glass-backdrop sticky header
│   │   ├── main.tsx          # Main content wrapper
│   │   ├── nav-group.tsx     # (legacy — replaced inline in app-sidebar)
│   │   ├── nav-user.tsx      # (legacy)
│   │   ├── team-switcher.tsx # (legacy)
│   │   ├── top-nav.tsx       # Horizontal sub-nav (unused on most pages)
│   │   └── data/
│   │       └── sidebar-data.ts  # All nav items, teams, user — edit here to change nav
│   │
│   ├── data-table/           # Reusable TanStack Table primitives (column header, toolbar, pagination)
│   ├── ui/                   # shadcn/ui components (button, card, dialog, badge, …)
│   ├── profile-dropdown.tsx  # Header user chip with dropdown
│   ├── search.tsx            # Command-palette trigger button
│   └── theme-switch.tsx      # Animated 3-segment Light/System/Dark pill
│
├── config/
│   └── fonts.ts              # Available font families
│
├── context/
│   ├── direction-provider.tsx  # RTL/LTR context
│   ├── font-provider.tsx       # Font preference context
│   ├── layout-provider.tsx     # Sidebar variant + collapsible mode
│   ├── search-provider.tsx     # Global search open state
│   └── theme-provider.tsx      # Dark/light/system theme with cookie persistence
│
├── features/                 # One folder per product area
│   │
│   ├── apps/                 # Third-party integrations page
│   │   ├── data/apps.ts      # Integration entries (name, logo, description, connected)
│   │   └── index.tsx         # Page component
│   │
│   ├── dashboard/            # Main SaaS metrics dashboard
│   │   ├── components/
│   │   │   ├── analytics.tsx         # (legacy analytics tab — unused)
│   │   │   ├── analytics-chart.tsx   # (legacy)
│   │   │   ├── overview.tsx          # Area chart — request volume vs errors
│   │   │   └── recent-sales.tsx      # Recent deployments feed
│   │   └── index.tsx                 # Page with stat cards, Export dialog, Generate Report dialog
│   │
│   ├── errors/               # Standalone error page components (401, 403, 404, 500, 503)
│   │
│   ├── incidents/            # Incident management
│   │   └── index.tsx         # Stats strip, filter tabs, incident cards, timeline detail dialog
│   │
│   ├── settings/             # Settings sub-pages
│   │   ├── account/          # Account form
│   │   ├── appearance/       # Theme + font selector
│   │   ├── components/       # Shared settings layout (sidebar-nav, content-section)
│   │   ├── display/          # Display density options
│   │   ├── notifications/    # Notification preferences
│   │   └── profile/          # Profile form
│   │
│   ├── tasks/                # Engineering task management
│   │   ├── components/       # Table, columns, dialogs, mutate drawer, primary buttons
│   │   └── data/
│   │       ├── data.tsx      # Label/status/priority enums with icons and colours
│   │       ├── schema.ts     # Zod schema for Task
│   │       └── tasks.ts      # 100 seeded engineering task records (ENG-XXXX)
│   │
│   └── users/                # Platform user management
│       ├── components/       # Table, columns, action/delete/invite dialogs, bulk actions
│       └── data/
│           ├── data.ts       # Role definitions (Owner/Engineer/Analyst/Viewer) with icons
│           ├── schema.ts     # Zod schema for User
│           └── users.ts      # 500 seeded user records
│
├── hooks/                    # Custom React hooks
│
├── lib/                      # Utilities
│   ├── cookies.ts            # get/set/remove cookie helpers
│   ├── errors.ts             # Error type helpers
│   └── utils.ts              # cn() and misc utils
│
├── routes/                   # TanStack Router file-based routes
│   ├── (errors)/             # Public error pages (401, 403, 404, 500, 503)
│   ├── __root.tsx            # Root layout + providers
│   └── _authenticated/       # Protected layout
│       ├── route.tsx         # Authenticated shell (sidebar + header wrapper)
│       ├── index.tsx         # → Dashboard
│       ├── apps/index.tsx    # → Integrations
│       ├── incidents/index.tsx # → Incidents
│       ├── tasks/index.tsx   # → Tasks (with search param validation)
│       ├── users/index.tsx   # → Users (with search param validation)
│       ├── errors/$error.tsx # → Dynamic error page renderer
│       └── settings/         # Settings sub-routes
│           ├── route.tsx
│           ├── index.tsx     # → Profile
│           ├── account.tsx
│           ├── appearance.tsx
│           ├── notifications.tsx
│           └── display.tsx
│
├── stores/                   # Zustand stores
│
└── styles/
    ├── index.css             # Tailwind imports + base styles
    └── theme.css             # OKLCH CSS variables for light and dark modes
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | MAU, API requests, response time, error rate, request volume chart, deployments, service health, top endpoints |
| `/incidents` | Incidents | Active/resolved incident list, declare dialog, timeline detail |
| `/tasks` | Tasks | Engineering tickets (ENG-XXXX), labels, priorities, status, CRUD drawer |
| `/users` | Users | Team members, roles (Owner/Engineer/Analyst/Viewer), invite flow |
| `/apps` | Integrations | Third-party app connections |
| `/settings` | Profile | Name, bio, avatar |
| `/settings/account` | Account | Email, password, danger zone |
| `/settings/appearance` | Appearance | Theme (Light/Dark) and font family |
| `/settings/notifications` | Notifications | Email and push preferences |
| `/settings/display` | Display | Table density and row count |
| `/errors/:error` | Error Pages | unauthorized · forbidden · not-found · internal-server-error · maintenance-error |

---

## Customization

### Colors & Theme
Edit `src/styles/theme.css` — uses OKLCH colour space for perceptually uniform colours. Light and dark palettes are both defined there. The sidebar has its own set of CSS variables (`--sidebar`, `--sidebar-primary`, etc.).

### Navigation
Edit `src/components/layout/data/sidebar-data.ts` to add, remove, or reorder sidebar items, change section labels, or swap icons.

### Adding a New Page
1. Create `src/features/<name>/index.tsx` with your page component.
2. Create `src/routes/_authenticated/<name>/index.tsx` with `createFileRoute`.
3. Add the route to `sidebar-data.ts`.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built by [webdevhemant](https://github.com/webdevhemant)
