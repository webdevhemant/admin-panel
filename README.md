# Nexus Panel

A modern, production-ready admin dashboard built with React 19, TanStack Router, shadcn/ui, and Tailwind CSS v4. Fully publicly accessible — no authentication required.

![Nexus Panel Dashboard](public/images/shadcn-admin.png)

## Features

- **Dashboard** — Revenue charts, KPI cards, and recent sales analytics
- **User Management** — Full CRUD with data tables, filtering, bulk actions
- **Task Management** — Status tracking, import/export, and bulk operations
- **App Integrations** — Overview of connected third-party applications
- **Settings** — Profile, account, appearance, notifications, display preferences
- **Theme System** — Light / dark / system modes with indigo/violet palette
- **Layout Options** — Multiple sidebar variants and density settings
- **Responsive** — Mobile-first design that works on all screen sizes

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Routing | TanStack Router v1 |
| State | Zustand + TanStack Query |
| UI | shadcn/ui + Radix UI |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Build | Vite 8 |
| Package Manager | pnpm |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
git clone https://github.com/webdevhemant/admin-panel.git
cd nexus-panel
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

## Project Structure

```
src/
├── assets/          # Icons, logos, brand assets
├── components/      # Shared UI components
│   ├── layout/      # App shell (sidebar, header, nav)
│   ├── data-table/  # Reusable table primitives
│   └── ui/          # shadcn/ui components
├── context/         # React context providers
├── features/        # Feature-based modules
│   ├── apps/        # App integrations page
│   ├── dashboard/   # Dashboard with charts
│   ├── errors/      # Error pages
│   ├── settings/    # Settings pages
│   ├── tasks/       # Task management
│   └── users/       # User management
├── hooks/           # Custom React hooks
├── lib/             # Utilities (cookies, errors, utils)
├── routes/          # TanStack Router file-based routes
├── stores/          # Zustand stores
└── styles/          # Global CSS and theme variables
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main dashboard with charts and KPIs |
| `/users` | User management with data table |
| `/tasks` | Task management with CRUD operations |
| `/apps` | Third-party app integrations |
| `/settings` | Profile settings |
| `/settings/account` | Account settings |
| `/settings/appearance` | Theme and font preferences |
| `/settings/notifications` | Notification preferences |
| `/settings/display` | Display density options |
| `/errors/$error` | Dynamic error pages |

## Customization

### Colors
Edit `src/styles/theme.css` to change the color palette. The theme uses OKLCH color space for perceptually uniform colors.

### Navigation
Edit `src/components/layout/data/sidebar-data.ts` to add, remove, or reorganize navigation items.

### Layout
The config drawer (gear icon in the header) lets you switch sidebar variants and layout densities at runtime.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built by [webdevhemant](https://github.com/webdevhemant)
