'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navigation = [
  {
    name: 'Schedules',
    path: '/schedules',
  },
  {
    name: 'Instructors',
    path: '/instructors',
  },
  {
    name: 'Intakes',
    path: '/intakes',
  },
  {
    name: 'Cohorts',
    path: '/cohorts',
  },
  {
    name: 'Courses',
    path: '/courses',
  },
]

const Header = () => {
  const path = usePathname()
  return (
    <header className="fixed z-50 h-[60px] w-full flex items-center justify-between bg-primary px-4">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div>
          <Link className="h-full bg-muted-foreground p-2 text-muted rounded-md" href={'/'}>
            Logo
          </Link>
        </div>

        {/* navigation */}
        <nav>
          <ul className="flex gap-x-4 text-muted">
            {navigation.map((navItem) => (
              <li key={navItem.path}>
                <Link href={navItem.path} className={`${path === navItem.path && 'border-b'}`}>
                  {navItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* User icon */}
      <div>
        <Link className="h-full bg-muted-foreground p-2 text-muted rounded-full" href={'/'}>
          Usr
        </Link>
      </div>
    </header>
  )
}

export default Header
