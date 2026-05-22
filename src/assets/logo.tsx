import { type SVGProps } from 'react'
import { cn } from '@/lib/utils'

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      id='nexus-panel-logo'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      width='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={cn('size-6', className)}
      {...props}
    >
      <title>Nexus Panel</title>
      <polygon points='12 2 2 7 12 12 22 7 12 2' />
      <polyline points='2 17 12 22 22 17' />
      <polyline points='2 12 12 17 22 12' />
    </svg>
  )
}
