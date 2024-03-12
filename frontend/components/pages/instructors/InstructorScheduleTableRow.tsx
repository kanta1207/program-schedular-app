import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { GetClassResponse } from '@/types/_index';
import { TableCell } from '@mui/material';
import dayjs from 'dayjs';

interface InstructorScheduleTableRowProps {
  classData: GetClassResponse;
}

export const InstructorScheduleTableRow: React.FC<InstructorScheduleTableRowProps> = ({ classData }) => {
  const startDate = dayjs(classData.startAt).format('YYYY-MM-DD');
  const endDate = dayjs(classData.endAt).format('YYYY-MM-DD');

  return (
    <>
      <TableCell component="th" scope="row">
        {startDate}
      </TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell>{classData.course.name}</TableCell>
      <TableCell>{classData.cohort.name}</TableCell>
      <TableCell>
        <DaysOfTheWeekChip daysOfTheWeek={classData.weekdaysRange.name} />
      </TableCell>
      <TableCell>{classData.cohort.periodOfDay.time}</TableCell>
      <TableCell>{classData.cohort.program.name}</TableCell>
      <TableCell>
        {classData.classroom.name}, {classData.classroom.floor} floor
      </TableCell>
    </>
  );
};
