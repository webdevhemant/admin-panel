import * as React from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Check, ChevronDown, ChevronRight, LogOut, Bell, User2, Settings, Plus } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/theme-provider'
import { useLayout } from '@/context/layout-provider'
import { sidebarData } from './data/sidebar-data'
import type { NavGroup, NavCollapsible, NavLink, NavItem } from './types'

const GROUP_ACCENTS: Record<string, {
  color: string
  darkBg: string
  darkGlow: string
  lightColor: string
  lightBg: string
  dot: string
}> = {
  Core: {
    color: '#a5b4fc',
    darkBg: 'rgba(99,102,241,0.15)',
    darkGlow: '0 0 14px rgba(99,102,241,0.45)',
    lightColor: '#4f46e5',
    lightBg: '#eef2ff',
    dot: '#6366f1',
  },
  System: {
    color: '#fda4af',
    darkBg: 'rgba(244,63,94,0.15)',
    darkGlow: '0 0 14px rgba(244,63,94,0.4)',
    lightColor: '#be123c',
    lightBg: '#fff1f2',
    dot: '#f43f5e',
  },
  Preferences: {
    color: '#6ee7b7',
    darkBg: 'rgba(16,185,129,0.15)',
    darkGlow: '0 0 14px rgba(16,185,129,0.4)',
    lightColor: '#047857',
    lightBg: '#ecfdf5',
    dot: '#10b981',
  },
}
const FALLBACK_ACCENT = GROUP_ACCENTS.Core

// ─── Root ────────────────────────────────────────────────────────────────────

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      {/* Aurora glow — dark mode only */}
      {isDark && (
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 z-0'
          style={{
            background:
              'radial-gradient(ellipse 80% 40% at 0% 0%, rgba(99,102,241,0.14) 0%, transparent 100%)',
          }}
        />
      )}

      <SidebarHeader
        className={cn(
          'relative z-10 pt-4 pb-3',
          isDark ? 'border-b border-white/[0.07]' : 'border-b border-black/[0.06]',
        )}
      >
        <BrandHeader isDark={isDark} />
      </SidebarHeader>

      <SidebarContent className='relative z-10 gap-0 px-2 py-2'>
        {sidebarData.navGroups.map((group) => (
          <NavGroupSection key={group.title} group={group} isDark={isDark} />
        ))}
      </SidebarContent>

      <SidebarFooter
        className={cn(
          'relative z-10 py-3',
          isDark ? 'border-t border-white/[0.07]' : 'border-t border-black/[0.06]',
        )}
      >
        <UserCard isDark={isDark} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

// ─── Brand / Team Switcher ────────────────────────────────────────────────────

function BrandHeader({ isDark }: { isDark: boolean }) {
  const { isMobile, state } = useSidebar()
  const isCollapsed = state === 'collapsed' && !isMobile
  const [activeTeam, setActiveTeam] = React.useState(sidebarData.teams[0])
  const Logo = activeTeam.logo

  const logoStyle = isDark
    ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 16px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.15)' }
    : { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 2px 8px rgba(99,102,241,0.35)' }

  const dropdownContent = (
    <DropdownMenuContent
      align='start'
      side={isMobile ? 'bottom' : 'right'}
      sideOffset={6}
      className='min-w-56 rounded-xl'
    >
      <DropdownMenuLabel className='text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70'>
        Workspaces
      </DropdownMenuLabel>
      {sidebarData.teams.map((team) => {
        const TLogo = team.logo
        return (
          <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className='gap-2.5 p-2'>
            <div className='flex size-7 items-center justify-center rounded-lg border bg-background'>
              <TLogo className='size-3.5 shrink-0' />
            </div>
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-medium'>{team.name}</p>
              <p className='truncate text-xs text-muted-foreground'>{team.plan}</p>
            </div>
            {activeTeam.name === team.name && <Check className='size-3.5 text-primary' />}
          </DropdownMenuItem>
        )
      })}
      <DropdownMenuSeparator />
      <DropdownMenuItem className='gap-2.5 p-2'>
        <div className='flex size-7 items-center justify-center rounded-lg border border-dashed bg-background'>
          <Plus className='size-3.5' />
        </div>
        <span className='text-sm font-medium text-muted-foreground'>New workspace</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )

  if (isCollapsed) {
    return (
      <div className='flex justify-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              title={activeTeam.name}
              className='flex size-9 items-center justify-center rounded-xl outline-none transition-opacity duration-150 hover:opacity-80'
              style={logoStyle}
            >
              <Logo className='size-4 text-white' />
            </button>
          </DropdownMenuTrigger>
          {dropdownContent}
        </DropdownMenu>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'group flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left outline-none transition-all duration-200',
            isDark
              ? 'hover:bg-white/[0.05] focus-visible:ring-1 focus-visible:ring-white/20'
              : 'hover:bg-black/[0.04] focus-visible:ring-1 focus-visible:ring-black/10',
          )}
        >
          <div className='flex size-9 shrink-0 items-center justify-center rounded-xl' style={logoStyle}>
            <Logo className='size-4 text-white' />
          </div>
          <div className='min-w-0 flex-1'>
            <p
              className={cn('truncate text-sm font-bold leading-none', isDark ? 'text-white' : 'text-gray-900')}
              style={isDark ? { textShadow: '0 0 20px rgba(165,180,252,0.4)' } : undefined}
            >
              {activeTeam.name}
            </p>
            <p className={cn('mt-0.5 truncate text-[10px]', isDark ? 'text-white/40' : 'text-gray-400')}>
              {activeTeam.plan}
            </p>
          </div>
          <ChevronDown
            className={cn(
              'size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180',
              isDark ? 'text-white/30' : 'text-gray-400',
            )}
          />
        </button>
      </DropdownMenuTrigger>
      {dropdownContent}
    </DropdownMenu>
  )
}

// ─── Nav Group ────────────────────────────────────────────────────────────────

function NavGroupSection({ group, isDark }: { group: NavGroup; isDark: boolean }) {
  const accent = GROUP_ACCENTS[group.title] ?? FALLBACK_ACCENT
  const href = useLocation({ select: (l) => l.href })
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed' && !isMobile

  return (
    <div className='mb-1'>
      {/* Section label */}
      {!isCollapsed && (
        <div className='mb-1 flex items-center gap-1.5 px-2 pt-3 pb-1'>
          <span
            className='size-1.5 shrink-0 rounded-full'
            style={{ backgroundColor: accent.dot }}
          />
          <span
            className='text-[9px] font-semibold uppercase tracking-[0.18em]'
            style={{ color: isDark ? `${accent.color}99` : `${accent.lightColor}99` }}
          >
            {group.title}
          </span>
        </div>
      )}

      <div className='space-y-0.5'>
        {group.items.map((item) => {
          const key = `${item.title}-${item.url ?? ''}`
          if (!item.items) {
            return (
              <NavLinkItem
                key={key}
                item={item as NavLink}
                href={href}
                isDark={isDark}
                accent={accent}
              />
            )
          }
          if (isCollapsed) {
            return (
              <NavCollapsedDropdown
                key={key}
                item={item as NavCollapsible}
                href={href}
                isDark={isDark}
                accent={accent}
              />
            )
          }
          return (
            <NavCollapsibleItem
              key={key}
              item={item as NavCollapsible}
              href={href}
              isDark={isDark}
              accent={accent}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function isItemActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url ||
    href.split('?')[0] === item.url ||
    !!item.items?.some((i) => i.url === href) ||
    (mainNav &&
      href.split('/')[1] !== '' &&
      href.split('/')[1] === item.url?.split('/')[1])
  )
}

type AccentConfig = (typeof GROUP_ACCENTS)[string]

function ItemIcon({
  icon: Icon,
  isActive,
  isDark,
  accent,
  small,
  collapsed,
}: {
  icon: React.ElementType
  isActive: boolean
  isDark: boolean
  accent: AccentConfig
  small?: boolean
  collapsed?: boolean
}) {
  if (collapsed) {
    return (
      <span
        className='flex size-8 shrink-0 items-center justify-center rounded-xl'
        style={
          isActive
            ? isDark
              ? { background: accent.darkBg, boxShadow: accent.darkGlow, color: accent.color }
              : { background: accent.lightBg, color: accent.lightColor }
            : { color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }
        }
      >
        <Icon className='size-[18px]' />
      </span>
    )
  }
  const size = small ? 'size-3 p-1.5 rounded-md' : 'size-4 p-1.5 rounded-lg'
  return (
    <span
      className={cn('flex shrink-0 items-center justify-center', size)}
      style={
        isActive
          ? isDark
            ? { background: accent.darkBg, boxShadow: accent.darkGlow, color: accent.color }
            : { background: accent.lightBg, color: accent.lightColor }
          : { color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }
      }
    >
      <Icon className={small ? 'size-3' : 'size-3.5'} />
    </span>
  )
}

// ─── Nav Link ─────────────────────────────────────────────────────────────────

function NavLinkItem({
  item,
  href,
  isDark,
  accent,
}: {
  item: NavLink
  href: string
  isDark: boolean
  accent: AccentConfig
}) {
  const { setOpenMobile, state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed' && !isMobile
  const isActive = isItemActive(href, item)

  if (isCollapsed) {
    return (
      <Link
        to={item.url}
        onClick={() => setOpenMobile(false)}
        title={item.title}
        className='relative flex w-full items-center justify-center rounded-xl py-1 outline-none transition-all duration-150'
      >
        {!isActive && (
          <span className={cn('absolute inset-0 rounded-xl opacity-0 transition-opacity duration-150 hover:opacity-100', isDark ? 'bg-white/[0.04]' : 'bg-black/[0.03]')} />
        )}
        {item.icon && <ItemIcon icon={item.icon} isActive={isActive} isDark={isDark} accent={accent} collapsed />}
      </Link>
    )
  }

  return (
    <Link
      to={item.url}
      onClick={() => setOpenMobile(false)}
      className={cn(
        'group relative flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-sm font-medium outline-none transition-all duration-150',
        isActive
          ? isDark
            ? 'text-white'
            : 'text-gray-900'
          : isDark
            ? 'text-white/50 hover:text-white/80'
            : 'text-gray-500 hover:text-gray-700',
      )}
      style={
        isActive
          ? isDark
            ? { background: accent.darkBg }
            : { background: accent.lightBg }
          : undefined
      }
    >
      {/* Active left bar */}
      {isActive && (
        <span
          className='absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full'
          style={
            isDark
              ? { background: accent.color, boxShadow: `0 0 8px ${accent.color}` }
              : { background: accent.lightColor }
          }
        />
      )}

      {/* Hover bg */}
      {!isActive && (
        <span
          className={cn(
            'absolute inset-0 rounded-xl opacity-0 transition-opacity duration-150 group-hover:opacity-100',
            isDark ? 'bg-white/[0.04]' : 'bg-black/[0.03]',
          )}
        />
      )}

      {item.icon && (
        <ItemIcon icon={item.icon} isActive={isActive} isDark={isDark} accent={accent} />
      )}

      <span className='truncate'>{item.title}</span>

      {item.badge && (
        <span
          className='ms-auto rounded-full px-1.5 py-0.5 text-[9px] font-bold'
          style={
            isDark
              ? { background: accent.darkBg, color: accent.color }
              : { background: accent.lightBg, color: accent.lightColor }
          }
        >
          {item.badge}
        </span>
      )}
    </Link>
  )
}

// ─── Nav Collapsible ──────────────────────────────────────────────────────────

function NavCollapsibleItem({
  item,
  href,
  isDark,
  accent,
}: {
  item: NavCollapsible
  href: string
  isDark: boolean
  accent: AccentConfig
}) {
  const { setOpenMobile } = useSidebar()
  const isActive = isItemActive(href, item, true)
  const [open, setOpen] = React.useState(isActive)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={cn(
            'group relative flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-sm font-medium outline-none transition-all duration-150',
            isActive
              ? isDark
                ? 'text-white'
                : 'text-gray-900'
              : isDark
                ? 'text-white/50 hover:text-white/80'
                : 'text-gray-500 hover:text-gray-700',
          )}
          style={
            isActive
              ? isDark
                ? { background: accent.darkBg }
                : { background: accent.lightBg }
              : undefined
          }
        >
          {isActive && (
            <span
              className='absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full'
              style={
                isDark
                  ? { background: accent.color, boxShadow: `0 0 8px ${accent.color}` }
                  : { background: accent.lightColor }
              }
            />
          )}
          {!isActive && (
            <span
              className={cn(
                'absolute inset-0 rounded-xl opacity-0 transition-opacity duration-150 group-hover:opacity-100',
                isDark ? 'bg-white/[0.04]' : 'bg-black/[0.03]',
              )}
            />
          )}

          {item.icon && (
            <ItemIcon icon={item.icon} isActive={isActive} isDark={isDark} accent={accent} />
          )}

          <span className='flex-1 truncate text-left'>{item.title}</span>

          {item.badge && (
            <span
              className='rounded-full px-1.5 py-0.5 text-[9px] font-bold'
              style={
                isDark
                  ? { background: accent.darkBg, color: accent.color }
                  : { background: accent.lightBg, color: accent.lightColor }
              }
            >
              {item.badge}
            </span>
          )}

          <ChevronRight
            className={cn(
              'size-3.5 shrink-0 transition-transform duration-200',
              open ? 'rotate-90' : '',
              isActive
                ? isDark ? 'text-white/60' : 'text-gray-600'
                : isDark ? 'text-white/25' : 'text-gray-400',
            )}
          />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div
          className='ms-6 mt-0.5 space-y-0.5 border-l pl-3'
          style={{ borderColor: isDark ? `${accent.color}25` : `${accent.lightColor}20` }}
        >
          {item.items.map((sub) => (
            <Link
              key={`${sub.title}-${sub.url}`}
              to={sub.url}
              onClick={() => setOpenMobile(false)}
              className={cn(
                'group relative flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium outline-none transition-all duration-150',
                isItemActive(href, { ...sub, items: undefined } as NavLink)
                  ? isDark
                    ? 'text-white'
                    : 'text-gray-900'
                  : isDark
                    ? 'text-white/40 hover:text-white/70'
                    : 'text-gray-400 hover:text-gray-700',
              )}
              style={
                isItemActive(href, { ...sub, items: undefined } as NavLink)
                  ? isDark
                    ? { background: accent.darkBg }
                    : { background: accent.lightBg }
                  : undefined
              }
            >
              {!isItemActive(href, { ...sub, items: undefined } as NavLink) && (
                <span
                  className={cn(
                    'absolute inset-0 rounded-lg opacity-0 transition-opacity duration-150 group-hover:opacity-100',
                    isDark ? 'bg-white/[0.04]' : 'bg-black/[0.03]',
                  )}
                />
              )}
              {sub.icon && (
                <ItemIcon
                  icon={sub.icon}
                  isActive={isItemActive(href, { ...sub, items: undefined } as NavLink)}
                  isDark={isDark}
                  accent={accent}
                  small
                />
              )}
              <span className='truncate'>{sub.title}</span>
              {sub.badge && (
                <span
                  className='ms-auto rounded-full px-1 py-0.5 text-[9px] font-bold'
                  style={
                    isDark
                      ? { background: accent.darkBg, color: accent.color }
                      : { background: accent.lightBg, color: accent.lightColor }
                  }
                >
                  {sub.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── Collapsed dropdown ───────────────────────────────────────────────────────

function NavCollapsedDropdown({
  item,
  href,
  isDark,
  accent,
}: {
  item: NavCollapsible
  href: string
  isDark: boolean
  accent: AccentConfig
}) {
  const isActive = isItemActive(href, item)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'group relative flex w-full items-center justify-center rounded-xl p-2 outline-none transition-all duration-150',
          )}
          style={isActive ? (isDark ? { background: accent.darkBg } : { background: accent.lightBg }) : undefined}
          title={item.title}
        >
          {!isActive && (
            <span
              className={cn(
                'absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100',
                isDark ? 'bg-white/[0.04]' : 'bg-black/[0.03]',
              )}
            />
          )}
          {item.icon && (
            <ItemIcon icon={item.icon} isActive={isActive} isDark={isDark} accent={accent} collapsed />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' align='start' sideOffset={4} className='min-w-44 rounded-xl'>
        <DropdownMenuLabel className='text-[10px] font-semibold uppercase tracking-widest text-muted-foreground'>
          {item.title}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {item.items.map((sub) => (
          <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
            <Link
              to={sub.url}
              className={cn(isItemActive(href, { ...sub, items: undefined } as NavLink) ? 'bg-secondary' : '')}
            >
              {sub.icon && <sub.icon className='size-4' />}
              <span>{sub.title}</span>
              {sub.badge && <span className='ms-auto text-xs'>{sub.badge}</span>}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── User Card ────────────────────────────────────────────────────────────────

function UserCard({ isDark }: { isDark: boolean }) {
  const { isMobile, state } = useSidebar()
  const isCollapsed = state === 'collapsed' && !isMobile
  const { user } = sidebarData
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const avatarFallbackStyle = isDark
    ? { background: 'rgba(99,102,241,0.25)', color: '#a5b4fc' }
    : { background: '#eef2ff', color: '#4f46e5' }

  const dropdownContent = (
    <DropdownMenuContent
      className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl'
      side={isMobile ? 'bottom' : 'top'}
      align='end'
      sideOffset={6}
    >
      <DropdownMenuLabel className='p-0 font-normal'>
        <div className='flex items-center gap-3 rounded-lg bg-muted/50 p-3'>
          <Avatar className='size-9 rounded-xl'>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className='rounded-xl text-xs'>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-semibold'>{user.name}</p>
            <p className='text-xs text-muted-foreground'>{user.email}</p>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link to='/settings'><User2 className='size-4' />Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/settings/notifications'><Bell className='size-4' />Notifications</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/settings/appearance'><Settings className='size-4' />Preferences</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className='text-destructive focus:bg-destructive/10 focus:text-destructive'>
        <LogOut className='size-4' />Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  )

  if (isCollapsed) {
    return (
      <div className='flex justify-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button title={user.name} className='relative outline-none transition-opacity duration-150 hover:opacity-80'>
              <Avatar className='size-8 rounded-xl'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className='rounded-xl text-[10px] font-bold' style={avatarFallbackStyle}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span
                className='absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2'
                style={{ background: '#10b981', borderColor: 'var(--sidebar)' }}
              />
            </button>
          </DropdownMenuTrigger>
          {dropdownContent}
        </DropdownMenu>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left outline-none transition-all duration-150',
            isDark
              ? 'hover:bg-white/[0.05] focus-visible:ring-1 focus-visible:ring-white/20'
              : 'hover:bg-black/[0.04] focus-visible:ring-1 focus-visible:ring-black/10',
          )}
        >
          <div className='relative shrink-0'>
            <Avatar className='size-8 rounded-xl'>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback
                className='rounded-xl text-[10px] font-bold'
                style={
                  isDark
                    ? { background: 'rgba(99,102,241,0.25)', color: '#a5b4fc' }
                    : { background: '#eef2ff', color: '#4f46e5' }
                }
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Online dot */}
            <span
              className='absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2'
              style={
                isDark
                  ? { background: '#10b981', borderColor: 'var(--sidebar)' }
                  : { background: '#10b981', borderColor: 'var(--sidebar)' }
              }
            />
          </div>

          <div className='min-w-0 flex-1'>
            <p
              className={cn('truncate text-xs font-semibold', isDark ? 'text-white' : 'text-gray-900')}
            >
              {user.name}
            </p>
            <p className={cn('truncate text-[10px]', isDark ? 'text-white/35' : 'text-gray-400')}>
              {user.email}
            </p>
          </div>

          <ChevronDown
            className={cn(
              'size-3 shrink-0 opacity-0 transition-all duration-150 group-hover:opacity-100',
              isDark ? 'text-white/40' : 'text-gray-400',
            )}
          />
        </button>
      </DropdownMenuTrigger>
      {dropdownContent}
    </DropdownMenu>
  )
}
