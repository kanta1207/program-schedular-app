import { Instructor, PeriodOfDay } from '@/types/_index';
import { TableCell } from '@mui/material';
import Link from 'next/link';

interface InstructorProps {
  instructor: Instructor;
}

export const InstructorListTableRow: React.FC<InstructorProps> = ({ instructor }) => {
  const periodNames = instructor.periodOfDays?.map((period) => period.name).join(', ');
  return (
    <>
      <TableCell component="th" scope="row">
        <Link href={`/instructors/${instructor.id}`}>{instructor.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/instructors/${instructor.id}`}>{instructor.contractType.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/instructors/${instructor.id}`}>{instructor.desiredWorkingHours}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/instructors/${instructor.id}`}>{periodNames}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/instructors/${instructor.id}`}>{instructor.weekdaysRange.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/instructors/${instructor.id}`}>{instructor.isActive ? 'Active' : 'Inactive'}</Link>
      </TableCell>
    </>
  );
};
