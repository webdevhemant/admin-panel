import { useNavigate, useRouter } from '@tanstack/react-router'
import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NotFoundError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-4'>
        <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10'>
          <Compass className='h-10 w-10 text-blue-500' />
        </div>
        <div className='text-center'>
          <p className='text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2'>
            Error 404
          </p>
          <h1 className='text-2xl font-bold tracking-tight'>Page not found</h1>
          <p className='mt-2 text-sm text-muted-foreground max-w-sm'>
            The page you&apos;re looking for doesn&apos;t exist or may have
            been moved. Double-check the URL and try again.
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
