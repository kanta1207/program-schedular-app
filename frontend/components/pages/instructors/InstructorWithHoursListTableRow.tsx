'use client';
import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { PERIOD_OF_DAYS } from '@/constants/_index';
import { clickableTrStyle } from '@/styles/_index';
import { GetInstructorsResponse } from '@/types/_index';
import { Circle } from '@mui/icons-material';
import { Box, TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';
import { WeekBlock } from './InstructorWithHoursListTable';

interface InstructorListTableRowProps {
  instructor: GetInstructorsResponse | any;
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

  console.log(instructor.assingedHours);

  return (
    <TableRow sx={clickableTrStyle}>
      <TableCell
        component="th"
        onClick={handleRowClick}
        className="sticky-column"
        sx={{ left: '0', minWidth: '120px' }}
      >
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {<Circle sx={{ fontSize: '0.75rem', color: instructor.isActive ? '#00FA32' : 'grey.200' }} />}
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
      {weekBlocks.length > 0 &&
        weekBlocks.map((week) => {
          const hours = instructor.assingedHours?.find((item: any) => item.startAt === week.weekStartDate);

          const getCellColor = () => {
            if (hours) {
              if (hours.isOverMaximum) {
                return { bgcolor: '#FFC7CE', color: '#9C0006' };
              } else if (hours.isUnderMinimum) {
                return { bgcolor: '#C0E6F5', color: '#215C98' };
              } else if (hours.inUnderDesired) {
                return { bgcolor: 'inherit', color: '#9C5700' };
              } else {
                return { bgcolor: 'inherit', color: 'orange' };
              }
            } else {
              return { bgcolor: 'inherit', color: 'inherit' };
            }
          };
          // console.log(hours);

          return (
            <TableCell
              key={week.id}
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
