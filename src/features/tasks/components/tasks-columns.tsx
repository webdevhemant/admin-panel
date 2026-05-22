import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { labelIcons, labels, priorities, statuses } from '../data/data'
import { type Task } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const labelColors: Record<string, string> = {
  bug:         'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400',
  feature:     'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-400',
  improvement: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400',
  infra:       'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  security:    'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
}

export const tasksColumns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-0.5'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-0.5'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <div className='w-20 font-mono text-xs text-muted-foreground'>
        {row.getValue('id')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    meta: { className: 'ps-1 max-w-0 w-2/3', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const label = labels.find((l) => l.value === row.original.label)
      const LabelIcon = label ? labelIcons[label.value] : null
      const colorCls = label ? labelColors[label.value] : ''
      return (
        <div className='flex items-center gap-2'>
          {label && (
            <Badge
              variant='outline'
              className={`flex items-center gap-1 px-1.5 py-0 text-[10px] capitalize ${colorCls}`}
            >
              {LabelIcon && <LabelIcon className='size-3' />}
              {label.label}
            </Badge>
          )}
          <span className='truncate text-sm font-medium'>{row.getValue('title')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const status = statuses.find((s) => s.value === row.getValue('status'))
      if (!status) return null
      return (
        <div className='flex w-28 items-center gap-2 text-sm'>
          <status.icon className='size-4 shrink-0 text-muted-foreground' />
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Priority' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-3' },
    cell: ({ row }) => {
      const priority = priorities.find((p) => p.value === row.getValue('priority'))
      if (!priority) return null
      const colorMap: Record<string, string> = {
        low:      'text-slate-500',
        medium:   'text-amber-500',
        high:     'text-orange-500',
        critical: 'text-rose-600',
      }
      return (
        <div className={`flex items-center gap-2 text-sm ${colorMap[priority.value] ?? ''}`}>
          <priority.icon className='size-4 shrink-0' />
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
