import { useNavigate, useRouter } from '@tanstack/react-router'
import { ServerCrash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
  minimal?: boolean
}

export function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-4'>
        {!minimal && (
          <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10'>
            <ServerCrash className='h-10 w-10 text-destructive' />
          </div>
        )}
        <div className='text-center'>
          {!minimal && (
            <p className='text-xs font-semibold uppercase tracking-widest text-destructive mb-2'>
              Error 500
            </p>
          )}
          <h1 className='text-2xl font-bold tracking-tight'>
            Something went wrong
          </h1>
          <p className='mt-2 text-sm text-muted-foreground max-w-sm'>
            An unexpected error occurred on our end. Please try again — if the
            problem persists, contact support.
          </p>
        </div>
        {!minimal && (
          <div className='mt-2 flex gap-3'>
            <Button variant='outline' size='sm' onClick={() => history.go(-1)}>
              Go Back
            </Button>
            <Button size='sm' onClick={() => navigate({ to: '/' })}>
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
