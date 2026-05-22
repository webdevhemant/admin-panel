import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Monitor, Moon, Sun, Type } from 'lucide-react'
import { fonts } from '@/config/fonts'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { useFont } from '@/context/font-provider'
import { useTheme } from '@/context/theme-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark']),
  font: z.enum(fonts),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm() {
  const { font, setFont } = useFont()
  const { theme, setTheme } = useTheme()

  const defaultValues: Partial<AppearanceFormValues> = {
    theme: theme as 'light' | 'dark',
    font,
  }

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  function onSubmit(data: AppearanceFormValues) {
    if (data.font !== font) setFont(data.font)
    if (data.theme !== theme) setTheme(data.theme)
    showSubmittedData(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

        {/* Font selector */}
        <FormField
          control={form.control}
          name='font'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-sm font-semibold'>
                <Type className='size-4 text-muted-foreground' />
                Font Family
              </FormLabel>
              <FormDescription>
                Choose the typeface used across the dashboard.
              </FormDescription>
              <FormControl>
                <div className='mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3'>
                  {fonts.map((f) => (
                    <button
                      key={f}
                      type='button'
                      onClick={() => field.onChange(f)}
                      className={cn(
                        'flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-all duration-150',
                        field.value === f
                          ? 'border-primary bg-primary/5 text-primary font-medium ring-1 ring-primary/20'
                          : 'border-border bg-background text-muted-foreground hover:border-border/80 hover:bg-muted/40'
                      )}
                    >
                      <span className='capitalize'>{f}</span>
                      {field.value === f && (
                        <span className='size-2 rounded-full bg-primary' />
                      )}
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Theme selector */}
        <FormField
          control={form.control}
          name='theme'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2 text-sm font-semibold'>
                <Monitor className='size-4 text-muted-foreground' />
                Color Theme
              </FormLabel>
              <FormDescription>
                Set the visual mode for your workspace.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='mt-3 grid grid-cols-2 gap-4'
              >
                {/* Light */}
                <FormItem className='m-0'>
                  <FormLabel className='cursor-pointer [&:has([data-state=checked])>div]:ring-2 [&:has([data-state=checked])>div]:ring-primary [&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem value='light' className='sr-only' />
                    </FormControl>
                    <div className='rounded-xl border-2 border-border p-1.5 transition-all hover:border-border/70'>
                      {/* preview */}
                      <div className='rounded-lg bg-[#f4f4f5] p-2 space-y-1.5'>
                        <div className='flex items-center gap-1.5 rounded-md bg-white px-2 py-1.5 shadow-sm'>
                          <div className='size-2.5 rounded-full bg-[#e4e4e7]' />
                          <div className='h-1.5 w-16 rounded bg-[#e4e4e7]' />
                        </div>
                        <div className='rounded-md bg-white px-2 py-1.5 shadow-sm space-y-1'>
                          <div className='h-1.5 w-full rounded bg-[#e4e4e7]' />
                          <div className='h-1.5 w-3/4 rounded bg-[#e4e4e7]' />
                        </div>
                        <div className='flex gap-1'>
                          <div className='h-5 flex-1 rounded-md bg-white shadow-sm' />
                          <div className='h-5 flex-1 rounded-md bg-white shadow-sm' />
                        </div>
                      </div>
                      <div className='mt-2 flex items-center justify-between px-1'>
                        <span className='text-xs font-medium text-foreground'>Light</span>
                        <Sun className='size-3.5 text-amber-500' />
                      </div>
                    </div>
                  </FormLabel>
                </FormItem>

                {/* Dark */}
                <FormItem className='m-0'>
                  <FormLabel className='cursor-pointer [&:has([data-state=checked])>div]:ring-2 [&:has([data-state=checked])>div]:ring-primary [&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem value='dark' className='sr-only' />
                    </FormControl>
                    <div className='rounded-xl border-2 border-border p-1.5 transition-all hover:border-border/70'>
                      {/* preview */}
                      <div className='rounded-lg bg-zinc-900 p-2 space-y-1.5'>
                        <div className='flex items-center gap-1.5 rounded-md bg-zinc-800 px-2 py-1.5'>
                          <div className='size-2.5 rounded-full bg-zinc-600' />
                          <div className='h-1.5 w-16 rounded bg-zinc-600' />
                        </div>
                        <div className='rounded-md bg-zinc-800 px-2 py-1.5 space-y-1'>
                          <div className='h-1.5 w-full rounded bg-zinc-600' />
                          <div className='h-1.5 w-3/4 rounded bg-zinc-600' />
                        </div>
                        <div className='flex gap-1'>
                          <div className='h-5 flex-1 rounded-md bg-zinc-800' />
                          <div className='h-5 flex-1 rounded-md bg-zinc-800' />
                        </div>
                      </div>
                      <div className='mt-2 flex items-center justify-between px-1'>
                        <span className='text-xs font-medium text-foreground'>Dark</span>
                        <Moon className='size-3.5 text-blue-400' />
                      </div>
                    </div>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full sm:w-auto'>
          Save preferences
        </Button>
      </form>
    </Form>
  )
}
