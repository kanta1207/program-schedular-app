import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { Class } from '@/types/_index';
import { TableCell } from '@mui/material';
import dayjs from 'dayjs';

interface CohortScheduleTableRowProps {
  classData: Class;
}

export const CohortScheduleTableRow: React.FC<CohortScheduleTableRowProps> = ({ classData }) => {
  const startDate = dayjs(classData.startAt).format('YYYY-MM-DD (ddd)');
  const endDate = dayjs(classData.endAt).format('YYYY-MM-DD (ddd)');

  // TODO: Take break period into consideration
  const daysDiff = dayjs(classData.endAt).diff(dayjs(classData.startAt)) / (24 * 60 * 60 * 1000);
  // StartAt usually starts on Monday and endAt ends on Friday, then add 2 (Saturday and Sunday)
  const weeks = Math.round((Math.round(daysDiff) + 2) / 7);

  const hoursPerWeek = classData.weekdaysRange.name === 'Mon - Fri' ? 20 : 10;

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
