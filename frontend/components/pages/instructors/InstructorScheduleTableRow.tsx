import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { dateFormat } from '@/styles/_index';
import { GetClassResponse } from '@/types/_index';
import { TableCell } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';

interface InstructorScheduleTableRowProps {
  classData: GetClassResponse;
}

export const InstructorScheduleTableRow: React.FC<InstructorScheduleTableRowProps> = ({ classData }) => {
  const startDate = dayjs(classData.startAt).format(dateFormat);
  const endDate = dayjs(classData.endAt).format(dateFormat);

  const courseName = classData.course.deletedAt ? `${classData.course.name} (deleted)` : classData.course.name;

  return (
    <>
      <TableCell>{startDate}</TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell>{courseName}</TableCell>
      <TableCell>
        <Link href={`/cohorts/${classData.cohort.id}`} className="underline">
          {classData.cohort.name}
        </Link>
      </TableCell>
      <TableCell>
        <DaysOfTheWeekChip daysOfTheWeek={classData.weekdaysRange} />
      </TableCell>
      <TableCell>{classData.cohort.periodOfDay.time}</TableCell>
      <TableCell>{classData.cohort.program.name}</TableCell>
      <TableCell>
        {classData.classroom.name}, {classData.classroom.floor} floor
      </TableCell>
    </>
  );
};
