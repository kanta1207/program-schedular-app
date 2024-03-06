'use client';
import { Instructor, PeriodOfDay } from '@/types/_index';
import { TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';

interface InstructorProps {
  instructor: Instructor;
}

export const InstructorListTableRow: React.FC<InstructorProps> = ({ instructor }) => {
  const router = useRouter();
  const handleRowClick = () => {
    router.push(`/instructors/${instructor.id}`);
  };
  const periodNames = instructor.periodOfDays?.map((period) => period.name).join(', ');
  return (
    <TableRow
      hover
      onClick={handleRowClick}
      style={{ cursor: 'pointer' }}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
    >
      <TableCell component="th" scope="row">
        {instructor.name}
      </TableCell>
      <TableCell>{instructor.contractType.name}</TableCell>
      <TableCell>{instructor.desiredWorkingHours}</TableCell>
      <TableCell>{periodNames}</TableCell>
      <TableCell>{instructor.weekdaysRange.name}</TableCell>
      <TableCell>{instructor.isActive ? 'Active' : 'Inactive'}</TableCell>
    </TableRow>
  );
};
