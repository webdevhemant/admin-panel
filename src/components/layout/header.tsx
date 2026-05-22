import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/theme-provider'
import { SidebarTrigger } from '@/components/ui/sidebar'

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Header({ className, fixed, children, ...props }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    const onScroll = () => {
      setScrolled((document.body.scrollTop || document.documentElement.scrollTop) > 10)
    }
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'relative z-50 h-14',
        fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
        className,
      )}
      {...props}
    >
      {/* Glass backdrop */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 transition-all duration-300',
          scrolled && fixed
            ? isDark
              ? 'border-b border-white/[0.06] bg-[oklch(0.1_0.025_264)]/80 backdrop-blur-xl'
              : 'border-b border-black/[0.05] bg-white/80 backdrop-blur-xl'
            : isDark
              ? 'border-b border-white/[0.04] bg-[oklch(0.1_0.025_264)]/60'
              : 'border-b border-black/[0.04] bg-white/60',
        )}
      />

      {/* Subtle top accent line in dark mode */}
      {isDark && (
        <div
          aria-hidden
          className='pointer-events-none absolute inset-x-0 top-0 h-px'
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 40%, rgba(139,92,246,0.4) 60%, transparent 100%)',
          }}
        />
      )}

      <div className='relative flex h-full items-center gap-2 px-4'>
        <SidebarTrigger
          className={cn(
            'size-8 shrink-0 rounded-lg transition-colors duration-150',
            isDark
              ? 'text-white/50 hover:bg-white/[0.07] hover:text-white/90'
              : 'text-gray-500 hover:bg-black/[0.05] hover:text-gray-900',
          )}
        />

        {/* Divider */}
        <div
          className='h-5 w-px shrink-0'
          style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        />

        {children}
      </div>
    </header>
  )
}
