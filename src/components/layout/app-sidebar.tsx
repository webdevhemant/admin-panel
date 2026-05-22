import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  return (
    <Sidebar
      collapsible={collapsible}
      variant={variant}
      className='border-r border-border/50'
    >
      <SidebarHeader className='px-3 pb-2 pt-3'>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarSeparator className='mx-3 opacity-40' />
      <SidebarContent className='px-2 py-2'>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarSeparator className='mx-3 opacity-40' />
      <SidebarFooter className='px-3 py-3'>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
