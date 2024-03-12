'use client';
import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { GetInstructorsResponse } from '@/types/_index';
import { TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';

interface InstructorListTableRowProps {
  instructor: GetInstructorsResponse;
}

export const InstructorListTableRow: React.FC<InstructorListTableRowProps> = ({ instructor }) => {
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
      <TableCell>
        <DaysOfTheWeekChip daysOfTheWeek={instructor.weekdaysRange} />
      </TableCell>
      <TableCell>{instructor.isActive ? 'Active' : 'Inactive'}</TableCell>
    </TableRow>
  );
};
