import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { month: 'Jan', requests: 312000, errors: 1400 },
  { month: 'Feb', requests: 428000, errors: 2100 },
  { month: 'Mar', requests: 391000, errors: 1800 },
  { month: 'Apr', requests: 567000, errors: 2400 },
  { month: 'May', requests: 623000, errors: 1950 },
  { month: 'Jun', requests: 718000, errors: 2800 },
  { month: 'Jul', requests: 834000, errors: 3100 },
  { month: 'Aug', requests: 791000, errors: 2600 },
  { month: 'Sep', requests: 912000, errors: 3400 },
  { month: 'Oct', requests: 1054000, errors: 4200 },
  { month: 'Nov', requests: 1180000, errors: 3800 },
  { month: 'Dec', requests: 1243000, errors: 4900 },
]

function fmt(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`
  return String(v)
}

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id='reqGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='var(--color-primary)' stopOpacity={0.25} />
            <stop offset='95%' stopColor='var(--color-primary)' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='errGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#f43f5e' stopOpacity={0.2} />
            <stop offset='95%' stopColor='#f43f5e' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='3 3' className='stroke-border/40' vertical={false} />
        <XAxis
          dataKey='month'
          stroke='transparent'
          tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId='left'
          stroke='transparent'
          tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={fmt}
          width={42}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--color-popover)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            fontSize: 12,
          }}
          formatter={(value, name) => [
            name === 'requests' ? fmt(Number(value)) : Number(value).toLocaleString(),
            name === 'requests' ? 'Requests' : 'Errors',
          ]}
        />
        <Area
          yAxisId='left'
          type='monotone'
          dataKey='requests'
          stroke='var(--color-primary)'
          strokeWidth={2}
          fill='url(#reqGradient)'
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Area
          yAxisId='left'
          type='monotone'
          dataKey='errors'
          stroke='#f43f5e'
          strokeWidth={1.5}
          fill='url(#errGradient)'
          dot={false}
          activeDot={{ r: 3 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
