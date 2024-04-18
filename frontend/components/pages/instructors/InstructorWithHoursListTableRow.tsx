'use client';
import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { PERIOD_OF_DAYS } from '@/constants/_index';
import { clickableTrStyle, inUnderDesiredColor, isOverMaximumColor, isUnderMinimumColor } from '@/styles/_index';
import { GetInstructorsWithHoursResponse } from '@/types/_index';
import { Circle } from '@mui/icons-material';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { WeekBlock } from './InstructorWithHoursListTable';

interface InstructorListTableRowProps {
  instructor: GetInstructorsWithHoursResponse;
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
          <Typography sx={{ fontSize: '14px' }}>{instructor.name}</Typography>
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
        instructor.assignedHours.map((singleWeekHours, i) => {
          const getCellColor = () => {
            if (!instructor.isActive || !singleWeekHours) {
              return { bgcolor: 'inherit', color: 'inherit' };
            } else {
              if (singleWeekHours.isOverMaximum) {
                return isOverMaximumColor;
              } else if (singleWeekHours.isUnderMinimum) {
                return isUnderMinimumColor;
              } else if (singleWeekHours.isUnderDesired) {
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
                textAlign: 'center',
                cursor: 'auto',
              }}
            >
              {singleWeekHours && singleWeekHours.hours}
            </TableCell>
          );
        })}
    </TableRow>
  );
};
