'use client';

import { updateCohortClasses } from '@/actions/cohorts/updateCohortClasses';
import { CreateScheduleDialog } from '@/components/pages/cohorts/CreateScheduleDialog';
import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import ErrorMessages from '@/components/partials/ErrorMessages';
import Headline from '@/components/partials/Headline';
import { RequiredMark } from '@/components/partials/RequiredMark';
import { CLASSROOMS, CONFIRM, TOAST, WEEKDAYS_RANGES } from '@/constants/_index';
import getWeeklyHours from '@/helpers/getWeeklyHours';
import { dateFormat, datePickerFormat, inBoxScrollBar, tableStyle, thRowStyle } from '@/styles/_index';
import {
  GetBreaksResponse,
  GetCohortClass,
  GetCohortResponse,
  GetCohortsResponse,
  GetCoursesResponse,
  GetInstructorsResponse,
  Holiday,
} from '@/types/_index';
import { ExpandMore } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import WarningIcon from '@mui/icons-material/Warning';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SchedulePreview } from './SchedulePreview';
export type CreateType = 'new' | 'copy';

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

export interface WatchSchedule {
  startAt: Dayjs;
  endAt: Dayjs;
  cohortId: number;
  weekdaysRangeId: number;
  courseId: number;
  classroomId: number;
  instructorId: number;
}

interface CohortScheduleProps {
  cohort: GetCohortResponse;
  courses: GetCoursesResponse[];
  instructors: GetInstructorsResponse[];
  cohorts: GetCohortsResponse[];
  breaks: GetBreaksResponse[];
  holidays: Holiday[] | undefined;
}

const CohortSchedule: React.FC<CohortScheduleProps> = ({ cohort, courses, instructors, cohorts, breaks, holidays }) => {
  const [isScheduleEditable, setIsScheduleEditable] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filteredCohorts, setFilteredCohorts] = useState<GetCohortsResponse[]>(cohorts);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const router = useRouter();
  const now = dayjs();

  const scheduleItems: Array<GetCohortClass | GetBreaksResponse> = [
    ...cohort.classes,
    ...breaks.filter(
      (breakData) =>
        dayjs(cohort.intake.startAt) < dayjs(breakData.startAt) && dayjs(breakData.endAt) < dayjs(cohort.intake.endAt),
    ),
  ].sort((a, b) => {
    return dayjs(a.startAt).diff(dayjs(b.startAt));
  });

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
        courseId: classData.course.id,
        weekdaysRangeId: classData.weekdaysRange.data.id,
        classroomId: classData.classroom.data.id,
        instructorId: classData.instructor.data?.id,
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
      const { data: classes } = await updateCohortClasses(cohort.id, payload);
      setIsScheduleEditable(false);
      reset({
        schedule: classes.map((classData) => ({
          startAt: dayjs(classData.startAt),
          endAt: dayjs(classData.endAt),
          cohortId: cohort.id,
          weekdaysRangeId: classData.weekdaysRange.id,
          courseId: classData.course.id,
          classroomId: classData.classroom.id,
          instructorId: classData.instructor?.id,
        })),
      });
      toast.success(TOAST.success.updated);
      router.refresh();
    } catch (error: any) {
      toast.error(<ErrorMessages message={error.message} />);
    }
  };

  const handleCancelClick = () => {
    if (confirm(CONFIRM.cancel)) {
      setIsScheduleEditable(false);
      remove();
      if (cohort.classes.length > 0) {
        reset({
          schedule: cohort.classes.map((classData) => ({
            startAt: dayjs(classData.startAt),
            endAt: dayjs(classData.endAt),
            cohortId: cohort.id,
            weekdaysRangeId: classData.weekdaysRange.data.id,
            courseId: classData.course.id,
            classroomId: classData.classroom.data.id,
            instructorId: classData.instructor.data?.id,
          })),
        });
      }
    }
  };

  const getPlannedHours = (startAt: Date, endAt: Date, weekdaysRangeId: number): number => {
    const startDate = dayjs(startAt);
    const endDate = dayjs(endAt);

    const totalBreakWeeks = breaks.reduce((accumulator, breakItem) => {
      const { startAt, endAt } = breakItem;
      const breakStartDate = dayjs(startAt);
      const breakEndDate = dayjs(endAt);

      if (startDate <= breakStartDate && breakEndDate <= endDate) {
        const daysDiff = breakEndDate.diff(breakStartDate, 'day');
        const breakWeeks = Math.ceil(daysDiff / 7);
        return accumulator + breakWeeks;
      }

      return accumulator;
    }, 0);

    const daysDiff = endDate.diff(startDate, 'day');
    const totalWeeks = Math.ceil(daysDiff / 7);

    const weeklyHours = getWeeklyHours(weekdaysRangeId);

    return (totalWeeks - totalBreakWeeks) * weeklyHours;
  };

  const getRequiredHours = (courseId: number): number => {
    return courses.find((course) => course.id === courseId)?.requiredHours ?? 0;
  };

  const tooltipTitle = (messages: string[]) => {
    return (
      <ul>
        {messages.map((message, index) => (
          <li key={index}>&bull; {message}</li>
        ))}
      </ul>
    );
  };

  // dialog
  useEffect(() => {
    if (dialogOpen) {
      const filteredCohorts = cohorts.filter(
        (cohortItem) => cohortItem.program.id === cohort.program.id && cohortItem.id !== cohort.id,
      );
      setFilteredCohorts(filteredCohorts);
    }
  }, [dialogOpen]);

  useEffect(() => {
    cohort.classes.length === 0 && setDialogOpen(true);

    // Filter cohorts by the same program ID but excluding their own cohort ID.
    const filteredCohorts = cohorts.filter(
      (cohortItem) => cohortItem.program.id === cohort.program.id && cohortItem.id !== cohort.id,
    );
    setFilteredCohorts(filteredCohorts);
  }, []);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = (createType?: string, selectedCohort?: GetCohortsResponse) => {
    if (createType === 'new') {
      remove();
      append({
        startAt: now.startOf('day'),
        endAt: now.startOf('day'),
        cohortId: cohort.id,
        weekdaysRangeId: 1,
        courseId: 0,
        classroomId: 0,
        instructorId: 0,
      });
      setIsScheduleEditable(true);
    } else if (createType === 'copy' && selectedCohort) {
      const cohortIntakeStartAt = dayjs(cohort.intake.startAt);
      const copiedCohortIntakeStartAt = dayjs(selectedCohort.intake.startAt);
      // Reset form with copied cohort schedule
      reset({
        schedule: selectedCohort.classes.map((copiedClass) => {
          const startDaysDiffFromIntakeStart = dayjs(copiedClass.startAt).diff(copiedCohortIntakeStartAt, 'day');
          const endDaysDiffFromIntakeStart = dayjs(copiedClass.endAt).diff(copiedCohortIntakeStartAt, 'day');
          return {
            // Adjust startAt and endAt to appropriate periods for the intake of the cohort under editing.
            startAt: cohortIntakeStartAt.add(startDaysDiffFromIntakeStart, 'day'),
            endAt: cohortIntakeStartAt.add(endDaysDiffFromIntakeStart, 'day'),
            cohortId: selectedCohort.id,
            weekdaysRangeId: copiedClass.weekdaysRange.id,
            courseId: copiedClass.course.id,
            classroomId: copiedClass.classroom.id,
            instructorId: copiedClass.instructor?.id,
          };
        }),
      });
      setIsScheduleEditable(true);
    }
    setDialogOpen(false);
  };

  // DatePicker Break/Holiday disabled
  const isBreak = (date: Dayjs) =>
    breaks.some(
      (breakItem) =>
        dayjs(breakItem.startAt).subtract(1, 'day').isBefore(date, 'day') &&
        dayjs(breakItem.endAt).add(1, 'day').isAfter(date, 'day'),
    );
  const isHoliday = (date: Dayjs) => !!holidays && holidays.some((holiday) => dayjs(holiday.date).isSame(date));
  const isDateDisable = (date: Dayjs) => isBreak(date) || isHoliday(date);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateScheduleDialog dialogOpen={dialogOpen} onClose={handleClose} cohorts={filteredCohorts} />
        {/* Schedule Edit Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
          <Headline name={`Schedule: ${cohort?.name}`} />
          <Box>
            {isScheduleEditable ? (
              <Box sx={{ display: 'flex', gap: '1rem', width: 'fit-content' }}>
                <Button startIcon={<RefreshIcon />} variant="outlined" onClick={handleOpen}>
                  Reset
                </Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: 'primary.main' }} />
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

        {/* Schedule Preview Accordion */}
        <Accordion sx={{ mb: '1rem' }} onChange={() => setAccordionOpen(!accordionOpen)}>
          <AccordionSummary
            sx={{ bgcolor: 'grey.50', flexDirection: 'row-reverse', gap: '0.5rem' }}
            expandIcon={<ExpandMore />}
          >
            <Typography>Schedules of cohorts from same intake</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'grey.50', '& > div:last-child': { mb: 'unset' } }}>
            {cohorts
              .filter((cohortItem) => {
                return cohortItem.intake.id === cohort.intake.id && cohortItem.id !== cohort.id;
              })
              .map((cohortInSameIntake) => {
                return (
                  <Box key={cohortInSameIntake.id} sx={{ mb: '1rem', overflowX: 'scroll', ...inBoxScrollBar }}>
                    <SchedulePreview
                      cohort={cohortInSameIntake}
                      courses={courses}
                      schedule={cohortInSameIntake.classes}
                      breaks={breaks}
                      instructors={instructors}
                    />
                  </Box>
                );
              })}
          </AccordionDetails>
        </Accordion>

        {/* Current Page Cohort Schedule Preview */}
        <Box
          sx={{
            mb: '1rem',
            mx: accordionOpen ? '1rem' : '0',
            transition: '0.25s',
            overflowX: 'scroll',
            ...inBoxScrollBar,
          }}
        >
          <SchedulePreview
            cohort={cohort}
            courses={courses}
            watchSchedule={watchSchedule}
            breaks={breaks}
            instructors={instructors}
          />
        </Box>

        {/* Cohort Schedule */}
        <Box sx={{ overflowX: 'scroll', ...inBoxScrollBar }}>
          <Table
            sx={{
              minWidth: 650,
              ...tableStyle,
              '& tr th': { py: '0.5rem' },
            }}
          >
            <TableHead>
              <TableRow sx={thRowStyle}>
                <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>
                  Start Date
                  {isScheduleEditable && <RequiredMark />}
                </TableCell>
                <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>
                  End Date
                  {isScheduleEditable && <RequiredMark />}
                </TableCell>
                <TableCell sx={{ width: 'calc(100% * 2.5/12)' }}>
                  Course
                  {isScheduleEditable && <RequiredMark />}
                </TableCell>
                <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>
                  Days of the Week
                  {isScheduleEditable && <RequiredMark />}
                </TableCell>
                <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Hours / Required</TableCell>
                <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>
                  Classroom
                  {isScheduleEditable && <RequiredMark />}
                </TableCell>
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
                    const isTimeExceeded = plannedHours > requiredHours;
                    return (
                      <TableRow key={field.id}>
                        {/* StartAt */}
                        <TableCell sx={{ px: '0.5rem' }}>
                          <Controller
                            control={control}
                            name={`schedule.${index}.startAt`}
                            rules={{ required: true }}
                            render={({ field }: any) => {
                              return (
                                <DatePicker
                                  slotProps={{
                                    textField: { size: 'small' },
                                    day: (ownerState) => {
                                      if (isDateDisable(ownerState.day)) {
                                        return { sx: { bgcolor: 'grey.200' } };
                                      }
                                      return {};
                                    },
                                  }}
                                  shouldDisableDate={isDateDisable}
                                  value={dayjs(field.value)}
                                  format={datePickerFormat}
                                  onChange={(date) => {
                                    field.onChange(date);
                                  }}
                                />
                              );
                            }}
                          />
                        </TableCell>

                        {/* EndAt */}
                        <TableCell sx={{ px: '0.5rem' }}>
                          <Controller
                            control={control}
                            name={`schedule.${index}.endAt`}
                            rules={{ required: true }}
                            render={({ field }: any) => {
                              return (
                                <DatePicker
                                  slotProps={{
                                    textField: { size: 'small' },
                                    day: (ownerState) => {
                                      if (isDateDisable(ownerState.day)) {
                                        return { sx: { bgcolor: 'grey.200' } };
                                      }
                                      return {};
                                    },
                                  }}
                                  shouldDisableDate={isDateDisable}
                                  value={dayjs(field.value)}
                                  format={datePickerFormat}
                                  onChange={(date) => {
                                    field.onChange(date);
                                  }}
                                />
                              );
                            }}
                          />
                        </TableCell>

                        {/* CourseId */}
                        <TableCell sx={{ px: '0.5rem' }}>
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
                                      .filter((course) => course.program.id === cohort.program.id && !course.deletedAt)
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
                        <TableCell sx={{ px: '0.5rem' }}>
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
                          <span className={`${isTimeExceeded && 'text-red-500 font-semibold'}`}>{plannedHours}</span>/{' '}
                          {requiredHours}
                        </TableCell>

                        {/* ClassroomId */}
                        <TableCell sx={{ px: '0.5rem' }}>
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
                        <TableCell sx={{ px: '0.5rem' }}>
                          <Controller
                            control={control}
                            name={`schedule.${index}.instructorId`}
                            rules={{ required: false }}
                            render={({ field }: any) => {
                              return (
                                <FormControl fullWidth>
                                  <Select size="small" value={field.value} {...field}>
                                    {instructors.map((instructor) => (
                                      <MenuItem
                                        key={instructor.id}
                                        value={instructor.id}
                                        disabled={!instructor.isActive}
                                      >
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
                  {scheduleItems.map((scheduleItem) => {
                    const startDate = dayjs(scheduleItem.startAt).format(dateFormat);
                    const endDate = dayjs(scheduleItem.endAt).format(dateFormat);
                    const isClass = 'cohort' in scheduleItem;
                    if (isClass) {
                      const plannedHours = getPlannedHours(
                        scheduleItem.startAt,
                        scheduleItem.endAt,
                        scheduleItem.weekdaysRange.data.id,
                      );
                      const requiredHours = scheduleItem.course.requiredHours;
                      const isTimeExceeded = plannedHours > requiredHours;
                      return (
                        <TableRow key={scheduleItem.id}>
                          <TableCell>{startDate}</TableCell>
                          <TableCell>{endDate}</TableCell>
                          <TableCell>
                            {/* If course is deleted, add "(deleted)" to the name. */}
                            {scheduleItem.course.deletedAt
                              ? `${scheduleItem.course.name} (deleted)`
                              : scheduleItem.course.name}
                          </TableCell>
                          <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <DaysOfTheWeekChip daysOfTheWeek={scheduleItem.weekdaysRange.data} />
                            {scheduleItem.weekdaysRange.messages.length > 0 && (
                              <Tooltip title={tooltipTitle(scheduleItem.weekdaysRange.messages)}>
                                <WarningIcon
                                  fontSize="small"
                                  color="warning"
                                  sx={{ marginRight: '4px', cursor: 'pointer' }}
                                />
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className={`${isTimeExceeded && 'text-red-500 font-semibold'}`}>{plannedHours}</span>{' '}
                            / {requiredHours}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              {scheduleItem.classroom.data.name} ({scheduleItem.classroom.data.floor} floor)
                              {scheduleItem.classroom.messages.length > 0 && (
                                <Tooltip title={tooltipTitle(scheduleItem.classroom.messages)}>
                                  <WarningIcon fontSize="small" color="warning" sx={{ cursor: 'pointer' }} />
                                </Tooltip>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              {`${scheduleItem.instructor.data?.name} ${
                                scheduleItem.instructor.data?.deletedAt && '(deleted)'
                              }`}
                              {scheduleItem.instructor.messages.length > 0 && (
                                <Tooltip title={tooltipTitle(scheduleItem.instructor.messages)}>
                                  <WarningIcon
                                    fontSize="small"
                                    color="warning"
                                    sx={{ marginRight: '4px', cursor: 'pointer' }}
                                  />
                                </Tooltip>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      );
                    } else {
                      return (
                        <TableRow key={scheduleItem.id} sx={{ '& td': { bgcolor: 'grey.200' } }}>
                          <TableCell>{startDate}</TableCell>
                          <TableCell>{endDate}</TableCell>
                          <TableCell>School Break</TableCell>
                          <TableCell colSpan={5} />
                        </TableRow>
                      );
                    }
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
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default CohortSchedule;
