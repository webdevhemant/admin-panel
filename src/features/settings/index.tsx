import { Outlet } from '@tanstack/react-router'
import { Monitor, Bell, Palette, Wrench, UserCircle } from 'lucide-react'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { SidebarNav } from './components/sidebar-nav'

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/settings',
    icon: <UserCircle size={16} />,
  },
  {
    title: 'Account',
    href: '/settings/account',
    icon: <Wrench size={16} />,
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
    icon: <Palette size={16} />,
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: <Bell size={16} />,
  },
  {
    title: 'Display',
    href: '/settings/display',
    icon: <Monitor size={16} />,
  },
]

export function Settings() {
  return (
    <>
      <Header>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main fixed>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Settings
          </h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Manage your account settings and preferences.
          </p>
        </div>
        <div className='flex flex-1 flex-col overflow-hidden lg:flex-row lg:gap-10'>
          <aside className='top-0 shrink-0 lg:sticky lg:w-48'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex w-full overflow-y-hidden'>
            <Outlet />
          </div>
        </div>
      </Main>
    </>
  )
}
