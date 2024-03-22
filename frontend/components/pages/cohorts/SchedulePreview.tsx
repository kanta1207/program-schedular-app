import { GetBreaksResponse, GetCohortClass, GetCohortResponse, GetCoursesResponse } from '@/types/_index';
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
}

export const SchedulePreview: React.FC<SchedulePreviewProps> = ({
  cohort,
  watchSchedule,
  courses,
  breaks,
  schedule,
}) => {
  const cohortIntakeStartAt = dayjs(cohort.intake.startAt);
  const cohortIntakeEndAt = dayjs(cohort.intake.endAt);
  const intakeDaysDiff = cohortIntakeEndAt.diff(cohortIntakeStartAt, 'day');
  const intakeTotalWeeks = Math.ceil(intakeDaysDiff / 7);

  const intakeWeeks = [];
  for (let i = 0; i < intakeTotalWeeks; i++) {
    intakeWeeks.push(i);
  }

  const caluclateWeeks = (scheduleArray: GetBreaksResponse[] | WatchSchedule[] | GetCohortClass[]) => {
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

  interface ModifiedWatchSchedule extends WatchSchedule {
    startWeek: number;
    totalWeeks: number;
  }
  interface ModifiedClasses extends GetCohortClass {
    startWeek: number;
    totalWeeks: number;
  }

  const modifySchedule = () => {
    if (watchSchedule) {
      const tempModifiedSchedule = caluclateWeeks(watchSchedule) as ModifiedWatchSchedule[];
      const returnModifiedSchedule = tempModifiedSchedule.map((item) => {
        return {
          name: cohort.name,
          startWeek: item.startWeek,
          totalWeeks: item.totalWeeks,
          courseId: item.courseId,
          weekdaysRangeId: item.weekdaysRangeId,
        };
      });
      return returnModifiedSchedule;
    } else if (schedule) {
      const tempModifiedSchedule = caluclateWeeks(schedule) as ModifiedClasses[];
      const returnModifiedSchedule = tempModifiedSchedule.map((item) => {
        return {
          // ...item,s
          id: item.id,
          name: item.cohort.name,
          startWeek: item.startWeek,
          totalWeeks: item.totalWeeks,
          courseId: item.course.id,
          weekdaysRangeId: item.weekdaysRange.id,
        };
      });
      return returnModifiedSchedule;
    }
  };

  const modifiedSchedule = modifySchedule();

  const filterdBreaks = breaks
    .filter((item) => dayjs(item.startAt).isAfter(dayjs(cohort.intake.startAt)))
    .filter((item) => dayjs(item.endAt).isBefore(dayjs(cohort.intake.endAt)));
  const newBreaks = caluclateWeeks(filterdBreaks);

  return (
    <Box sx={{ '& p': { textAlign: 'center' }, mb: '1rem' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `2fr repeat(${intakeTotalWeeks}, 1fr)`,
          gridTemplateRows: '1.5fr repeat(2, 1fr)',
          width: '100%',
          height: '100px',
          border: '1px solid',
          borderColor: '#33333315',
        }}
      >
        {modifiedSchedule && modifiedSchedule[0].name}
        {/* Column Header */}
        <Box
          sx={{
            gridColumnStart: '1',
            gridRowStart: '2',
          }}
        >
          <Typography>Mon - Wed</Typography>
        </Box>
        <Box
          sx={{
            gridColumnStart: '1',
            gridRowStart: '3',
          }}
        >
          <Typography>Wed - Fri</Typography>
        </Box>

        {/* Break Blocks */}
        {newBreaks.map((item, index) => {
          // add 1 because the first column is column head (MonWed, WedFri)
          const startCol = item.startWeek + 1;
          return (
            <Box
              key={index}
              sx={{
                gridColumn: `${startCol.toString()} / span ${item.totalWeeks}`,
                gridRowStart: '1',
                gridRowEnd: '4',
                bgcolor: '#e8e8e8',
              }}
            >
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              ></Typography>
            </Box>
          );
        })}

        {/* Week Blocks */}
        {intakeWeeks.map((item) => {
          const colStart = item + 2;
          const weekStartDate = dayjs(cohort.intake.startAt)
            .add(item * 7, 'day')
            .format('MM-DD');
          const weekEndDate = dayjs(weekStartDate).add(4, 'day').format('MM-DD');
          return (
            <Box
              key={item}
              sx={{
                gridColumnStart: colStart.toString(),
                gridRowStart: '1',
                gridRowEnd: '4',
                border: '1px solid',
                borderColor: '#33333315',
                margin: '-1px',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem' }}>
                {weekStartDate}
                <br />
                {weekEndDate}
              </Typography>
            </Box>
          );
        })}

        {/* Schedule Blocks */}
        {modifiedSchedule &&
          modifiedSchedule.map((item, index) => {
            // add 1 because the first column is table head (MonWed, WedFri)
            const startCol = item.startWeek + 1;
            const endCol = item.startWeek + item.totalWeeks + 1;
            // find course name because the object only has courseId
            const courseName = courses.find((course) => course.id === item.courseId);
            return (
              <Box
                key={index}
                sx={{
                  gridColumn: `${startCol.toString()} / span ${item.totalWeeks}`,
                  gridRowStart: item.weekdaysRangeId === 1 ? '2' : item.weekdaysRangeId === 2 ? '2' : '3',
                  gridRowEnd: item.weekdaysRangeId === 1 ? '4' : item.weekdaysRangeId === 2 ? '3' : '4',
                  bgcolor:
                    item.weekdaysRangeId === 1 ? '#662d9180' : item.weekdaysRangeId === 2 ? '#0047AB80' : '#BA002180',
                  border: '1px solid #FFF',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  pl: '0.25rem',
                  overflow: 'hidden',
                }}
              >
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {courseName?.name}
                </Typography>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
