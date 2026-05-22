import { Badge } from '@/components/ui/badge'
import { GitBranch, Globe, Server } from 'lucide-react'

const deploys = [
  {
    id: 'd-7f3a1',
    app: 'api-gateway',
    branch: 'main',
    env: 'production',
    status: 'success',
    author: 'Hemant B.',
    ago: '2 min ago',
  },
  {
    id: 'd-6e2b9',
    app: 'auth-service',
    branch: 'feat/oauth2',
    env: 'staging',
    status: 'running',
    author: 'Riya S.',
    ago: '18 min ago',
  },
  {
    id: 'd-5c4d8',
    app: 'dashboard-ui',
    branch: 'fix/sidebar',
    env: 'preview',
    status: 'success',
    author: 'Aditya K.',
    ago: '1 hr ago',
  },
  {
    id: 'd-4b7f2',
    app: 'worker-jobs',
    branch: 'main',
    env: 'production',
    status: 'failed',
    author: 'Hemant B.',
    ago: '3 hr ago',
  },
  {
    id: 'd-3a9c6',
    app: 'notification-svc',
    branch: 'chore/bump-deps',
    env: 'staging',
    status: 'success',
    author: 'Priya M.',
    ago: '6 hr ago',
  },
]

const statusConfig: Record<string, { label: string; cls: string; dot: string }> = {
  success: { label: 'Deployed', cls: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', dot: 'bg-emerald-500' },
  running: { label: 'Deploying', cls: 'bg-blue-500/10 text-blue-600 border-blue-500/20', dot: 'bg-blue-500 animate-pulse' },
  failed:  { label: 'Failed',   cls: 'bg-rose-500/10 text-rose-600 border-rose-500/20',   dot: 'bg-rose-500' },
}

const envIcon: Record<string, React.ElementType> = {
  production: Globe,
  staging:    Server,
  preview:    Server,
}

export function RecentSales() {
  return (
    <div className='divide-y divide-border'>
      {deploys.map((d) => {
        const s = statusConfig[d.status]
        const EnvIcon = envIcon[d.env] ?? Server
        return (
          <div key={d.id} className='flex items-start gap-3 py-3 first:pt-0 last:pb-0'>
            {/* Status dot + icon */}
            <div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted'>
              <EnvIcon className='size-3.5 text-muted-foreground' />
            </div>

            <div className='flex flex-1 items-center justify-between gap-2 min-w-0'>
              <div className='min-w-0'>
                <p className='text-sm font-semibold truncate'>{d.app}</p>
                <div className='flex items-center gap-1 mt-0.5'>
                  <GitBranch className='size-3 text-muted-foreground shrink-0' />
                  <span className='text-[11px] text-muted-foreground truncate font-mono'>{d.branch}</span>
                </div>
                <p className='text-[10px] text-muted-foreground/70 mt-0.5'>{d.author} · {d.ago}</p>
              </div>

              <div className='flex flex-col items-end gap-1 shrink-0'>
                <Badge variant='outline' className={`text-[10px] px-1.5 py-0 h-4 ${s.cls}`}>
                  <span className={`mr-1 size-1.5 rounded-full inline-block ${s.dot}`} />
                  {s.label}
                </Badge>
                <span className='text-[10px] font-mono text-muted-foreground/60'>{d.id}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
