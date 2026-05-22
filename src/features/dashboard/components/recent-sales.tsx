import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const sales = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    avatar: '/avatars/01.png',
    fallback: 'OM',
    amount: '+$1,999.00',
    status: 'completed',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    avatar: '/avatars/02.png',
    fallback: 'JL',
    amount: '+$39.00',
    status: 'pending',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png',
    fallback: 'IN',
    amount: '+$299.00',
    status: 'completed',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png',
    fallback: 'WK',
    amount: '+$99.00',
    status: 'completed',
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    avatar: '/avatars/05.png',
    fallback: 'SD',
    amount: '+$39.00',
    status: 'failed',
  },
]

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  failed: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
}

export function RecentSales() {
  return (
    <div className='divide-y divide-border'>
      {sales.map((sale) => (
        <div
          key={sale.email}
          className='flex items-center gap-3 py-3 first:pt-0 last:pb-0'
        >
          <Avatar className='h-9 w-9 shrink-0'>
            <AvatarImage src={sale.avatar} alt={sale.name} />
            <AvatarFallback className='text-xs'>{sale.fallback}</AvatarFallback>
          </Avatar>
          <div className='flex flex-1 items-center justify-between gap-2 min-w-0'>
            <div className='min-w-0'>
              <p className='text-sm font-medium leading-none truncate'>
                {sale.name}
              </p>
              <p className='text-xs text-muted-foreground mt-0.5 truncate'>
                {sale.email}
              </p>
            </div>
            <div className='flex flex-col items-end gap-1 shrink-0'>
              <span className='text-sm font-semibold'>{sale.amount}</span>
              <Badge
                variant='outline'
                className={`text-[10px] px-1.5 py-0 h-4 capitalize ${statusStyles[sale.status]}`}
              >
                {sale.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
