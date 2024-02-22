import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'

export const instructors = [
  {
    id: 1,
    name: 'Ana Couto',
    contract: 'Employee (part-time)',
    desiredWorkingHours: 20,
    period: ['Morning', 'Afternoon'],
    availableDaysOfWeek: 'Monday-Friday',
    isActive: true,
    course: ['SEO', 'Analytics'],
  },
  {
    id: 2,
    name: 'Brian',
    contract: 'Employee (full-time)',
    desiredWorkingHours: 40,
    period: ['Evening'],
    availableDaysOfWeek: 'Monday-Friday',
    isActive: true,
    course: ['SEO', 'Analytics'],
  },
  {
    id: 3,
    name: 'Caio Franco',
    contract: 'contractor',
    desiredWorkingHours: 20,
    period: ['Evening'],
    availableDaysOfWeek: 'Monday-Wednesday',
    isActive: true,
    course: ['SEO', 'Analytics'],
  },
]

const page = () => {
  return (
    <div className="w-full p-20">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/instructors/new">New instructor</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Instructor name</TableHead>
            <TableHead>Contract</TableHead>
            <TableHead>Desired working hours</TableHead>
            <TableHead>period</TableHead>
            <TableHead>Available days of week</TableHead>
            <TableHead>Status</TableHead>
            {/* empty head for edit and delete */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instructors.map((instructor, i) => (
            <TableRow key={i}>
              <TableCell>{instructor.name}</TableCell>
              <TableCell>{instructor.contract}</TableCell>
              <TableCell>{instructor.desiredWorkingHours}</TableCell>
              <TableCell>{instructor.period.join(', ')}</TableCell>
              <TableCell>{instructor.availableDaysOfWeek}</TableCell>
              <TableCell>{instructor.availableDaysOfWeek ? 'Active' : 'Inactive'}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant={'outline'} asChild>
                  <Link href={`/instructors/${instructor.id}`}>Edit</Link>
                </Button>
                <Button variant={'destructive'}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default page
