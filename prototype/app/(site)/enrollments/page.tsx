import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { enrollments } from '@/mock/_index'

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
          {enrollments.map((enrollment, i) => (
            <TableRow key={i}>
              <TableCell>{enrollment.name}</TableCell>
              <TableCell>{enrollment.startDate.toUTCString()}</TableCell>
              <TableCell>
                {enrollment.cohorts
                  .filter((cohort) => cohort.periodOfDayId === 1)
                  .map((cohort) => cohort.name)
                  .join(', ')}
              </TableCell>
              <TableCell>
                {enrollment.cohorts
                  .filter((cohort) => cohort.periodOfDayId === 2)
                  .map((cohort) => cohort.name)
                  .join(', ')}
              </TableCell>
              <TableCell>
                {enrollment.cohorts
                  .filter((cohort) => cohort.periodOfDayId === 3)
                  .map((cohort) => cohort.name)
                  .join(', ')}
              </TableCell>
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
