import { useEffect } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/theme-provider'

const OPTIONS = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'system', icon: Monitor, label: 'System' },
  { value: 'dark', icon: Moon, label: 'Dark' },
] as const

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff'
    const meta = document.querySelector("meta[name='theme-color']")
    if (meta) meta.setAttribute('content', themeColor)
  }, [theme])

  return (
    <div
      className={cn(
        'flex items-center rounded-full p-0.5 gap-0',
        isDark
          ? 'bg-white/[0.07] ring-1 ring-white/[0.08]'
          : 'bg-black/[0.05] ring-1 ring-black/[0.07]',
      )}
      role='group'
      aria-label='Select color theme'
    >
      {OPTIONS.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={isActive}
            className={cn(
              'relative flex items-center justify-center rounded-full transition-all duration-200 size-7',
              isActive
                ? isDark
                  ? 'text-white'
                  : 'text-gray-900'
                : isDark
                  ? 'text-white/30 hover:text-white/60'
                  : 'text-gray-400 hover:text-gray-600',
            )}
          >
            {/* Active pill background */}
            {isActive && (
              <span
                className='absolute inset-0 rounded-full'
                style={
                  isDark
                    ? {
                        background: 'rgba(99,102,241,0.2)',
                        boxShadow: '0 0 10px rgba(99,102,241,0.35)',
                      }
                    : {
                        background: '#ffffff',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                      }
                }
              />
            )}
            <Icon className='relative z-10 size-3.5' />
          </button>
        )
      })}
    </div>
  )
}
