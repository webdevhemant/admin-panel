import { Shield, UserCheck, Users, CreditCard } from 'lucide-react'
import { type UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  [
    'active',
    'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  ],
  ['inactive', 'border-border bg-muted/50 text-muted-foreground'],
  [
    'invited',
    'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400',
  ],
  [
    'suspended',
    'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400',
  ],
])

export const roles = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: Shield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: UserCheck,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: Users,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: CreditCard,
  },
] as const
