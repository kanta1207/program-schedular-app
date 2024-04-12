import { WEEKDAYS_RANGES } from '@/constants/weekdays-range';
import calculateWeeksBetweenDates from '@/helpers/calculateWeeksBetweenDates';
import getBreaksBetweenDates from '@/helpers/getBreaksBetweenDates';
import { GetBreaksResponse, GetCohortsResponse, GetCoursesResponse, GetInstructorsResponse } from '@/types/_index';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface SchedulePreviewProps {
  cohorts: GetCohortsResponse[];
  courses: GetCoursesResponse[];
  instructors: GetInstructorsResponse[];
  classItems: ClassItem[];
  breaks: GetBreaksResponse[];
  intakeStartDate: Date;
  intakeEndDate: Date;
}

export interface ClassItem {
  cohortId: number;
  courseId: number;
  weekdaysRangeId: number;
  instructorId: number | undefined;
  classroomId: number;
  startAt: Date;
  endAt: Date;
}

export const ScheduleStackView: React.FC<SchedulePreviewProps> = ({
  cohorts,
  courses,
  instructors,
  classItems,
  breaks,
  intakeStartDate,
  intakeEndDate,
}) => {
  const getWeekLabels = (totalWeeks: number, intakeStartDate: Date) => {
    return Array.from({ length: totalWeeks }, (_, i) => {
      const startDate = dayjs(intakeStartDate)
        .add(i * 7, 'day')
        .format('MM-DD');
      const endDate = dayjs(startDate).add(4, 'day').format('MM-DD');
      return { id: i, startDate, endDate };
    });
  };

  const getStartWeek = (startDate: Date, intakeStartDate: Date) => {
    // if the day of week of startAt is Tuesday, subtract 1 day to set startAt as Monday
    const scheduleStartAt = dayjs(startDate).day() === 2 ? dayjs(startDate).subtract(1, 'day') : dayjs(startDate);
    const daysFromIntakeStartDate = scheduleStartAt.diff(intakeStartDate, 'day');
    return Math.ceil(daysFromIntakeStartDate / 7);
  };

  const getClassStacks = (classItems: ClassItem[]) => {
    return classItems.map((classItem) => ({
      name: cohorts.find(({ id }) => id === classItem.cohortId)?.name,
      startWeek: getStartWeek(classItem.startAt, intakeStartDate),
      totalWeeks: calculateWeeksBetweenDates(classItem.startAt, classItem.endAt),
      course: courses.find((course) => course.id === classItem.courseId),
      weekdaysRange: WEEKDAYS_RANGES.find((range) => range.id === classItem.weekdaysRangeId),
      instructor: instructors.find((instructor) => instructor.id === classItem.instructorId),
    }));
  };

  const getBreakStacks = (breaks: GetBreaksResponse[]) => {
    return breaks.map((breakItem) => ({
      startWeek: getStartWeek(breakItem.startAt, intakeStartDate),
      totalWeeks: calculateWeeksBetweenDates(breakItem.startAt, breakItem.endAt),
    }));
  };

  const gridColumnStart = (startIndex: number) => {
    // Add 2 to startIndex because grid column border index starts from 1,
    // and the first column (border 1 to 2) is used for header
    return startIndex + 2;
  };

  const intakeTotalWeeks = calculateWeeksBetweenDates(intakeStartDate, intakeEndDate);
  const weekLabels = getWeekLabels(intakeTotalWeeks, intakeStartDate);
  const classStacks = getClassStacks(classItems);
  const breakStacks = getBreakStacks(getBreaksBetweenDates(breaks, intakeStartDate, intakeEndDate));

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
        '& p': { textAlign: 'center', lineHeight: '1.2' },
      }}
    >
      {/* Cohort name */}
      <Box className="schedule-grid-child" sx={{ gridColumn: '1', gridRowStart: '1' }}>
        <Typography variant="h6">{classStacks.length > 0 && classStacks[0].name}</Typography>
      </Box>

      {/* Column Header (Days of the week)*/}
      <Box className="schedule-grid-child" sx={{ gridColumn: '1', gridRowStart: '2' }}>
        <Typography>Mon - Wed</Typography>
      </Box>
      <Box className="schedule-grid-child" sx={{ gridColumn: '1', gridRowStart: '3' }}>
        <Typography>Wed - Fri</Typography>
      </Box>

      {/* Break Stacks */}
      {breakStacks.map((breakStack, index) => (
        <Box
          key={index}
          sx={{
            gridColumn: `${gridColumnStart(breakStack.startWeek)} / span ${breakStack.totalWeeks}`,
            gridRow: '1 / span 3',
            bgcolor: 'grey.200',
          }}
        />
      ))}

      {/* Week Labels  */}
      {weekLabels.length > 0 &&
        weekLabels.map((label) => (
          <Box
            key={label.id}
            sx={{
              gridColumn: gridColumnStart(label.id),
              gridRow: '1 / span 3',
              border: '1px solid',
              borderColor: 'grey.200',
              margin: '-1px',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem' }}>
              {label.startDate}
              <br />
              {label.endDate}
            </Typography>
          </Box>
        ))}

      {/* Class Stacks */}
      {classStacks.length > 0 &&
        classStacks.map((classStack, index) => (
          <Box
            key={index}
            className="schedule-grid-child"
            sx={{
              gridColumn: `${gridColumnStart(classStack.startWeek)} / span ${classStack.totalWeeks}`,
              gridRow:
                classStack.weekdaysRange?.id === 1 ? '2 / span 2' : classStack.weekdaysRange?.id === 2 ? '2' : '3',
              bgcolor: `${classStack.weekdaysRange?.color.primary}80`,
              border: '1px solid #FFF',
              color: '#FFF',
            }}
          >
            <Typography sx={{ fontSize: '0.9rem' }}>
              {classStack.course?.name} - {classStack.instructor ? classStack.instructor?.name : 'N/A'}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};
