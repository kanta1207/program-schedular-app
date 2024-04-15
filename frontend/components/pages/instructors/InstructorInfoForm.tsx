'use client';
import { createInstructor } from '@/actions/instructors/createInstructor';
import { deleteInstructor } from '@/actions/instructors/deleteInstructor';
import { updateInstructor } from '@/actions/instructors/updateInstructor';
import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import ErrorMessages from '@/components/partials/ErrorMessages';
import { RequiredMark } from '@/components/partials/RequiredMark';
import {
  CONFIRM,
  CONTRACT_TYPES,
  DESIRED_WORKING_HOURS,
  PERIOD_OF_DAYS,
  TOAST,
  WEEKDAYS_RANGES,
} from '@/constants/_index';
import { GetCoursesResponse, GetInstructorResponse, GetProgramsResponse } from '@/types/_index';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next-nprogress-bar';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormValues = {
  name: string;
  contractTypeId: number;
  desiredWorkingHours: number | null;
  weekdaysRangeId: number;
  periodOfDayIds: number[];
  isActive: boolean;
  courseIds: number[];
  note: string;
};

interface InstructorInfoFormProps {
  instructor?: GetInstructorResponse;
  courses: GetCoursesResponse[];
  programs: GetProgramsResponse[];
}

const InstructorInfoForm: React.FC<InstructorInfoFormProps> = ({ instructor, courses, programs }) => {
  const [isEditable, setIsEditMode] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (instructor) {
      setIsEditMode(false);
      reset({
        name: instructor.name,
        contractTypeId: instructor.contractType.id,
        desiredWorkingHours: instructor.desiredWorkingHours ?? 10,
        weekdaysRangeId: instructor.weekdaysRange.id,
        periodOfDayIds: instructor.periodOfDays.map(({ id }) => id),
        isActive: instructor.isActive,
        courseIds: instructor.courses.map(({ id }) => id),
        note: instructor.note ?? '',
      });
    }
  }, []);

  const handleCancel = () => {
    const isConfirmed = confirm(CONFIRM.cancel);
    if (isConfirmed) {
      if (instructor) {
        setIsEditMode(false);
        reset({
          name: instructor.name,
          contractTypeId: instructor.contractType.id,
          desiredWorkingHours: instructor.desiredWorkingHours ?? 10,
          weekdaysRangeId: instructor.weekdaysRange.id,
          periodOfDayIds: instructor.periodOfDays?.map(({ id }) => id),
          isActive: instructor.isActive,
          courseIds: instructor.courses.map(({ id }) => id),
          note: instructor.note ?? '',
        });
      } else {
        router.push('/instructors');
      }
    }
  };

  const handleDelete = async () => {
    const isConfirmed = confirm(CONFIRM.delete);
    if (isConfirmed && instructor) {
      try {
        await deleteInstructor(instructor.id);
        router.push('/instructors');
        router.refresh();
        toast.success(TOAST.success.deleted);
      } catch (error: any) {
        toast.error(<ErrorMessages message={error.message} />);
      }
    }
  };

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      name: '',
      contractTypeId: 1,
      desiredWorkingHours: 10,
      weekdaysRangeId: 1,
      periodOfDayIds: [] as number[],
      isActive: true,
      courseIds: [] as number[],
      note: '',
    },
  });

  const contractTypeId = watch('contractTypeId');
  // Needed to be cast as the type changes string when user selects an item in form
  const contractTypeIdNumber = Number(contractTypeId);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // The value of the input from the radio button must be cast to a numeric type
    try {
      let payload = {
        name: data.name,
        contractTypeId: +data.contractTypeId,
        desiredWorkingHours: data.desiredWorkingHours,
        weekdaysRangeId: +data.weekdaysRangeId,
        periodOfDayIds: data.periodOfDayIds,
        isActive: data.isActive,
        courseIds: data.courseIds,
        note: data.note || null,
      };

      const contractType = CONTRACT_TYPES.find(({ id }) => id === payload.contractTypeId)?.name;
      if (contractType === 'Contract' && data.desiredWorkingHours) {
        payload = {
          ...payload,
          desiredWorkingHours: +data.desiredWorkingHours,
        };
      } else {
        payload = {
          ...payload,
          desiredWorkingHours: null,
        };
      }

      if (instructor) {
        const { data: updatedInstructor } = await updateInstructor(instructor.id, payload);
        reset({
          name: updatedInstructor.name,
          contractTypeId: updatedInstructor.contractType.id,
          desiredWorkingHours: updatedInstructor.desiredWorkingHours ?? 10,
          weekdaysRangeId: updatedInstructor.weekdaysRange.id,
          periodOfDayIds: updatedInstructor.periodOfDays.map(({ id }) => id),
          isActive: updatedInstructor.isActive,
          courseIds: updatedInstructor.courses.map(({ id }) => id),
          note: updatedInstructor.note ?? '',
        });
        setIsEditMode(false);
        router.refresh();
        toast.success(TOAST.success.updated);
      } else {
        const { data: newInstructor } = await createInstructor(payload);
        router.push(`/instructors/${newInstructor.id}`);
        toast.success(TOAST.success.created);
      }
    } catch (error: any) {
      toast.error(<ErrorMessages message={error.message} />);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableContainer>
        <Table
          sx={{
            '& td': { border: 'none', py: '0.5rem', px: '0', fontSize: '1rem' },
            '& td:first-child': { width: '6rem' },
          }}
        >
          <TableBody>
            {/* name */}
            <TableRow>
              <TableCell>
                Name
                {isEditable && <RequiredMark />}
              </TableCell>
              <TableCell>
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: true }}
                  render={({ field }: any) => {
                    return (
                      <TextField
                        sx={{ width: '20rem' }}
                        size="small"
                        value={field.value}
                        onChange={(name) => field.onChange(name)}
                        disabled={!isEditable}
                      />
                    );
                  }}
                />
              </TableCell>
            </TableRow>
            {/* contracts */}
            <TableRow>
              <TableCell>
                Contract
                {isEditable && <RequiredMark />}
              </TableCell>
              <TableCell>
                <Controller
                  name="contractTypeId"
                  control={control}
                  rules={{ required: 'Contract type is required' }}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {CONTRACT_TYPES.map((contract) => (
                        <FormControlLabel
                          key={contract.id}
                          value={contract.id}
                          control={<Radio />}
                          label={contract.name}
                          disabled={!isEditable}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </TableCell>
            </TableRow>
            {/* Desired Working Hours */}
            {contractTypeIdNumber === 3 && (
              <TableRow>
                <TableCell>
                  Desired Hours
                  {isEditable && <RequiredMark />}
                </TableCell>
                <TableCell>
                  <Controller
                    name="desiredWorkingHours"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        {DESIRED_WORKING_HOURS.map((hour) => (
                          <FormControlLabel
                            key={hour}
                            value={hour}
                            control={<Radio />}
                            label={`${hour}`}
                            disabled={!isEditable}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                </TableCell>
              </TableRow>
            )}
            {/* Weekdays Range */}
            <TableRow>
              <TableCell>
                Days
                {isEditable && <RequiredMark />}
              </TableCell>
              <TableCell>
                <Controller
                  name="weekdaysRangeId"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {WEEKDAYS_RANGES.map((range) => (
                        <FormControlLabel
                          key={range.id}
                          value={range.id}
                          control={<Radio />}
                          label={
                            <DaysOfTheWeekChip
                              daysOfTheWeek={range}
                              activeState={
                                isEditable
                                  ? 'active'
                                  : instructor?.weekdaysRange.id === range.id
                                  ? 'semiActive'
                                  : 'inactive'
                              }
                            />
                          }
                          disabled={!isEditable}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </TableCell>
            </TableRow>
            {/* Period */}
            <TableRow>
              <TableCell>Period{isEditable && <RequiredMark />}</TableCell>
              <TableCell>
                <Controller
                  name="periodOfDayIds"
                  control={control}
                  render={({ field }) => (
                    <FormGroup row>
                      {PERIOD_OF_DAYS.map((period) => (
                        <FormControlLabel
                          key={period.id}
                          control={
                            <Checkbox
                              value={period.id}
                              checked={field.value.includes(period.id)}
                              onChange={(e) => {
                                const selectedValue = +e.target.value;
                                setValue(
                                  'periodOfDayIds',
                                  field.value.includes(selectedValue)
                                    ? field.value.filter((value) => value !== selectedValue)
                                    : [...field.value, selectedValue],
                                );
                              }}
                            />
                          }
                          label={`${period.name} (${period.time})`}
                          disabled={!isEditable}
                        />
                      ))}
                    </FormGroup>
                  )}
                />
              </TableCell>
            </TableRow>
            {/* Active */}
            <TableRow>
              <TableCell>
                Active
                {isEditable && <RequiredMark />}
              </TableCell>
              <TableCell>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      disabled={!isEditable}
                    />
                  )}
                />
              </TableCell>
            </TableRow>
            {/* Course */}
            <TableRow>
              <TableCell>Course{isEditable && <RequiredMark />}</TableCell>
              <TableCell>
                <Controller
                  name="courseIds"
                  control={control}
                  render={({ field }) => (
                    <FormGroup row>
                      {programs.map((program) => (
                        <Box key={program.id}>
                          <Typography variant="subtitle1">{program.name}</Typography>
                          {courses
                            .filter((course) => course.program.id === program.id)
                            .map((filteredCourse) => (
                              <FormControlLabel
                                key={filteredCourse.id}
                                control={
                                  <Checkbox
                                    value={filteredCourse.id}
                                    checked={field.value.includes(filteredCourse.id)}
                                    onChange={(e) => {
                                      const selectedValue = +e.target.value;
                                      setValue(
                                        'courseIds',
                                        field.value.includes(selectedValue)
                                          ? field.value.filter((value) => value !== selectedValue)
                                          : [...field.value, selectedValue],
                                      );
                                    }}
                                  />
                                }
                                label={filteredCourse.name}
                                disabled={!isEditable}
                              />
                            ))}
                        </Box>
                      ))}
                    </FormGroup>
                  )}
                />
              </TableCell>
            </TableRow>
            {/* Note */}
            <TableRow>
              <TableCell>Note</TableCell>
              <TableCell>
                <Controller
                  control={control}
                  name="note"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      minRows={4}
                      maxRows={Infinity}
                      multiline
                      variant="outlined"
                      sx={{ width: '40rem' }}
                      disabled={!isEditable}
                    />
                  )}
                />
              </TableCell>
            </TableRow>

            {/* Buttons */}
            <TableRow>
              <TableCell colSpan={2} align="right">
                <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
                  {isEditable ? (
                    <>
                      <Button variant="outlined" type="button" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outlined" type="button" onClick={() => setIsEditMode(true)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" type="button" onClick={handleDelete}>
                        Delete
                      </Button>
                    </>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};
export default InstructorInfoForm;
