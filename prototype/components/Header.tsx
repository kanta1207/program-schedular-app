import Link from 'next/link'

const Header = () => {
  return (
    <header className="h-[60px] w-full flex items-center justify-between bg-primary px-4">
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
            <li>
              <Link href={'/schedules'}>Schedules</Link>
            </li>
            <li>
              <Link href={'/instructors'}>Instructors</Link>
            </li>
            <li>
              <Link href={'/enrollments'}>Enrollments</Link>
            </li>
            <li>
              <Link href={'/courses'}>Courses</Link>
            </li>
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
