import { Instructor, PeriodOfDay } from '@/types/_index';
import { TableCell } from '@mui/material';
import Link from 'next/link';

interface InstructorProps {
  instructor: Instructor;
}

export const InstructorListTableRow: React.FC<InstructorProps> = ({ instructor }) => {
  const formatPeriods = (periods: PeriodOfDay[]) => {
    return periods.map((period) => `${period.name} (${period.time})`).join(', ');
  };
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
        {/* //this will change I am having issues with period */}
        {instructor.periodOfDay && instructor.periodOfDay.length > 0 ? (
          <Link href={`/instructor/${instructor.id}`}>{formatPeriods(instructor.periodOfDay)}</Link>
        ) : (
          'No periods assigned'
        )}
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
