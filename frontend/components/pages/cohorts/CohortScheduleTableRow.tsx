import { Class } from '@/types/class';
import { TableCell } from '@mui/material';

interface CohortScheduleTableRowProps {
  temp: Class;
}

export const CohortScheduleTableRow: React.FC<CohortScheduleTableRowProps> = ({ temp }) => {
  const startDate = temp.startAt.getFullYear() + temp.startAt.getMonth() + temp.startAt.getDay();
  const endDate = temp.endAt.getFullYear() + temp.endAt.getMonth() + temp.endAt.getDay();

  return (
    <>
      <TableCell component="th" scope="row">
        {startDate}
      </TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell>{temp.course.name}</TableCell>
      <TableCell>{temp.weekdaysRange.name}</TableCell>
      <TableCell>{temp.course.requiredHours}</TableCell>
      <TableCell>{temp.instructor?.name}</TableCell>
    </>
  );
};
