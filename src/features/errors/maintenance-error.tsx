import { HardHat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function MaintenanceError() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-4'>
        <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/10'>
          <HardHat className='h-10 w-10 text-violet-500' />
        </div>
        <div className='text-center'>
          <p className='text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2'>
            Error 503
          </p>
          <h1 className='text-2xl font-bold tracking-tight'>
            Under maintenance
          </h1>
          <p className='mt-2 text-sm text-muted-foreground max-w-sm'>
            We&apos;re making improvements to bring you a better experience.
            We&apos;ll be back online shortly.
          </p>
          <div className='mt-3 flex justify-center'>
            <Badge variant='secondary' className='gap-1.5 text-xs'>
              <span className='h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse' />
              Estimated downtime: ~30 min
            </Badge>
          </div>
        </div>
        <div className='mt-2'>
          <Button variant='outline' size='sm'>
            Learn more
          </Button>
        </div>
      </div>
    </div>
  )
}
