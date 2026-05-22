import { Link } from '@tanstack/react-router'
import { Bell, LogOut, Settings, User2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/context/theme-provider'
import { cn } from '@/lib/utils'

const USER = {
  name: 'Hemant Bendadi',
  email: 'hemant.dev.upwork@gmail.com',
  avatar: '/avatars/shadcn.jpg',
  initials: 'HB',
}

export function ProfileDropdown() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'group flex items-center gap-2 rounded-full py-1 ps-1 pe-2.5 outline-none transition-all duration-200',
            isDark
              ? 'ring-1 ring-white/[0.08] hover:ring-white/[0.15] hover:bg-white/[0.05]'
              : 'ring-1 ring-black/[0.07] hover:ring-black/[0.12] hover:bg-black/[0.03]',
          )}
        >
          {/* Avatar with online dot */}
          <div className='relative'>
            <Avatar className='size-6 rounded-full'>
              <AvatarImage src={USER.avatar} alt={USER.name} />
              <AvatarFallback
                className='rounded-full text-[9px] font-bold'
                style={
                  isDark
                    ? { background: 'rgba(99,102,241,0.3)', color: '#a5b4fc' }
                    : { background: '#eef2ff', color: '#4f46e5' }
                }
              >
                {USER.initials}
              </AvatarFallback>
            </Avatar>
            <span
              className='absolute -right-px -bottom-px size-2 rounded-full border border-background'
              style={{ background: '#10b981' }}
            />
          </div>

          {/* Name */}
          <span
            className={cn(
              'hidden text-xs font-semibold sm:block',
              isDark ? 'text-white/80' : 'text-gray-700',
            )}
          >
            {USER.name.split(' ')[0]}
          </span>

          {/* Chevron-like dots */}
          <span
            className={cn(
              'hidden text-[10px] sm:block',
              isDark ? 'text-white/25' : 'text-gray-300',
            )}
          >
            ▾
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-60 rounded-xl'
        align='end'
        sideOffset={8}
      >
        {/* User info */}
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-3 rounded-lg bg-muted/50 p-3'>
            <div className='relative'>
              <Avatar className='size-10 rounded-xl'>
                <AvatarImage src={USER.avatar} alt={USER.name} />
                <AvatarFallback className='rounded-xl text-xs font-bold'>
                  {USER.initials}
                </AvatarFallback>
              </Avatar>
              <span
                className='absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-background'
                style={{ background: '#10b981' }}
              />
            </div>
            <div className='min-w-0'>
              <p className='truncate text-sm font-semibold'>{USER.name}</p>
              <p className='truncate text-[11px] text-muted-foreground'>{USER.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/settings'>
              <User2 className='size-4' />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/settings/notifications'>
              <Bell className='size-4' />
              Notifications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/settings/appearance'>
              <Settings className='size-4' />
              Preferences
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='text-destructive focus:bg-destructive/10 focus:text-destructive'>
          <LogOut className='size-4' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
