'use client';

import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray, SubmitHandler, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Headline from '@/components/partials/Headline';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import IconButton from '@mui/material/IconButton';
import getWeeklyHours from '@/helpers/getWeeklyHours';
import { updateCohortClasses } from '@/actions/cohorts/updateCohortClasses';
import { CLASSROOMS, WEEKDAYS_RANGES } from '@/constants/_index';
import { GetCoursesResponse, GetCohortResponse, GetInstructorsResponse } from '@/types/_index';
import { useRouter } from 'next/navigation';

type FormValues = {
  schedule: {
    startAt: Dayjs;
    endAt: Dayjs;
    cohortId: number;
    weekdaysRangeId: number;
    courseId: number;
    classroomId: number;
    instructorId: number;
  }[];
};

interface CohortScheduleProps {
  cohort: GetCohortResponse;
  courses: GetCoursesResponse[];
  instructors: GetInstructorsResponse[];
}

const CohortSchedule: React.FC<CohortScheduleProps> = ({ cohort, courses, instructors }) => {
  const [isScheduleEditable, setIsScheduleEditable] = useState(false);
  const router = useRouter();
  const now = dayjs();

  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      schedule: [
        {
          startAt: now,
          endAt: now,
          cohortId: 0,
          weekdaysRangeId: 0,
          courseId: 0,
          classroomId: 0,
          instructorId: 0,
        },
      ],
    },
  });

  const watchSchedule = watch('schedule');

  const { fields, append, remove } = useFieldArray<FormValues>({ control, name: 'schedule' });

  useEffect(() => {
    reset({
      schedule: cohort.classes.map((classData) => ({
        startAt: dayjs(classData.startAt),
        endAt: dayjs(classData.endAt),
        cohortId: cohort.id,
        weekdaysRangeId: classData.weekdaysRange.id,
        courseId: classData.course.id,
        classroomId: classData.classroom.id,
        instructorId: classData.instructor?.id,
      })),
    });
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = data.schedule.map((classData) => ({
        startAt: classData.startAt,
        endAt: classData.endAt,
        cohortId: cohort.id,
        weekdaysRangeId: classData.weekdaysRangeId,
        courseId: classData.courseId,
        classroomId: classData.classroomId,
        instructorId: classData.instructorId || undefined,
      }));
      await updateCohortClasses(cohort.id, payload);
      setIsScheduleEditable(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    const message = 'Do you really want to cancel?';
    if (confirm(message)) {
      setIsScheduleEditable(false);
      reset();
    }
  };

  const getPlannedHours = (startAt: Date, endAt: Date, weekdaysRangeId: number): number => {
    const startDate = dayjs(startAt);
    const endDate = dayjs(endAt);
    // TODO: Take break period into consideration
    const daysDiff = endDate.diff(startDate) / (24 * 60 * 60 * 1000);
    // As startAt is normally Monday and endAt is Friday, add 2(Saturday and Sunday) to get full week
    const totalWeeks = Math.round((Math.round(daysDiff) + 2) / 7);
    const weeklyHours = getWeeklyHours(weekdaysRangeId);

    return weeklyHours * totalWeeks;
  };

  const getRequiredHours = (courseId: number): number => {
    return courses.find((course) => course.id === courseId)?.requiredHours ?? 0;
  };

  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const thRowStyle = { bgcolor: 'primary.main', '& th': thStyle, '& th:last-child': { borderRight: 'none' } };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Schedule Edit Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
          <Headline name={`Schedule: ${cohort?.name}`} />
          <Box>
            {isScheduleEditable ? (
              <Box sx={{ display: 'flex', gap: '1rem', width: 'fit-content' }}>
                <Button variant="outlined" type="button" onClick={handleCancelClick}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            ) : (
              <Button onClick={() => setIsScheduleEditable(true)} variant="contained">
                Edit Schedule
              </Button>
            )}
          </Box>
        </Box>

        {/* Cohort Schedule */}
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={thRowStyle}>
              <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Start Date</TableCell>
              <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>End Date</TableCell>
              <TableCell sx={{ width: 'calc(100% * 2.5/12)' }}>Course</TableCell>
              <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Days of the Week</TableCell>
              <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Hours / Required</TableCell>
              <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Classroom</TableCell>
              <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Instructor</TableCell>
              <TableCell sx={{ width: 'calc(100% * 0.5/12)' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isScheduleEditable ? (
              <>
                {fields.map((field, index) => {
                  const plannedHours = getPlannedHours(
                    dayjs(watchSchedule[index].startAt).toDate(),
                    dayjs(watchSchedule[index].endAt).toDate(),
                    watchSchedule[index].weekdaysRangeId,
                  );
                  const requiredHours = getRequiredHours(watchSchedule[index].courseId as number);
                  return (
                    <TableRow key={field.id}>
                      {/* StartAt */}
                      <TableCell component="th" scope="row">
                        <Controller
                          control={control}
                          name={`schedule.${index}.startAt`}
                          rules={{ required: true }}
                          render={({ field }: any) => {
                            return (
                              <DatePicker
                                slotProps={{ textField: { size: 'small' } }}
                                value={dayjs(field.value)}
                                onChange={(date) => {
                                  field.onChange(date);
                                }}
                              />
                            );
                          }}
                        />
                      </TableCell>

                      {/* EndAt */}
                      <TableCell>
                        <Controller
                          control={control}
                          name={`schedule.${index}.endAt`}
                          rules={{ required: true }}
                          render={({ field }: any) => {
                            return (
                              <DatePicker
                                slotProps={{ textField: { size: 'small' } }}
                                value={dayjs(field.value)}
                                onChange={(date) => {
                                  field.onChange(date);
                                }}
                              />
                            );
                          }}
                        />
                      </TableCell>

                      {/* CourseId */}
                      <TableCell>
                        <Controller
                          control={control}
                          name={`schedule.${index}.courseId`}
                          rules={{ required: true }}
                          render={({ field }: any) => {
                            return (
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  value={field.value}
                                  required
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                >
                                  {courses
                                    .filter((course) => course.program.id === cohort.program.id)
                                    .map((course) => {
                                      return (
                                        <MenuItem key={course.id} value={course.id}>
                                          {course.name}
                                        </MenuItem>
                                      );
                                    })}
                                </Select>
                              </FormControl>
                            );
                          }}
                        />
                      </TableCell>

                      {/* WeekdaysRangeId */}
                      <TableCell>
                        <Controller
                          control={control}
                          name={`schedule.${index}.weekdaysRangeId`}
                          rules={{ required: true }}
                          render={({ field }: any) => {
                            return (
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  value={field.value}
                                  required
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                >
                                  {WEEKDAYS_RANGES.map((range) => {
                                    return (
                                      <MenuItem key={range.id} value={range.id}>
                                        {range.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            );
                          }}
                        />
                      </TableCell>

                      {/* Hours met */}
                      <TableCell>
                        <span className={`${plannedHours > requiredHours && 'text-red-500 font-semibold'}`}>
                          {plannedHours}
                        </span>{' '}
                        / {requiredHours}
                      </TableCell>

                      {/* ClassroomId */}
                      <TableCell>
                        <Controller
                          control={control}
                          name={`schedule.${index}.classroomId`}
                          rules={{ required: true }}
                          render={({ field }: any) => {
                            return (
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  value={field.value}
                                  required
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                  }}
                                >
                                  {CLASSROOMS.map((classroom) => {
                                    return (
                                      <MenuItem key={classroom.id} value={classroom.id}>
                                        {classroom.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            );
                          }}
                        />
                      </TableCell>

                      {/* InstructorId */}
                      <TableCell>
                        <Controller
                          control={control}
                          name={`schedule.${index}.instructorId`}
                          rules={{ required: false }}
                          render={({ field }: any) => {
                            return (
                              <FormControl fullWidth>
                                <Select size="small" value={field.value} required {...field}>
                                  {instructors.map((instructor) => (
                                    <MenuItem key={instructor.id} value={instructor.id} disabled={!instructor.isActive}>
                                      {instructor.name} {!instructor.isActive && '(Inactive)'}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            );
                          }}
                        />
                      </TableCell>

                      {/* Delete */}
                      <TableCell>
                        {isScheduleEditable ? (
                          <IconButton type="button" aria-label="delete" onClick={() => remove(index)}>
                            <DeleteIcon sx={{ color: 'grey' }} />
                          </IconButton>
                        ) : (
                          ''
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            ) : (
              <>
                {cohort.classes.map((classData) => {
                  const plannedHours = getPlannedHours(classData.startAt, classData.endAt, classData.weekdaysRange.id);
                  const requiredHours = classData.course.requiredHours;
                  return (
                    <TableRow key={classData.id}>
                      <TableCell component="th" scope="row">
                        {dayjs(classData.startAt).format('YYYY-MM-DD (ddd)')}
                      </TableCell>
                      <TableCell>{dayjs(classData.endAt).format('YYYY-MM-DD (ddd)')}</TableCell>
                      <TableCell>{classData.course.name}</TableCell>
                      <TableCell>
                        <DaysOfTheWeekChip daysOfTheWeek={classData.weekdaysRange} />
                      </TableCell>
                      <TableCell>
                        <span className={`${plannedHours > requiredHours && 'text-red-500 font-semibold'}`}>
                          {plannedHours}
                        </span>{' '}
                        / {requiredHours}
                      </TableCell>
                      <TableCell>
                        {classData.classroom.name} ({classData.classroom.floor} floor)
                      </TableCell>
                      <TableCell>{classData.instructor?.name}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
        {isScheduleEditable && (
          <Box sx={{ display: 'flex', justifyItems: 'center' }}>
            <Button
              startIcon={<AddCircleIcon />}
              sx={{ marginTop: '1rem', marginInline: 'auto' }}
              type="button"
              variant="contained"
              onClick={() =>
                append({
                  startAt: now.startOf('day'),
                  endAt: now.startOf('day'),
                  cohortId: cohort.id,
                  weekdaysRangeId: 1,
                  courseId: 0,
                  classroomId: 0,
                  instructorId: 0,
                })
              }
            >
              Add Course
            </Button>
          </Box>
        )}
      </form>
    </LocalizationProvider>
  );
};

export default CohortSchedule;
