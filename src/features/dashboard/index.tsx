import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { Analytics } from './components/analytics'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import {
  TrendingUp,
  Users,
  CreditCard,
  DollarSign,
  Activity,
} from 'lucide-react'

export function Dashboard() {
  return (
    <>
      <Header>
        <TopNav links={topNav} className='me-auto' />
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </Header>

      <Main>
        <div className='mb-6 flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
              <p className='text-sm text-muted-foreground'>
                Welcome back — here&apos;s what&apos;s happening today.
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm'>
                Export
              </Button>
              <Button size='sm'>
                <TrendingUp className='mr-1.5 h-4 w-4' />
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-5'
        >
          <div className='w-full overflow-x-auto pb-1'>
            <TabsList className='h-9'>
              <TabsTrigger value='overview' className='text-xs'>
                Overview
              </TabsTrigger>
              <TabsTrigger value='analytics' className='text-xs'>
                Analytics
              </TabsTrigger>
              <TabsTrigger value='reports' disabled className='text-xs'>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled className='text-xs'>
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-5'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card className='border-0 shadow-sm bg-gradient-to-br from-primary/5 to-primary/10'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-muted-foreground'>
                    Total Revenue
                  </CardTitle>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10'>
                    <DollarSign className='h-4 w-4 text-primary' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$45,231.89</div>
                  <div className='flex items-center gap-1 mt-1'>
                    <TrendingUp className='h-3 w-3 text-emerald-500' />
                    <p className='text-xs text-emerald-600 font-medium'>
                      +20.1%
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      from last month
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-sm bg-gradient-to-br from-violet-500/5 to-violet-500/10'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-muted-foreground'>
                    Subscriptions
                  </CardTitle>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10'>
                    <Users className='h-4 w-4 text-violet-600' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+2,350</div>
                  <div className='flex items-center gap-1 mt-1'>
                    <TrendingUp className='h-3 w-3 text-emerald-500' />
                    <p className='text-xs text-emerald-600 font-medium'>
                      +180.1%
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      from last month
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-sm bg-gradient-to-br from-blue-500/5 to-blue-500/10'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-muted-foreground'>
                    Sales
                  </CardTitle>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10'>
                    <CreditCard className='h-4 w-4 text-blue-600' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+12,234</div>
                  <div className='flex items-center gap-1 mt-1'>
                    <TrendingUp className='h-3 w-3 text-emerald-500' />
                    <p className='text-xs text-emerald-600 font-medium'>
                      +19%
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      from last month
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-sm bg-gradient-to-br from-amber-500/5 to-amber-500/10'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-muted-foreground'>
                    Active Now
                  </CardTitle>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10'>
                    <Activity className='h-4 w-4 text-amber-600' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <div className='flex items-center gap-1 mt-1'>
                    <TrendingUp className='h-3 w-3 text-emerald-500' />
                    <p className='text-xs text-emerald-600 font-medium'>
                      +201
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      since last hour
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4 border-0 shadow-sm'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-base'>Revenue Overview</CardTitle>
                    <Badge variant='secondary' className='text-xs'>
                      This year
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='ps-2'>
                  <Overview />
                </CardContent>
              </Card>

              <Card className='col-span-1 lg:col-span-3 border-0 shadow-sm'>
                <CardHeader className='pb-3'>
                  <CardTitle className='text-base'>Recent Sales</CardTitle>
                  <CardDescription className='text-xs'>
                    265 sales this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='analytics' className='space-y-4'>
            <Analytics />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
