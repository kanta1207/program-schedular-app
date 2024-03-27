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
  watchSchedule?: WatchSchedule[];
  courses: GetCoursesResponse[];
  breaks: GetBreaksResponse[];
  schedule?: GetCohortClass[];
  instructors: GetInstructorsResponse[];
}

interface ModifiedWatchSchedule extends WatchSchedule {
  startWeek: number;
  totalWeeks: number;
}
interface ModifiedClass extends GetCohortClass {
  startWeek: number;
  totalWeeks: number;
}

export const SchedulePreview: React.FC<SchedulePreviewProps> = ({
  cohort,
  watchSchedule,
  courses,
  breaks,
  schedule,
  instructors,
}) => {
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
        startWeek: startWeekNumber + 1, // add 1 to start from 1 (not 0)
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

  const filterdBreaks = breaks
    .filter((item) => dayjs(item.startAt).isAfter(dayjs(cohort.intake.startAt)))
    .filter((item) => dayjs(item.endAt).isBefore(dayjs(cohort.intake.endAt)));
  const newBreaks = calculateWeeks(filterdBreaks);

  return (
    <Box
      sx={{
        '& .schedule-grid-child': {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        '& p': { textAlign: 'center' },
        mb: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `2fr repeat(${intakeTotalWeeks}, 1fr)`,
          gridTemplateRows: 'repeat(3, 1fr)',
          width: '100%',
          height: '120px',
          bgcolor: '#FFF',
          border: '1px solid',
          borderColor: '#33333315',
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
        {newBreaks.map((item, index) => {
          // add 1 because the first column is column head (MonWed, WedFri)
          const startCol = item.startWeek + 1;
          return (
            <Box
              key={index}
              sx={{
                gridColumn: `${startCol.toString()} / span ${item.totalWeeks}`,
                gridRow: '1 / span 3',
                bgcolor: 'grey.200',
              }}
            ></Box>
          );
        })}

        {/* Week blocks  */}
        {intakeWeekBlocks.map((item) => {
          // add 2 because grid column number starts from 1
          // and the first column will be the header
          const columnStartNumber = item.id + 2;
          return (
            <Box
              key={item.id}
              sx={{
                gridColumn: columnStartNumber.toString(),
                gridRow: '1 / span 3',
                border: '1px solid',
                borderColor: 'grey.200',
                margin: '-1px',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem' }}>
                {item.weekStartDate}
                <br />
                {item.weekEndDate}
              </Typography>
            </Box>
          );
        })}

        {/* Schedule Blocks */}
        {modifiedSchedule &&
          modifiedSchedule.map((item, index) => {
            // add 1 because the first column is table column head (MonWed, WedFri)
            const startCol = item.startWeek + 1;
            // find course name and instructor name because the object only has IDs
            const course = courses.find((course) => course.id === item.courseId);
            const instructor = instructors.find((instructor) => instructor.id === item.instructorId);
            return (
              <Box
                className="schedule-grid-child"
                key={index}
                sx={{
                  gridColumn: `${startCol.toString()} / span ${item.totalWeeks}`,
                  gridRow: item.weekdaysRangeId === 1 ? '2 / span 2' : item.weekdaysRangeId === 2 ? '2' : '3',
                  bgcolor:
                    item.weekdaysRangeId === 1 ? '#662d9180' : item.weekdaysRangeId === 2 ? '#0047AB80' : '#BA002180',
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
    </Box>
  );
};
