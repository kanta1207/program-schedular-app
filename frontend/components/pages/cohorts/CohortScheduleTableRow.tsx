import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { Class } from '@/types/class';
import { TableCell } from '@mui/material';
import dayjs from 'dayjs';

interface CohortScheduleTableRowProps {
  classData: Class;
}

export const CohortScheduleTableRow: React.FC<CohortScheduleTableRowProps> = ({ classData }) => {
  const startDate = dayjs(classData.startAt).format('YYYY-MM-DD');
  const endDate = dayjs(classData.endAt).format('YYYY-MM-DD');

  const days = dayjs(classData.endAt).diff(dayjs(classData.startAt)) / (24 * 60 * 60 * 1000);
  const weeks = Math.round((Math.round(days) + 2) / 7);

  let hoursPerWeek = 0;
  if (classData.weekdaysRange.name === 'Mon - Fri') {
    hoursPerWeek = 20;
  } else {
    hoursPerWeek = 10;
  }
  const classHours = hoursPerWeek * weeks;

  return (
    <>
      <TableCell component="th" scope="row">
        {startDate}
      </TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell>{classData.course.name}</TableCell>
      <TableCell>
        <DaysOfTheWeekChip daysOfTheWeek={classData.weekdaysRange.name} />
      </TableCell>
      <TableCell>
        {classHours} / {classData.course.requiredHours}
      </TableCell>
      <TableCell>{classData.instructor?.name}</TableCell>
      <TableCell></TableCell>
    </>
  );
};
