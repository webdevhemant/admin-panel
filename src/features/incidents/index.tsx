import { useState } from 'react'
import { AlertTriangle, CheckCircle2, Clock, RefreshCw, Siren } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Textarea } from '@/components/ui/textarea'

// ─── Data ─────────────────────────────────────────────────────────────────────

type Severity = 'critical' | 'high' | 'medium' | 'low'
type IncStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved'

interface Incident {
  id: string
  title: string
  service: string
  severity: Severity
  status: IncStatus
  started: string
  resolved: string | null
  owner: string
  updates: { time: string; message: string }[]
}

const incidents: Incident[] = [
  {
    id: 'INC-0041',
    title: 'API Gateway p99 latency spike — EU region',
    service: 'api-gateway',
    severity: 'critical',
    status: 'monitoring',
    started: '2026-05-22 08:14 UTC',
    resolved: null,
    owner: 'Hemant Bendadi',
    updates: [
      { time: '08:14 UTC', message: 'Incident declared. High p99 latency detected in EU-WEST-1.' },
      { time: '08:31 UTC', message: 'Root cause identified: misconfigured load balancer health check threshold.' },
      { time: '08:55 UTC', message: 'Fix deployed. Monitoring for 30 minutes before resolving.' },
    ],
  },
  {
    id: 'INC-0040',
    title: 'Auth service elevated 5xx error rate',
    service: 'auth-service',
    severity: 'high',
    status: 'investigating',
    started: '2026-05-22 06:02 UTC',
    resolved: null,
    owner: 'Riya Sharma',
    updates: [
      { time: '06:02 UTC', message: 'PagerDuty alert fired. 4.2% error rate on POST /v2/auth/token.' },
      { time: '06:18 UTC', message: 'DB connection pool exhaustion suspected. Investigating query logs.' },
    ],
  },
  {
    id: 'INC-0039',
    title: 'Notification service delivery delays',
    service: 'notification-svc',
    severity: 'medium',
    status: 'resolved',
    started: '2026-05-21 22:10 UTC',
    resolved: '2026-05-21 23:48 UTC',
    owner: 'Aditya Kumar',
    updates: [
      { time: '22:10 UTC', message: 'Customer reports of missing email alerts. Queue depth elevated.' },
      { time: '22:44 UTC', message: 'Worker autoscaling group was misconfigured after last deploy.' },
      { time: '23:48 UTC', message: 'Queue drained. Incident resolved. Post-mortem scheduled.' },
    ],
  },
  {
    id: 'INC-0038',
    title: 'Analytics pipeline write throughput degraded',
    service: 'analytics-pipeline',
    severity: 'medium',
    status: 'resolved',
    started: '2026-05-21 14:30 UTC',
    resolved: '2026-05-21 17:05 UTC',
    owner: 'Priya Mehta',
    updates: [
      { time: '14:30 UTC', message: 'Write throughput dropped 60% after dependency upgrade.' },
      { time: '16:22 UTC', message: 'Rolled back kafka-client from v3.4.1 to v3.3.2.' },
      { time: '17:05 UTC', message: 'Throughput restored to baseline. Resolved.' },
    ],
  },
  {
    id: 'INC-0037',
    title: 'Worker job queue processing halted',
    service: 'worker-jobs',
    severity: 'high',
    status: 'resolved',
    started: '2026-05-20 10:55 UTC',
    resolved: '2026-05-20 12:18 UTC',
    owner: 'Karan Singh',
    updates: [
      { time: '10:55 UTC', message: 'Dead letter queue growing. Jobs not being consumed.' },
      { time: '11:30 UTC', message: 'OOM kill in consumer pods due to bad payload parsing loop.' },
      { time: '12:18 UTC', message: 'Patched and redeployed. Backlog cleared. Resolved.' },
    ],
  },
  {
    id: 'INC-0036',
    title: 'Deployment pipeline stuck in pending state',
    service: 'ci-cd',
    severity: 'low',
    status: 'resolved',
    started: '2026-05-19 16:45 UTC',
    resolved: '2026-05-19 17:20 UTC',
    owner: 'Neha Joshi',
    updates: [
      { time: '16:45 UTC', message: 'Three deployments stuck in "pending" for over 15 minutes.' },
      { time: '17:20 UTC', message: 'Restarted runner pods. Pipeline cleared. Resolved.' },
    ],
  },
]

// ─── Config ───────────────────────────────────────────────────────────────────

const severityCfg: Record<Severity, { cls: string; dot: string; label: string }> = {
  critical: { cls: 'bg-rose-500/10 text-rose-600 border-rose-500/25',     dot: 'bg-rose-500',   label: 'Critical' },
  high:     { cls: 'bg-orange-500/10 text-orange-600 border-orange-500/25', dot: 'bg-orange-500', label: 'High'     },
  medium:   { cls: 'bg-amber-500/10 text-amber-600 border-amber-500/25',   dot: 'bg-amber-500',  label: 'Medium'   },
  low:      { cls: 'bg-slate-500/10 text-slate-600 border-slate-500/25',   dot: 'bg-slate-400',  label: 'Low'      },
}

const statusCfg: Record<IncStatus, { cls: string; icon: React.ElementType; label: string }> = {
  investigating: { cls: 'bg-rose-500/10 text-rose-600 border-rose-500/25',     icon: AlertTriangle, label: 'Investigating' },
  identified:    { cls: 'bg-orange-500/10 text-orange-600 border-orange-500/25', icon: Clock,         label: 'Identified'    },
  monitoring:    { cls: 'bg-blue-500/10 text-blue-600 border-blue-500/25',      icon: RefreshCw,     label: 'Monitoring'    },
  resolved:      { cls: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25', icon: CheckCircle2, label: 'Resolved'  },
}

// ─── Stats strip ──────────────────────────────────────────────────────────────

function StatsStrip() {
  const active = incidents.filter((i) => i.status !== 'resolved').length
  const critical = incidents.filter((i) => i.severity === 'critical' && i.status !== 'resolved').length
  const resolved = incidents.filter((i) => i.status === 'resolved').length
  const mttr = '1h 24m'

  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
      {[
        { label: 'Active Incidents', value: active,   accent: active > 0 ? 'text-rose-600' : 'text-emerald-600' },
        { label: 'Critical',         value: critical, accent: critical > 0 ? 'text-rose-600' : 'text-muted-foreground' },
        { label: 'Resolved (7d)',     value: resolved, accent: 'text-foreground' },
        { label: 'Avg. MTTR (7d)',    value: mttr,     accent: 'text-foreground' },
      ].map((s) => (
        <Card key={s.label} className='border-0 shadow-sm'>
          <CardContent className='pt-4 pb-3'>
            <p className='text-xs text-muted-foreground'>{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.accent}`}>{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ─── Declare incident dialog ──────────────────────────────────────────────────

function DeclareIncidentDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setOpen(false) }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button size='sm' className='gap-1.5' onClick={() => setOpen(true)}>
        <Siren className='size-3.5' />
        Declare Incident
      </Button>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Declare Incident</DialogTitle>
          <DialogDescription>Fill in the details to open a new incident.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className='space-y-4 py-1'>
          <div className='space-y-1.5'>
            <Label className='text-xs font-medium'>Title</Label>
            <Input placeholder='Short description of the issue' required />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Service</Label>
              <Select required>
                <SelectTrigger className='h-9'><SelectValue placeholder='Select…' /></SelectTrigger>
                <SelectContent>
                  {['api-gateway','auth-service','worker-jobs','notification-svc','analytics-pipeline','ci-cd'].map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Severity</Label>
              <Select required>
                <SelectTrigger className='h-9'><SelectValue placeholder='Select…' /></SelectTrigger>
                <SelectContent>
                  <SelectItem value='critical'>Critical</SelectItem>
                  <SelectItem value='high'>High</SelectItem>
                  <SelectItem value='medium'>Medium</SelectItem>
                  <SelectItem value='low'>Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='space-y-1.5'>
            <Label className='text-xs font-medium'>Initial Update</Label>
            <Textarea placeholder='What do you know so far?' rows={3} />
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' size='sm' onClick={() => setOpen(false)}>Cancel</Button>
            <Button type='submit' size='sm' disabled={loading} className='min-w-28'>
              {loading ? 'Declaring…' : 'Declare Incident'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Incident detail dialog ───────────────────────────────────────────────────

function IncidentDetail({ incident, onClose }: { incident: Incident; onClose: () => void }) {
  const sev = severityCfg[incident.severity]
  const st = statusCfg[incident.status]
  const StIcon = st.icon

  return (
    <DialogContent className='sm:max-w-lg'>
      <DialogHeader>
        <div className='flex items-center gap-2 mb-1'>
          <span className='font-mono text-xs text-muted-foreground'>{incident.id}</span>
          <Badge variant='outline' className={`text-[10px] ${sev.cls}`}>
            <span className={`mr-1 size-1.5 rounded-full inline-block ${sev.dot}`} />
            {sev.label}
          </Badge>
          <Badge variant='outline' className={`text-[10px] ${st.cls}`}>
            <StIcon className='mr-1 size-3' />
            {st.label}
          </Badge>
        </div>
        <DialogTitle className='text-base leading-snug'>{incident.title}</DialogTitle>
        <DialogDescription className='flex flex-wrap gap-3 text-xs'>
          <span>Service: <strong>{incident.service}</strong></span>
          <span>Owner: <strong>{incident.owner}</strong></span>
          <span>Started: <strong>{incident.started}</strong></span>
          {incident.resolved && <span>Resolved: <strong>{incident.resolved}</strong></span>}
        </DialogDescription>
      </DialogHeader>

      <div className='space-y-2 py-1'>
        <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wide'>Timeline</p>
        <div className='relative border-l border-border pl-4 space-y-4'>
          {incident.updates.map((u, i) => (
            <div key={i} className='relative'>
              <span className='absolute -left-[19px] top-1 size-2.5 rounded-full border-2 border-background bg-primary' />
              <p className='text-[10px] font-mono text-muted-foreground'>{u.time}</p>
              <p className='text-sm mt-0.5'>{u.message}</p>
            </div>
          ))}
        </div>
      </div>

      <DialogFooter>
        <Button variant='outline' size='sm' onClick={onClose}>Close</Button>
        {incident.status !== 'resolved' && (
          <Button size='sm' className='gap-1.5'>
            <CheckCircle2 className='size-3.5' />
            Mark Resolved
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Incidents() {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all')
  const [selected, setSelected] = useState<Incident | null>(null)

  const filtered = incidents.filter((i) => {
    if (filter === 'active')   return i.status !== 'resolved'
    if (filter === 'resolved') return i.status === 'resolved'
    return true
  })

  return (
    <>
      <Header fixed>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-5 sm:gap-6'>
        {/* Page title */}
        <div className='flex flex-wrap items-end justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10'>
              <Siren className='size-5 text-rose-600 dark:text-rose-400' />
            </div>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>Incidents</h2>
              <p className='text-sm text-muted-foreground'>
                Track and manage platform incidents and outages.
              </p>
            </div>
          </div>
          <DeclareIncidentDialog />
        </div>

        <StatsStrip />

        {/* Filter tabs */}
        <div className='flex items-center gap-1 rounded-lg border bg-muted/40 p-1 w-fit'>
          {(['all', 'active', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1 text-sm font-medium capitalize transition-all duration-150 ${
                filter === f
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Incidents list */}
        <div className='space-y-3'>
          {filtered.map((inc) => {
            const sev = severityCfg[inc.severity]
            const st  = statusCfg[inc.status]
            const StIcon = st.icon
            return (
              <Card
                key={inc.id}
                className='cursor-pointer border shadow-sm transition-shadow hover:shadow-md'
                onClick={() => setSelected(inc)}
              >
                <CardContent className='flex items-start gap-4 py-4'>
                  {/* Severity dot */}
                  <div className='mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg' style={{ background: `color-mix(in srgb, ${sev.dot} 15%, transparent)` }}>
                    <span className={`size-2.5 rounded-full ${sev.dot}`} />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <span className='font-mono text-xs text-muted-foreground'>{inc.id}</span>
                      <Badge variant='outline' className={`text-[10px] px-1.5 py-0 ${sev.cls}`}>
                        {sev.label}
                      </Badge>
                      <Badge variant='outline' className={`text-[10px] px-1.5 py-0 ${st.cls} flex items-center gap-1`}>
                        <StIcon className='size-3' />
                        {st.label}
                      </Badge>
                    </div>
                    <p className='mt-1 text-sm font-semibold leading-snug'>{inc.title}</p>
                    <div className='mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground'>
                      <span>Service: <span className='font-mono'>{inc.service}</span></span>
                      <span>Owner: {inc.owner}</span>
                      <span>Started: {inc.started}</span>
                      {inc.resolved && <span className='text-emerald-600'>Resolved: {inc.resolved}</span>}
                    </div>
                  </div>

                  <div className='shrink-0 text-xs text-muted-foreground'>
                    {inc.updates.length} update{inc.updates.length !== 1 ? 's' : ''}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Main>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(v) => { if (!v) setSelected(null) }}>
        {selected && <IncidentDetail incident={selected} onClose={() => setSelected(null)} />}
      </Dialog>
    </>
  )
}
