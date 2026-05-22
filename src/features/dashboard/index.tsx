import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import {
  ArrowDown,
  ArrowUp,
  Download,
  FileBarChart,
  Loader2,
  ShieldCheck,
  Timer,
  Users,
  Zap,
} from 'lucide-react'

// ─── Stat cards data ──────────────────────────────────────────────────────────

const stats = [
  {
    label: 'Monthly Active Users',
    value: '28,491',
    delta: '+12.3%',
    up: true,
    sub: 'from last month',
    icon: Users,
    gradient: 'from-blue-500/5 to-blue-500/10',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'API Requests',
    value: '1.24M',
    delta: '+34.7%',
    up: true,
    sub: 'from last month',
    icon: Zap,
    gradient: 'from-violet-500/5 to-violet-500/10',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    label: 'Avg. Response Time',
    value: '142 ms',
    delta: '−18 ms',
    up: true,
    sub: 'faster than last month',
    icon: Timer,
    gradient: 'from-emerald-500/5 to-emerald-500/10',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    label: 'Error Rate',
    value: '0.08%',
    delta: '−0.02%',
    up: true,
    sub: 'lower than last month',
    icon: ShieldCheck,
    gradient: 'from-rose-500/5 to-rose-500/10',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
]

// ─── Export dialog ────────────────────────────────────────────────────────────

const EXPORT_SECTIONS = [
  { id: 'mau', label: 'Monthly Active Users' },
  { id: 'api', label: 'API Request Logs' },
  { id: 'perf', label: 'Performance Metrics' },
  { id: 'errors', label: 'Error Reports' },
  { id: 'deploys', label: 'Deployment History' },
]

function ExportDialog() {
  const [format, setFormat] = useState('csv')
  const [range, setRange] = useState('30d')
  const [sections, setSections] = useState<string[]>(['mau', 'api'])
  const [loading, setLoading] = useState(false)

  function toggle(id: string) {
    setSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  function handleExport() {
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='gap-1.5'>
          <Download className='size-3.5' />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Export Data</DialogTitle>
          <DialogDescription>
            Choose a format, date range, and the sections you want to include.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-5 py-2'>
          {/* Format + Range row */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className='h-9'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='csv'>CSV</SelectItem>
                  <SelectItem value='json'>JSON</SelectItem>
                  <SelectItem value='xlsx'>Excel (.xlsx)</SelectItem>
                  <SelectItem value='pdf'>PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1.5'>
              <Label className='text-xs font-medium'>Date Range</Label>
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger className='h-9'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='7d'>Last 7 days</SelectItem>
                  <SelectItem value='30d'>Last 30 days</SelectItem>
                  <SelectItem value='90d'>Last quarter</SelectItem>
                  <SelectItem value='ytd'>Year to date</SelectItem>
                  <SelectItem value='all'>All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sections */}
          <div className='space-y-2'>
            <Label className='text-xs font-medium'>Include sections</Label>
            <div className='rounded-lg border divide-y'>
              {EXPORT_SECTIONS.map(({ id, label }) => (
                <label
                  key={id}
                  className='flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors'
                >
                  <Checkbox
                    checked={sections.includes(id)}
                    onCheckedChange={() => toggle(id)}
                    className='size-4'
                  />
                  <span className='text-sm'>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className='gap-2'>
          <p className='me-auto text-xs text-muted-foreground'>
            {sections.length} section{sections.length !== 1 ? 's' : ''} selected
          </p>
          <Button
            onClick={handleExport}
            disabled={loading || sections.length === 0}
            size='sm'
            className='gap-1.5 min-w-28'
          >
            {loading ? (
              <>
                <Loader2 className='size-3.5 animate-spin' />
                Exporting…
              </>
            ) : (
              <>
                <Download className='size-3.5' />
                Export {format.toUpperCase()}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Generate Report dialog ───────────────────────────────────────────────────

const REPORT_TYPES = [
  { value: 'executive', label: 'Executive Summary', desc: 'High-level KPIs and growth metrics' },
  { value: 'performance', label: 'Performance Report', desc: 'Latency, uptime, and error breakdown' },
  { value: 'usage', label: 'Usage Report', desc: 'API usage, MAU trends, and quotas' },
  { value: 'security', label: 'Security Audit', desc: 'Auth events, anomalies, and policy checks' },
]

type GenStep = 'config' | 'generating' | 'done'

function GenerateReportDialog() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('executive')
  const [period, setPeriod] = useState('month')
  const [fmt, setFmt] = useState('pdf')
  const [step, setStep] = useState<GenStep>('config')

  function handleGenerate() {
    setStep('generating')
    setTimeout(() => setStep('done'), 2200)
  }

  function handleClose() {
    setOpen(false)
    setTimeout(() => setStep('config'), 300)
  }

  const selected = REPORT_TYPES.find((r) => r.value === type)

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true) }}>
      <DialogTrigger asChild>
        <Button size='sm' className='gap-1.5'>
          <FileBarChart className='size-3.5' />
          Generate Report
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        {step === 'config' && (
          <>
            <DialogHeader>
              <DialogTitle>Generate Report</DialogTitle>
              <DialogDescription>
                Select a report type, period, and output format.
              </DialogDescription>
            </DialogHeader>

            <div className='space-y-5 py-2'>
              {/* Report type tiles */}
              <div className='space-y-1.5'>
                <Label className='text-xs font-medium'>Report Type</Label>
                <div className='grid grid-cols-1 gap-2'>
                  {REPORT_TYPES.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setType(r.value)}
                      className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-all duration-150 ${
                        type === r.value
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                          : 'border-border hover:border-border/80 hover:bg-muted/40'
                      }`}
                    >
                      <span
                        className={`mt-0.5 size-2 shrink-0 rounded-full ${type === r.value ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                      />
                      <div>
                        <p className='text-sm font-medium leading-none'>{r.label}</p>
                        <p className='mt-1 text-xs text-muted-foreground'>{r.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Period + Format */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <Label className='text-xs font-medium'>Period</Label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className='h-9'><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value='week'>This week</SelectItem>
                      <SelectItem value='month'>This month</SelectItem>
                      <SelectItem value='quarter'>This quarter</SelectItem>
                      <SelectItem value='ytd'>Year to date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-1.5'>
                  <Label className='text-xs font-medium'>Output Format</Label>
                  <Select value={fmt} onValueChange={setFmt}>
                    <SelectTrigger className='h-9'><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value='pdf'>PDF</SelectItem>
                      <SelectItem value='xlsx'>Excel (.xlsx)</SelectItem>
                      <SelectItem value='html'>HTML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleGenerate} size='sm' className='gap-1.5 w-full sm:w-auto'>
                <FileBarChart className='size-3.5' />
                Generate {selected?.label}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'generating' && (
          <div className='flex flex-col items-center gap-4 py-10'>
            <div className='flex size-14 items-center justify-center rounded-full bg-primary/10'>
              <Loader2 className='size-7 animate-spin text-primary' />
            </div>
            <div className='text-center'>
              <p className='font-semibold'>Generating report…</p>
              <p className='mt-1 text-sm text-muted-foreground'>
                Compiling {selected?.label} for{' '}
                {period === 'month' ? 'this month' : period === 'quarter' ? 'this quarter' : period}
              </p>
            </div>
          </div>
        )}

        {step === 'done' && (
          <>
            <div className='flex flex-col items-center gap-4 py-8'>
              <div className='flex size-14 items-center justify-center rounded-full bg-emerald-500/10'>
                <svg className='size-7 text-emerald-500' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2.5}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <div className='text-center'>
                <p className='font-semibold'>Report ready!</p>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {selected?.label} · {fmt.toUpperCase()} · {period === 'month' ? 'This month' : period}
                </p>
              </div>
            </div>
            <DialogFooter className='gap-2'>
              <Button variant='outline' size='sm' onClick={handleClose}>Close</Button>
              <Button size='sm' className='gap-1.5'>
                <Download className='size-3.5' />
                Download
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ─── Dashboard page ───────────────────────────────────────────────────────────

export function Dashboard() {
  return (
    <>
      <Header>
        <Search className='me-auto' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main>
        {/* Page title + actions */}
        <div className='mb-6 flex items-center justify-between gap-4'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
            <p className='text-sm text-muted-foreground'>
              Platform metrics for May 2026
            </p>
          </div>
          <div className='flex items-center gap-2 shrink-0'>
            <ExportDialog />
            <GenerateReportDialog />
          </div>
        </div>

        <div className='space-y-5'>
          {/* Stat cards */}
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((s) => (
              <Card key={s.label} className={`border-0 shadow-sm bg-gradient-to-br ${s.gradient}`}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-muted-foreground'>
                    {s.label}
                  </CardTitle>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.iconBg}`}>
                    <s.icon className={`h-4 w-4 ${s.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{s.value}</div>
                  <div className='flex items-center gap-1 mt-1'>
                    {s.up
                      ? <ArrowUp className='h-3 w-3 text-emerald-500' />
                      : <ArrowDown className='h-3 w-3 text-rose-500' />
                    }
                    <p className={`text-xs font-medium ${s.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {s.delta}
                    </p>
                    <p className='text-xs text-muted-foreground'>{s.sub}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts row */}
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <Card className='col-span-1 lg:col-span-4 border-0 shadow-sm'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle className='text-base'>Request Volume</CardTitle>
                    <CardDescription className='text-xs mt-0.5'>
                      Total API requests vs errors this year
                    </CardDescription>
                  </div>
                  <div className='flex items-center gap-3 text-[11px] text-muted-foreground'>
                    <span className='flex items-center gap-1'>
                      <span className='inline-block size-2 rounded-full bg-primary' />
                      Requests
                    </span>
                    <span className='flex items-center gap-1'>
                      <span className='inline-block size-2 rounded-full bg-rose-500' />
                      Errors
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='ps-2'>
                <Overview />
              </CardContent>
            </Card>

            <Card className='col-span-1 lg:col-span-3 border-0 shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Recent Deployments</CardTitle>
                <CardDescription className='text-xs'>
                  5 deploys across all services today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>

          {/* Bottom row: uptime + top endpoints */}
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
            <Card className='col-span-1 lg:col-span-3 border-0 shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Service Health</CardTitle>
                <CardDescription className='text-xs'>Live uptime per service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {[
                    { name: 'API Gateway', uptime: 99.98, status: 'operational' },
                    { name: 'Auth Service', uptime: 100.00, status: 'operational' },
                    { name: 'Worker Jobs', uptime: 98.72, status: 'degraded' },
                    { name: 'Notification Svc', uptime: 99.91, status: 'operational' },
                    { name: 'Analytics Pipeline', uptime: 99.54, status: 'operational' },
                  ].map((svc) => (
                    <div key={svc.name} className='flex items-center justify-between gap-3'>
                      <div className='flex items-center gap-2 min-w-0'>
                        <span
                          className={`size-2 shrink-0 rounded-full ${svc.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        />
                        <span className='text-sm truncate'>{svc.name}</span>
                      </div>
                      <div className='flex items-center gap-2 shrink-0'>
                        <div className='h-1.5 w-20 rounded-full bg-muted'>
                          <div
                            className={`h-1.5 rounded-full ${svc.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${svc.uptime}%` }}
                          />
                        </div>
                        <span className='text-xs font-mono text-muted-foreground w-14 text-right'>
                          {svc.uptime.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className='col-span-1 lg:col-span-4 border-0 shadow-sm'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-base'>Top Endpoints</CardTitle>
                <CardDescription className='text-xs'>Highest traffic routes this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {[
                    { route: 'GET /v2/users', calls: 312840, p95: '48ms', badge: 'stable' },
                    { route: 'POST /v2/auth/token', calls: 198210, p95: '61ms', badge: 'stable' },
                    { route: 'GET /v2/events', calls: 142700, p95: '124ms', badge: 'slow' },
                    { route: 'POST /v2/webhooks', calls: 98430, p95: '39ms', badge: 'stable' },
                    { route: 'GET /v2/metrics', calls: 67120, p95: '88ms', badge: 'stable' },
                  ].map((ep) => (
                    <div key={ep.route} className='flex items-center justify-between gap-3'>
                      <span className='text-xs font-mono text-foreground truncate'>{ep.route}</span>
                      <div className='flex items-center gap-3 shrink-0'>
                        <span className='text-xs text-muted-foreground tabular-nums'>
                          {(ep.calls / 1000).toFixed(0)}K calls
                        </span>
                        <Badge
                          variant='outline'
                          className={`text-[10px] px-1.5 py-0 h-4 ${ep.badge === 'slow' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'}`}
                        >
                          p95 {ep.p95}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
