# Changelog

All notable changes to Nexus Panel are documented here.

## [1.0.0] — 2026-05-22

### Added
- Initial release of Nexus Panel
- Dashboard with revenue charts, KPI cards, and recent sales
- User management with full CRUD, filtering, sorting, and bulk actions
- Task management with status tracking, import/export, and bulk operations
- App integrations overview page
- Settings: profile, account, appearance, notifications, and display tabs
- Light/dark/system theme with indigo/violet OKLCH color palette
- Multiple sidebar layout variants (sidebar, inset, floating)
- Layout density options (default, compact, full)
- Responsive design for mobile and desktop
- TanStack Router v1 file-based routing
- TanStack Query for server state management
- Zustand for client state
- React Hook Form + Zod for form validation
- Recharts for data visualization
- shadcn/ui component library
- Tailwind CSS v4 with OKLCH color space
- Built with React 19 and Vite 8

### Removed
- Clerk authentication (app is now fully publicly accessible)
- Sign-in, sign-up, forgot-password, and OTP pages
- Chats page
- Help Center placeholder page
