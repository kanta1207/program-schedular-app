import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { instructors } from '@/mock/_index';

const InstructorList = () => {
  return (
    <div className="w-full p-20">
      <div className="flex justify-end">
        <Button>
          <Link href="/instructors/new">New instructor</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Instructor name</TableHead>
            <TableHead>Contract type</TableHead>
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
              <TableCell>{instructor.contractType.name}</TableCell>
              <TableCell>{instructor.desiredWorkingHours}</TableCell>
              <TableCell>{instructor.periodOfDays.map((period) => period.name).join(', ')}</TableCell>
              <TableCell>{instructor.weekdaysRange.name}</TableCell>
              <TableCell>{instructor.isActive ? 'Active' : 'Inactive'}</TableCell>
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
  );
};

export default InstructorList;
