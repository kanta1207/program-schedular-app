import { WEEKDAYS_RANGES } from '@/constants/weekdays-range';
import {
  GetBreaksResponse,
  GetCohortClass,
  GetCohortResponse,
  GetCoursesResponse,
  GetInstructorsResponse,
} from '@/types/_index';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { WatchSchedule } from './CohortSchedule';

interface SchedulePreviewProps {
  cohort: GetCohortResponse;
  courses: GetCoursesResponse[];
  breaks: GetBreaksResponse[];
  instructors: GetInstructorsResponse[];
  watchSchedule?: WatchSchedule[];
  schedule?: GetCohortClass[];
}

interface ModifiedWatchSchedule extends WatchSchedule {
  startWeek: number;
  totalWeeks: number;
}
interface ModifiedClass extends GetCohortClass {
  startWeek: number;
  totalWeeks: number;
}

interface WeekBlock {
  id: number;
  weekStartDate: string;
  weekEndDate: string;
}

export const SchedulePreview: React.FC<SchedulePreviewProps> = ({
  cohort,
  courses,
  breaks,
  instructors,
  watchSchedule,
  schedule,
}) => {
  // const [intakeWeekBlocks, setIntakeWeekBlocks] = useState<WeekBlock[]>([]);
  // if the day of week of startAt is Tuesday, subtract 1 day to set startAt as Monday
  const cohortIntakeStartAt =
    dayjs(cohort.intake.startAt).day() === 2
      ? dayjs(cohort.intake.startAt).subtract(1, 'day')
      : dayjs(cohort.intake.startAt);
  const cohortIntakeEndAt = dayjs(cohort.intake.endAt);
  const intakeDaysDiff = cohortIntakeEndAt.diff(cohortIntakeStartAt, 'day');
  const intakeTotalWeeks = Math.ceil(intakeDaysDiff / 7);

  const intakeWeekBlocks = [];
  for (let i = 0; i < intakeTotalWeeks; i++) {
    const weekStartDate = cohortIntakeStartAt.add(i * 7, 'day').format('MM-DD');
    const weekEndDate = dayjs(weekStartDate).add(4, 'day').format('MM-DD');

    const weekBlock = {
      id: i,
      weekStartDate: weekStartDate,
      weekEndDate: weekEndDate,
    };
    intakeWeekBlocks.push(weekBlock);
  }

  const calculateWeeks = (scheduleArray: GetBreaksResponse[] | WatchSchedule[] | GetCohortClass[]) => {
    const newArray = scheduleArray.map((item) => {
      // calculate class duration
      const daysDiff = dayjs(item.endAt).diff(dayjs(item.startAt), 'day');
      const totalWeeks = Math.ceil(daysDiff / 7);

      // if the day of week of startAt is Tuesday, subtract 1 day to set startAt as Monday
      const startAt = dayjs(item.startAt).day() === 2 ? dayjs(item.startAt).subtract(1, 'day') : dayjs(item.startAt);
      const daysFromIntakeStartDate = startAt.diff(cohortIntakeStartAt, 'day');
      const startWeekNumber = Math.ceil(daysFromIntakeStartDate / 7);

      return {
        ...item,
        startWeek: startWeekNumber,
        totalWeeks: totalWeeks,
      };
    });
    return newArray;
  };

  const modifySchedule = () => {
    if (watchSchedule) {
      const tempModifiedSchedule = calculateWeeks(watchSchedule) as ModifiedWatchSchedule[];
      const returnModifiedSchedule = tempModifiedSchedule.map((item) => {
        return {
          name: cohort.name,
          startWeek: item.startWeek,
          totalWeeks: item.totalWeeks,
          courseId: item.courseId,
          weekdaysRangeId: item.weekdaysRangeId,
          instructorId: item.instructorId,
        };
      });
      return returnModifiedSchedule;
    } else if (schedule) {
      const tempModifiedSchedule = calculateWeeks(schedule) as ModifiedClass[];
      const returnModifiedSchedule = tempModifiedSchedule.map((item) => {
        return {
          name: item.cohort.name,
          startWeek: item.startWeek,
          totalWeeks: item.totalWeeks,
          courseId: item.course.id,
          weekdaysRangeId: item.weekdaysRange.id,
          instructorId: item.instructor?.id,
        };
      });
      return returnModifiedSchedule;
    }
  };

  const modifiedSchedule = modifySchedule();

  const filteredBreaks = breaks
    .filter((item) => dayjs(item.startAt).isAfter(dayjs(cohort.intake.startAt)))
    .filter((item) => dayjs(item.endAt).isBefore(dayjs(cohort.intake.endAt)));
  const modifiedBreaks = calculateWeeks(filteredBreaks);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `2fr repeat(${intakeTotalWeeks}, 1fr)`,
        gridTemplateRows: 'repeat(3, 1fr)',
        width: '100%',
        minWidth: '1024px',
        height: '120px',
        bgcolor: '#FFF',
        border: '1px solid',
        borderColor: '#33333315',
        '& .schedule-grid-child': {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        '& p': { textAlign: 'center' },
      }}
    >
      {/* Cohort name */}
      <Box
        className="schedule-grid-child"
        sx={{
          gridColumn: '1',
          gridRowStart: '1',
        }}
      >
        <Typography variant="h6">{modifiedSchedule && modifiedSchedule[0] && modifiedSchedule[0].name}</Typography>
      </Box>

      {/* Column Header (Days of the week)*/}
      <Box
        className="schedule-grid-child"
        sx={{
          gridColumn: '1',
          gridRowStart: '2',
        }}
      >
        <Typography>Mon - Wed</Typography>
      </Box>
      <Box
        className="schedule-grid-child"
        sx={{
          gridColumn: '1',
          gridRowStart: '3',
        }}
      >
        <Typography>Wed - Fri</Typography>
      </Box>

      {/* Break blocks */}
      {modifiedBreaks.map((item, index) => {
        // add 2 because grid column border number starts from 1
        // also the first column (border 1 to 2) will be the header
        const columnStartNumber = item.startWeek + 2;
        return (
          <Box
            key={index}
            sx={{
              gridColumn: `${columnStartNumber.toString()} / span ${item.totalWeeks}`,
              gridRow: '1 / span 3',
              bgcolor: 'grey.200',
            }}
          ></Box>
        );
      })}

      {/* Week blocks  */}
      {intakeWeekBlocks.map((weekBlock) => {
        // add 2 because grid column border number starts from 1
        // also the first column (border 1 to 2) will be the header
        const columnStartNumber = weekBlock.id + 2;
        return (
          <Box
            key={weekBlock.id}
            sx={{
              gridColumn: columnStartNumber.toString(),
              gridRow: '1 / span 3',
              border: '1px solid',
              borderColor: 'grey.200',
              margin: '-1px',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem' }}>
              {weekBlock.weekStartDate}
              <br />
              {weekBlock.weekEndDate}
            </Typography>
          </Box>
        );
      })}

      {/* Schedule Blocks */}
      {modifiedSchedule &&
        modifiedSchedule.map((scheduleItem, index) => {
          // add 2 because grid column border number starts from 1
          // also the first column (border 1 to 2) will be the header
          const columnStartNumber = scheduleItem.startWeek + 2;
          // find course name and instructor name because the object only has IDs
          const course = courses.find((course) => course.id === scheduleItem.courseId);
          const instructor = instructors.find((instructor) => instructor.id === scheduleItem.instructorId);
          const weekDaysRange = WEEKDAYS_RANGES.find((range) => range.id === scheduleItem.weekdaysRangeId);
          return (
            <Box
              className="schedule-grid-child"
              key={index}
              sx={{
                gridColumn: `${columnStartNumber.toString()} / span ${scheduleItem.totalWeeks}`,
                gridRow:
                  scheduleItem.weekdaysRangeId === 1 ? '2 / span 2' : scheduleItem.weekdaysRangeId === 2 ? '2' : '3',
                bgcolor: weekDaysRange && `${weekDaysRange.color.primary}80`,
                border: '1px solid #FFF',
                color: '#FFF',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.9rem',
                }}
              >
                {course ? course.name : ''} - {instructor ? instructor.name : 'N/A'}
              </Typography>
            </Box>
          );
        })}
    </Box>
  );
};
