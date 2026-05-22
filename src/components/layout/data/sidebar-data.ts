import {
  Activity,
  Ban,
  Bell,
  FileQuestion,
  HardHat,
  LayoutDashboard,
  Layers,
  ListChecks,
  Monitor,
  Palette,
  ServerCrash,
  Settings2,
  ShieldAlert,
  Siren,
  UserCircle,
  Users2,
  Wrench,
  Zap,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Hemant Bendadi',
    email: 'hemant.dev.upwork@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    { name: 'Horizon Panel', logo: Activity,  plan: 'Enterprise' },
    { name: 'Acme Inc',    logo: Layers,    plan: 'Pro'        },
    { name: 'Acme Corp.',  logo: Zap,       plan: 'Startup'    },
  ],
  navGroups: [
    {
      title: 'Core',
      items: [
        { title: 'Dashboard', url: '/',          icon: LayoutDashboard },
        { title: 'Tasks',     url: '/tasks',      icon: ListChecks      },
        { title: 'Users',     url: '/users',      icon: Users2          },
        { title: 'Incidents', url: '/incidents',  icon: Siren           },
      ],
    },
    {
      title: 'System',
      items: [
        {
          title: 'Error Pages',
          icon: ShieldAlert,
          items: [
            { title: 'Unauthorized',          url: '/errors/unauthorized',          icon: Ban         },
            { title: 'Forbidden',             url: '/errors/forbidden',             icon: ShieldAlert },
            { title: 'Not Found',             url: '/errors/not-found',             icon: FileQuestion },
            { title: 'Internal Server Error', url: '/errors/internal-server-error', icon: ServerCrash },
            { title: 'Maintenance',           url: '/errors/maintenance-error',     icon: HardHat     },
          ],
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          title: 'Settings',
          icon: Settings2,
          items: [
            { title: 'Profile',        url: '/settings',               icon: UserCircle },
            { title: 'Account',        url: '/settings/account',       icon: Wrench     },
            { title: 'Appearance',     url: '/settings/appearance',    icon: Palette    },
            { title: 'Notifications',  url: '/settings/notifications', icon: Bell       },
            { title: 'Display',        url: '/settings/display',       icon: Monitor    },
          ],
        },
      ],
    },
  ],
}
