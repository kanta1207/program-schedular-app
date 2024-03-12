'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
import { courses } from '@/mock/_index';
import { deleteInstructor } from '@/actions/instructors/deleteInstructor';
import { CONTRACT_TYPES, DESIRED_WORKING_HOURS, PERIOD_OF_DAYS, PROGRAMS, WEEKDAYS_RANGES } from '@/constants/_index';
import { updateInstructor } from '@/actions/instructors/updateInstructor';
import { createInstructor } from '@/actions/instructors/createInstructor';
import { GetInstructorResponse } from '@/types/_index';

type FormValues = {
  name: string;
  contractTypeId: number;
  desiredWorkingHours?: number;
  weekdaysRangeId: number;
  periodOfDayIds: number[];
  isActive: boolean;
  courseIds: number[];
  note: string;
};

interface InstructorInfoFormProps {
  instructor?: GetInstructorResponse;
}
const InstructorInfoForm: React.FC<InstructorInfoFormProps> = ({ instructor }) => {
  const [isEditable, setIsEditMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (instructor) {
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
    } else {
      setIsEditMode(true);
    }
  }, []);

  const handleCancel = () => {
    const isConfirmed = confirm('Do you want to cancel?');
    if (isConfirmed) {
      if (instructor) {
        setIsEditMode(false);
        reset({
          name: instructor.name,
          contractTypeId: instructor.contractType.id,
          desiredWorkingHours: instructor.desiredWorkingHours,
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
    const isConfirmed = confirm('Do you want to delete?');
    if (isConfirmed && instructor) {
      await deleteInstructor(instructor.id);
      router.push('/instructors');
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
  const contractTypeIdNumber = Number(contractTypeId);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      let payload: Partial<FormValues> & { contractTypeId: number } = {
        name: data.name,
        contractTypeId: +data.contractTypeId,
        weekdaysRangeId: +data.weekdaysRangeId,
        periodOfDayIds: data.periodOfDayIds,
        isActive: data.isActive,
        courseIds: data.courseIds,
        note: data.note || null,
      };

      // Conditionally add desiredWorkingHours if not Full-Time or Part-Time
      if (payload.contractTypeId !== 1 && payload.contractTypeId !== 2) {
        payload = {
          ...payload,
          desiredWorkingHours: +data.desiredWorkingHours,
        };
      }

      if (instructor) {
        const { data: updatedInstructor } = await updateInstructor(instructor.id, payload);
        reset({
          name: updatedInstructor.name,
          contractTypeId: updatedInstructor.contractType.id,
          desiredWorkingHours: updatedInstructor.desiredWorkingHours,
          weekdaysRangeId: updatedInstructor.weekdaysRange.id,
          periodOfDayIds: updatedInstructor.periodOfDays.map(({ id }) => id),
          isActive: updatedInstructor.isActive,
          courseIds: updatedInstructor.courses.map(({ id }) => id),
          note: updatedInstructor.note ?? '',
        });
        setIsEditMode(false);
      } else {
        const { data: newInstructor } = await createInstructor(payload);
        router.push(`/instructors/${newInstructor.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableContainer>
        <Table aria-label="Instructor form table">
          <TableBody>
            {/* name */}
            <TableRow>
              <TableCell sx={{ border: 'none' }}>Name:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: true }}
                  render={({ field }: any) => {
                    return (
                      <TextField
                        sx={{ width: '20rem' }}
                        size="small"
                        value={field.value ?? ''}
                        inputRef={field.ref}
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
              <TableCell sx={{ border: 'none' }}>Contract:</TableCell>
              <TableCell sx={{ border: 'none' }}>
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
                <TableCell sx={{ border: 'none' }}>Desired Hours:</TableCell>
                <TableCell sx={{ border: 'none' }}>
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
              <TableCell sx={{ border: 'none' }}>Days:</TableCell>
              <TableCell sx={{ border: 'none' }}>
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
                          label={range.name}
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
              <TableCell sx={{ border: 'none' }}>Period:</TableCell>
              <TableCell sx={{ border: 'none' }}>
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
              <TableCell sx={{ border: 'none' }}>Active:</TableCell>
              <TableCell sx={{ border: 'none' }}>
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
              <TableCell sx={{ border: 'none' }}>Course:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Controller
                  name="courseIds"
                  control={control}
                  render={({ field }) => (
                    <FormGroup row>
                      {PROGRAMS.map((program) => (
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
              <TableCell sx={{ border: 'none' }}>Note:</TableCell>
              <TableCell sx={{ border: 'none' }}>
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
              <TableCell sx={{ border: 'none' }} colSpan={2} align="right">
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
