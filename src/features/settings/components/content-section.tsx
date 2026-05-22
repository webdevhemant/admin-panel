import { Separator } from '@/components/ui/separator'

type ContentSectionProps = {
  title: string
  desc: string
  children: React.JSX.Element
}

export function ContentSection({ title, desc, children }: ContentSectionProps) {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex-none'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <p className='mt-1 text-sm text-muted-foreground'>{desc}</p>
      </div>
      <Separator className='my-5 flex-none' />
      <div className='faded-bottom h-full w-full overflow-y-auto scroll-smooth pe-4 pb-12'>
        <div className='max-w-lg'>{children}</div>
      </div>
    </div>
  )
}
