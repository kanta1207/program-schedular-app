import { Instructor, PeriodOfDay } from '@/types/_index';
import { TableCell } from '@mui/material';
import Link from 'next/link';

interface InstructorProps {
  instructor: Instructor;
}

export const InstructorListTableRow: React.FC<InstructorProps> = ({ instructor }) => {
  const periodNames = instructor.periodOfDay?.map((period) => period.name).join(', ');
  return (
    <>
      <TableCell component="th" scope="row">
        <Link href={`/instructor/${instructor.id}`}>{instructor.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/instructor/${instructor.id}`}>{instructor.contractType.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/instructor/${instructor.id}`}>{instructor.desiredWorkingHours}</Link>
      </TableCell>
      <TableCell>
        {/* fix this */}
        <Link href={`/instructor/${instructor.id}`}>{periodNames}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/instructor/${instructor.id}`}>{instructor.weekdaysRange.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={`/instructor/${instructor.id}`}>{instructor.isActive ? 'Active' : 'Inactive'}</Link>
      </TableCell>
    </>
  );
};
