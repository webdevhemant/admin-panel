import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
  Cpu,
  Shield,
  Sparkles,
  Wrench,
} from 'lucide-react'

export const labels = [
  { value: 'bug',         label: 'Bug' },
  { value: 'feature',     label: 'Feature' },
  { value: 'improvement', label: 'Improvement' },
  { value: 'infra',       label: 'Infra' },
  { value: 'security',    label: 'Security' },
]

export const statuses = [
  { label: 'Backlog',     value: 'backlog'      as const, icon: HelpCircle  },
  { label: 'Todo',        value: 'todo'         as const, icon: Circle      },
  { label: 'In Progress', value: 'in progress'  as const, icon: Timer       },
  { label: 'Done',        value: 'done'         as const, icon: CheckCircle },
  { label: 'Canceled',    value: 'canceled'     as const, icon: CircleOff   },
]

export const priorities = [
  { label: 'Low',      value: 'low'      as const, icon: ArrowDown   },
  { label: 'Medium',   value: 'medium'   as const, icon: ArrowRight  },
  { label: 'High',     value: 'high'     as const, icon: ArrowUp     },
  { label: 'Critical', value: 'critical' as const, icon: AlertCircle },
]

export const labelIcons: Record<string, React.ElementType> = {
  bug:         AlertCircle,
  feature:     Sparkles,
  improvement: Wrench,
  infra:       Cpu,
  security:    Shield,
}
