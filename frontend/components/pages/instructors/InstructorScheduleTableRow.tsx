// import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { Class } from '@/types/_index';
import { TableCell } from '@mui/material';
import dayjs from 'dayjs';

interface InstructorScheduleTableRowProps {
  classData: Class;
}

export const InstructorScheduleTableRow: React.FC<InstructorScheduleTableRowProps> = ({ classData }) => {
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
      <TableCell>{classData.cohort.name}</TableCell>
      <TableCell>
        {/* <DaysOfTheWeekChip daysOfTheWeek={classData.weekdaysRange.name} />
         */}
        {classData.weekdaysRange.name}
      </TableCell>
      <TableCell>{classData.cohort.periodOfDay.time}</TableCell>
      <TableCell>{classData.course.program.name}</TableCell>
      <TableCell>
        {classData.classroom.name},{classData.classroom.floor}
      </TableCell>
    </>
  );
};
