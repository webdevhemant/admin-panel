import { useNavigate, useRouter } from '@tanstack/react-router'
import { ShieldOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function UnauthorisedError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-4'>
        <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10'>
          <ShieldOff className='h-10 w-10 text-amber-500' />
        </div>
        <div className='text-center'>
          <p className='text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2'>
            Error 401
          </p>
          <h1 className='text-2xl font-bold tracking-tight'>
            Unauthorized access
          </h1>
          <p className='mt-2 text-sm text-muted-foreground max-w-sm'>
            You don&apos;t have the required credentials to access this
            resource. Please verify your permissions.
          </p>
        </div>
        <div className='mt-2 flex gap-3'>
          <Button variant='outline' size='sm' onClick={() => history.go(-1)}>
            Go Back
          </Button>
          <Button size='sm' onClick={() => navigate({ to: '/' })}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
