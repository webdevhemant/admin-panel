import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { Plus, Trash2 } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const profileFormSchema = z.object({
  username: z
    .string('Please enter your username.')
    .min(2, 'Username must be at least 2 characters.')
    .max(30, 'Username must not be longer than 30 characters.'),
  email: z
    .string()
    .min(1, 'Please enter your email.')
    .email('Please enter a valid email address.'),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.url('Please enter a valid URL.'),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  username: 'hemant',
  email: 'hemant.dev.upwork@gmail.com',
  bio: 'Full-stack developer. Building things on the web.',
  urls: [{ value: 'https://github.com/webdevhemant' }],
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-6'
      >
        <div className='grid gap-6 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='hemant' {...field} />
                </FormControl>
                <FormDescription>
                  Your public display name. Changeable once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='hemant.dev.upwork@gmail.com'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Manage emails in your{' '}
                  <Link to='/settings/account' className='underline underline-offset-2'>
                    account settings
                  </Link>
                  .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about yourself'
                  className='resize-none'
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Max 160 characters. You can <span className='font-medium'>@mention</span> others.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel className='text-sm font-medium'>Links</FormLabel>
          <FormDescription className='mt-1 mb-3 text-xs'>
            Add links to your website, blog, or social profiles.
          </FormDescription>
          <div className='space-y-2'>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem className='m-0'>
                    <FormControl>
                      <div className='flex items-center gap-2'>
                        <Input
                          placeholder='https://yoursite.com'
                          className={cn(index !== 0 && 'mt-0')}
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='size-9 shrink-0 text-muted-foreground hover:text-destructive'
                          onClick={() => remove(index)}
                        >
                          <Trash2 className='size-4' />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-3 gap-1.5'
            onClick={() => append({ value: '' })}
          >
            <Plus className='size-3.5' />
            Add link
          </Button>
        </div>

        <Button type='submit' className='w-full sm:w-auto'>
          Update profile
        </Button>
      </form>
    </Form>
  )
}
