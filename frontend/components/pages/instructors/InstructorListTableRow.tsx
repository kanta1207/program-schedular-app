'use client';
import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { PERIOD_OF_DAYS } from '@/constants/_index';
import { clickableTrStyle } from '@/styles/_index';
import { GetInstructorsResponse } from '@/types/_index';
import { TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next-nprogress-bar';

interface InstructorListTableRowProps {
  instructor: GetInstructorsResponse;
}

export const InstructorListTableRow: React.FC<InstructorListTableRowProps> = ({ instructor }) => {
  const router = useRouter();
  const handleRowClick = () => {
    router.push(`/instructors/${instructor.id}`);
  };
  const isAvailable = (periodId: number) => {
    return instructor.periodOfDays?.some((period) => period.id === periodId);
  };

  const periodsWithIcons = PERIOD_OF_DAYS.map((period) => {
    const opacity = isAvailable(period.id) ? 1 : 0.1;
    return (
      <li key={period.id} style={{ opacity }}>
        {period.icon} {period.name}
      </li>
    );
  });
  return (
    <TableRow hover onClick={handleRowClick} sx={clickableTrStyle}>
      <TableCell component="th">{instructor.name}</TableCell>
      <TableCell>{instructor.contractType.name}</TableCell>
      <TableCell>{instructor.desiredWorkingHours ? instructor.desiredWorkingHours : '-'}</TableCell>
      <TableCell>
        <ul className="flex gap-2">{periodsWithIcons}</ul>
      </TableCell>
      <TableCell>
        <DaysOfTheWeekChip daysOfTheWeek={instructor.weekdaysRange} />
      </TableCell>
      <TableCell>{instructor.isActive ? 'Active' : 'Inactive'}</TableCell>
    </TableRow>
  );
};
