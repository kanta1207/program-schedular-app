import { Class } from '@/types/class';
import { TableCell } from '@mui/material';
import dayjs from 'dayjs';

interface CohortScheduleTableRowProps {
  classData: Class;
}

export const CohortScheduleTableRow: React.FC<CohortScheduleTableRowProps> = ({ classData }) => {
  const startDate = dayjs(classData.startAt).format('YYYY-MM-DD');
  const endDate = dayjs(classData.endAt).format('YYYY-MM-DD');

  return (
    <>
      <TableCell component="th" scope="row">
        {startDate}
      </TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell>{classData.course.name}</TableCell>
      <TableCell>{classData.weekdaysRange.name}</TableCell>
      <TableCell>{classData.course.requiredHours}</TableCell>
      <TableCell>{classData.instructor?.name}</TableCell>
      <TableCell></TableCell>
    </>
  );
};
