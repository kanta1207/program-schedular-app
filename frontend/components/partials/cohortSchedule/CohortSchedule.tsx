'use client';

import { updateCohortClasses } from '@/actions/cohorts/updateCohortClasses';
import { CreateScheduleDialog } from '@/components/partials/cohortSchedule/CreateScheduleDialog';
import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import ErrorMessages from '@/components/partials/ErrorMessages';
import Headline from '@/components/partials/Headline';
import { RequiredMark } from '@/components/partials/RequiredMark';
import { CLASSROOMS, CONFIRM, TOAST, WEEKDAYS_RANGES } from '@/constants/_index';
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
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ClassItem, ScheduleStackView } from './ScheduleStackView';
import getPlannedHours from '@/helpers/getPlannedHours';
import getRequiredHours from '@/helpers/getRequiredHours';
import isBreak from '@/helpers/isBreak';
import isHoliday from '@/helpers/isHoliday';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TooltipInstructorContent from './TooltipInstructorContent';

export type CreateType = 'new' | 'copy';

type FormValues = {
  schedule: {
    startAt: Date;
    endAt: Date;
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
  isScheduleEditable: boolean;
  setIsScheduleEditable: Dispatch<SetStateAction<boolean>>;
  resetFlag?: boolean;
}

const CohortSchedule: React.FC<CohortScheduleProps> = ({
  cohort,
  courses,
  instructors,
  cohorts,
  breaks,
  holidays,
  isScheduleEditable,
  setIsScheduleEditable,
  resetFlag,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copyableCohorts, setCopyableCohorts] = useState<GetCohortsResponse[]>(cohorts);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [cohortsInSameIntake, setCohortsInSameIntake] = useState<GetCohortsResponse[]>();
  const router = useRouter();
  const pathname = usePathname();

  const now = dayjs();

  const cohortIntakeStartAt =
    dayjs(cohort.intake.startAt).day() === 2
      ? dayjs(cohort.intake.startAt).subtract(1, 'day')
      : dayjs(cohort.intake.startAt);

  const initCopyableCohorts = () => {
    const copyableCohorts = cohorts.filter(
      (cohortItem) => cohortItem.program.id === cohort.program.id && cohortItem.id !== cohort.id,
    );
    setCopyableCohorts(copyableCohorts);
  };

  const initCohortsInSameIntake = () => {
    const filteredCohorts = cohorts.filter(
      (cohortItem) => cohortItem.intake.id === cohort.intake.id && cohortItem.id !== cohort.id,
    );
    setCohortsInSameIntake(filteredCohorts);
  };

  const getInitialCohortClasses = () => {
    return cohort.classes.map((classData) => ({
      startAt: classData.startAt,
      endAt: classData.endAt,
      cohortId: cohort.id,
      weekdaysRangeId: classData.weekdaysRange.data.id,
      courseId: classData.course.id,
      classroomId: classData.classroom.data.id,
      instructorId: classData.instructor.data?.id,
    }));
  };

  useEffect(() => {
    // Enable users to create schedule without clicking on "Edit schedule" manually
    if (pathname.split('/')[1] === 'cohorts' && cohort.classes.length === 0) {
      setDialogOpen(true);
    }

    initCopyableCohorts();
  }, []);

  // When given cohort has changed, other cohorts within the same intake and its form data should be initiated
  useEffect(() => {
    initCohortsInSameIntake();
    initCopyableCohorts();
    // Reset form to update watch data
    reset({ schedule: getInitialCohortClasses() });
  }, [cohort]);

  useEffect(() => {
    setIsScheduleEditable(false);
    reset({ schedule: getInitialCohortClasses() });
  }, [resetFlag]);

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
    defaultValues: { schedule: getInitialCohortClasses() },
  });

  const watchSchedule = watch('schedule');

  const { fields, append, remove } = useFieldArray<FormValues>({ control, name: 'schedule' });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = data.schedule.map((classData) => ({
        startAt: dayjs(classData.startAt),
        endAt: dayjs(classData.endAt),
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
          startAt: classData.startAt,
          endAt: classData.endAt,
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

  const handleCancel = () => {
    if (confirm(CONFIRM.cancel)) {
      setIsScheduleEditable(false);
      remove();
      if (cohort.classes.length > 0) {
        reset({ schedule: getInitialCohortClasses() });
      }
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (createType?: string, selectedCohort?: GetCohortsResponse) => {
    if (createType === 'new') {
      remove();
      append({
        startAt: cohortIntakeStartAt.toDate(),
        endAt: cohortIntakeStartAt.add(25, 'day').toDate(), // 4 weeks
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
            startAt: cohortIntakeStartAt.add(startDaysDiffFromIntakeStart, 'day').toDate(),
            endAt: cohortIntakeStartAt.add(endDaysDiffFromIntakeStart, 'day').toDate(),
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

  const isDateDisable = (date: Dayjs) => isBreak(date.toDate(), breaks) || isHoliday(date.toDate(), holidays);

  const tooltipTitle = (messages: string[]) => {
    return (
      <ul>
        {messages.map((message, index) => (
          <li key={index}>&bull; {message}</li>
        ))}
      </ul>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateScheduleDialog dialogOpen={dialogOpen} onClose={handleDialogClose} cohorts={copyableCohorts} />
        {/* Schedule Edit Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
          <Headline name={`Schedule: ${cohort?.name}`} />
          <Box>
            {isScheduleEditable ? (
              <Box sx={{ display: 'flex', gap: '1rem', width: 'fit-content' }}>
                <Button startIcon={<RefreshIcon />} variant="outlined" onClick={handleDialogOpen}>
                  Reset
                </Button>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: 'primary.main' }} />
                <Button variant="outlined" type="button" onClick={handleCancel}>
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

        {/* Other schedules within the same intake */}
        <Accordion sx={{ mb: '1rem' }} onChange={() => setAccordionOpen((isOpen) => !isOpen)}>
          <AccordionSummary
            sx={{ bgcolor: 'grey.50', flexDirection: 'row-reverse', gap: '0.5rem' }}
            expandIcon={<ExpandMore />}
          >
            <Typography>Other schedule within the same intake</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'grey.50', '& > div:last-child': { mb: 'unset' } }}>
            {cohortsInSameIntake && cohortsInSameIntake.length > 0 ? (
              <>
                {cohortsInSameIntake.map((cohort) => {
                  const classItems: ClassItem[] = cohort.classes.map((classItem) => ({
                    cohortId: classItem.cohort.id,
                    courseId: classItem.course.id,
                    weekdaysRangeId: classItem.weekdaysRange.id,
                    instructorId: classItem.instructor?.id,
                    classroomId: classItem.classroom.id,
                    startAt: classItem.startAt,
                    endAt: classItem.endAt,
                  }));
                  return (
                    <Box key={cohort.id} sx={{ mb: '1rem', overflowX: 'scroll', ...inBoxScrollBar }}>
                      <ScheduleStackView
                        cohorts={cohorts}
                        courses={courses}
                        instructors={instructors}
                        classItems={classItems}
                        breaks={breaks}
                        intakeStartDate={cohortIntakeStartAt.toDate()}
                        intakeEndDate={cohort.intake.endAt}
                      />
                    </Box>
                  );
                })}
              </>
            ) : (
              <Typography sx={{ pl: '2rem' }}>No cohort found</Typography>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Realtime Preview */}
        <Box
          sx={{
            mb: '1rem',
            mx: accordionOpen ? '1rem' : '0',
            transition: '0.25s',
            overflowX: 'scroll',
            ...inBoxScrollBar,
          }}
        >
          <ScheduleStackView
            cohorts={cohorts}
            courses={courses}
            instructors={instructors}
            classItems={watchSchedule}
            breaks={breaks}
            intakeStartDate={cohortIntakeStartAt.toDate()}
            intakeEndDate={cohort.intake.endAt}
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
                      breaks,
                    );
                    const requiredHours = getRequiredHours(watchSchedule[index].courseId, courses);
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
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
                                          <Tooltip title={<TooltipInstructorContent instructor={instructor} />}>
                                            <InfoOutlinedIcon
                                              fontSize="small"
                                              color="primary"
                                              sx={{ cursor: 'pointer' }}
                                            />
                                          </Tooltip>
                                          <p>
                                            {instructor.name} {!instructor.isActive && '(Inactive)'}
                                          </p>
                                        </Box>
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
                  {scheduleItems.map((scheduleItem, i) => {
                    const startDate = dayjs(scheduleItem.startAt).format(dateFormat);
                    const endDate = dayjs(scheduleItem.endAt).format(dateFormat);
                    const isClass = 'cohort' in scheduleItem;
                    if (isClass) {
                      const plannedHours = getPlannedHours(
                        scheduleItem.startAt,
                        scheduleItem.endAt,
                        scheduleItem.weekdaysRange.data.id,
                        breaks,
                      );
                      const requiredHours = scheduleItem.course.requiredHours;
                      const isTimeExceeded = plannedHours > requiredHours;
                      return (
                        <TableRow key={i}>
                          <TableCell>{startDate}</TableCell>
                          <TableCell>{endDate}</TableCell>
                          <TableCell>{scheduleItem.course.name}</TableCell>
                          <TableCell>
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
                              {scheduleItem.instructor.data?.name}
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
                        <TableRow key={i} sx={{ '& td': { bgcolor: 'grey.200' } }}>
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
                    startAt: now.startOf('day').toDate(),
                    endAt: now.startOf('day').add(25, 'day').toDate(),
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
