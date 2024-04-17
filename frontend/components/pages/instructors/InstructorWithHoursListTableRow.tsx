'use client';
import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { PERIOD_OF_DAYS } from '@/constants/_index';
import { clickableTrStyle, inUnderDesiredColor, isOverMaximumColor, isUnderMinimumColor } from '@/styles/_index';
import { GetInstructorWithHoursResponse } from '@/types/_index';
import { Circle } from '@mui/icons-material';
import { Box, TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';
import { WeekBlock } from './InstructorWithHoursListTable';

interface InstructorListTableRowProps {
  instructor: GetInstructorWithHoursResponse;
  weekBlocks: WeekBlock[];
}

export const InstructorWithHoursListTableRow: React.FC<InstructorListTableRowProps> = ({ instructor, weekBlocks }) => {
  const router = useRouter();
  const handleRowClick = () => {
    router.push(`/instructors/${instructor.id}`);
  };

  const isAvailable = (periodId: number) => {
    return instructor.periodOfDays?.some((period) => period.id === periodId);
  };

  const periodIcons = PERIOD_OF_DAYS.map((period) => {
    const opacity = isAvailable(period.id) ? 1 : 0.1;
    return (
      <li key={period.id} style={{ opacity }}>
        {period.icon}
      </li>
    );
  });

  return (
    <TableRow sx={clickableTrStyle}>
      <TableCell
        component="th"
        onClick={handleRowClick}
        className="sticky-column"
        sx={{ left: '0', minWidth: '120px' }}
      >
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {<Circle sx={{ fontSize: '0.75rem', color: instructor.isActive ? '#07d02f' : 'grey.200' }} />}
          {instructor.name}
        </Box>
      </TableCell>
      <TableCell onClick={handleRowClick} className="sticky-column" sx={{ left: '120px', minWidth: '90px' }}>
        <p>{instructor.contractType.name}</p>
      </TableCell>
      <TableCell onClick={handleRowClick} className="sticky-column" sx={{ left: '210px', minWidth: '220px' }}>
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <ul className="flex gap-2">{periodIcons}</ul>
          <DaysOfTheWeekChip daysOfTheWeek={instructor.weekdaysRange} />
        </Box>
      </TableCell>
      <TableCell
        onClick={handleRowClick}
        className="sticky-column"
        sx={{ left: '430px', borderInline: '1px solid rgba(224, 224, 224, 1)', textAlign: 'center' }}
      >
        {instructor.desiredWorkingHours ? instructor.desiredWorkingHours : '-'}
      </TableCell>
      {instructor.assignedHours.length > 0 &&
        instructor.assignedHours.map((hours, i) => {
          const getCellColor = () => {
            if (!instructor.isActive || !hours) {
              return { bgcolor: 'inherit', color: 'inherit' };
            } else {
              if (hours.isOverMaximum) {
                return isOverMaximumColor;
              } else if (hours.isUnderMinimum) {
                return isUnderMinimumColor;
              } else if (hours.isUnderDesired) {
                return inUnderDesiredColor;
              } else {
                return { bgcolor: 'inherit', color: 'inherit' };
              }
            }
          };

          return (
            <TableCell
              key={i}
              sx={{
                ...getCellColor(),
                zIndex: '1',
                px: '0.5rem',
                minWidth: '3rem',
                textAlign: 'center',
                cursor: 'auto',
              }}
            >
              {hours && hours.hours}
            </TableCell>
          );
        })}
    </TableRow>
  );
};
