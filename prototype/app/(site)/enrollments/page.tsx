import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'

const enrollments = [
  {
    name: 'DMS-24-Jan',
    startDate: '2024-01-24',
    morningClass: [],
    afternoonClass: ['A1-0124'],
    eveningClass: ['E1-0124', 'E2-0124'],
  },
  {
    name: 'DMS-23-Sep',
    startDate: '2023-10-23',
    morningClass: ['M-1023'],
    afternoonClass: ['A-1023'],
    eveningClass: ['E1-1023', 'E2-1023'],
  },
  {
    name: 'DMS-23-Aug',
    startDate: '2024-09-23',
    morningClass: [],
    afternoonClass: [],
    eveningClass: ['E1-0923'],
  },
]

const page = () => {
  return (
    <div className="w-full p-20">
      <div className="flex justify-end">
        <Button>New enrollment</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Enrollment name</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>Morning class</TableHead>
            <TableHead>Afternoon class</TableHead>
            <TableHead>Evening class</TableHead>
            {/* empty head for edit and delete */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.map((instructor, i) => (
            <TableRow key={i}>
              <TableCell>{instructor.name}</TableCell>
              <TableCell>{instructor.startDate}</TableCell>
              <TableCell>{instructor.morningClass.join(', ')}</TableCell>
              <TableCell>{instructor.afternoonClass.join(', ')}</TableCell>
              <TableCell>{instructor.eveningClass.join(', ')}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant={'outline'}>Edit</Button>
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
