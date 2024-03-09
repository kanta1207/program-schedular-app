'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
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
import { Instructor, PeriodOfDayName } from '@/types/_index';
import { updateInstructor } from '@/actions/instructors/updateInstructor';
import { createInstructor } from '@/actions/instructors/createInstructor';

interface InstructorInfoFormProps {
  instructor?: Instructor;
}
const InstructorInfoForm: React.FC<InstructorInfoFormProps> = ({ instructor }) => {
  const [isEditable, setIsEditMode] = useState(false);
  const router = useRouter();

  const coursesByProgram = () => {
    return (
      <>
        {PROGRAMS.map((program) => (
          <Box key={program.id}>
            <Typography variant="subtitle1">{program.name}</Typography>
            {courses
              .filter((course) => course.program.id === program.id)
              .map((filteredCourse) => (
                <FormControlLabel
                  key={filteredCourse.id}
                  control={<Checkbox />}
                  label={filteredCourse.name}
                  value={filteredCourse.name}
                  disabled={!isEditable}
                />
              ))}
          </Box>
        ))}
      </>
    );
  };
  useEffect(() => {
    if (instructor) {
      reset({
        name: instructor?.name,
        contractTypeId: instructor?.contractType.id,
        hours: instructor?.desiredWorkingHours,
        days: instructor?.weekdaysRange.name,
        periodOfDayId: instructor?.periodOfDays.map((period) => period.id),
        courseIds: instructor?.courses.map((course) => course.id),
        notes: instructor?.notes,
      });
    } else {
      setIsEditMode(true);
    }
  }, []);

  const handleCancelButton = () => {
    const isConfirmed = confirm('Do you want to cancel?');
    if (isConfirmed) {
      if (instructor) {
        setIsEditMode(false);
        reset({
          name: instructor?.name,
          contractTypeId: instructor?.contractType.id,
          hours: instructor?.desiredWorkingHours,
          days: instructor?.weekdaysRange.name,
          periodOfDayId: instructor?.periodOfDays?.map((period) => period.id),
          isActive: instructor?.isActive,
          courseIds: instructor?.courses.map((course) => course.id),
          notes: instructor?.notes,
        });
      } else {
        router.push('/instructors');
      }
    }
  };

  const handleDeleteButton = async () => {
    const isConfirmed = confirm('Do you want to delete?');
    if (isConfirmed && instructor) {
      await deleteInstructor(instructor.id);
      router.push('/instructors');
    }
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: null as string | null,
      contractTypeId: 0,
      hours: 10,
      days: null as string | null,
      periodOfDayId: [] as unknown | null,
      isActive: false,
      courseIds: [] as unknown | null,
      notes: null as string | null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        name: data.name,
        contractTypeId: data.contractTypeId,
        desiredWorkingHours: data.hours,
        weekdaysRangeId: data.days,
        periodOfDayId: data.period,
        isActive: data.isActive,
        courseIds: data.courses,
        notes: data.notes,
      };

      if (instructor) {
        const updatedInstructor = await updateInstructor(instructor.id, payload);
        console.log('updated cohort:', updatedInstructor);
        // TODO: reset form by updatedInstructor
        reset({
          // name: updatedInstructor.name,
          // contractTypeId: updatedInstructor.contractTypeId,
          // hours: updatedInstructor.desiredWorkingHours,
          // days: updatedInstructor.weekdaysRangeId,
          // periodOfDayId: updatedInstructor.periodOfDayId,
          // isActive: updatedInstructor.isActive,
          // courseIds: updatedInstructor.courseIds,
          // notes: updatedInstructor.notes,
        });
        setIsEditMode(false);
      } else {
        const newInstructor = await createInstructor(payload);
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
            {/* Hours */}
            <TableRow>
              <TableCell sx={{ border: 'none' }}>Desired Hours:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Controller
                  name="hours"
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
            {/* Days */}
            <TableRow>
              <TableCell sx={{ border: 'none' }}>Days:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Controller
                  name="days"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {WEEKDAYS_RANGES.map((range) => (
                        <FormControlLabel
                          key={range.id}
                          value={range.name}
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
                  name="periodOfDayId"
                  control={control}
                  render={({ field }) => {
                    const selectedPeriods = (field.value as PeriodOfDayName[]) || [];
                    return (
                      <FormGroup row>
                        {PERIOD_OF_DAYS.map((period) => (
                          <FormControlLabel
                            key={period.id}
                            control={
                              <Checkbox
                                checked={selectedPeriods.includes(period.name)}
                                onChange={(e) => {
                                  const updatedPeriods = e.target.checked
                                    ? [...selectedPeriods, period.name]
                                    : selectedPeriods.filter((selectedPeriod) => selectedPeriod !== period.name);

                                  field.onChange(updatedPeriods);
                                }}
                                value={period.id}
                              />
                            }
                            label={`${period.name} (${period.time})`}
                            disabled={!isEditable}
                          />
                        ))}
                      </FormGroup>
                    );
                  }}
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
                <FormGroup row>{coursesByProgram()}</FormGroup>
              </TableCell>
            </TableRow>
            {/* Notes */}
            <TableRow>
              <TableCell sx={{ border: 'none' }}>Notes:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Controller
                  control={control}
                  name="notes"
                  render={({ field }) => (
                    <TextField {...field} rows={4} variant="outlined" sx={{ width: '20rem' }} disabled={!isEditable} />
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
                      <Button variant="outlined" type="button" onClick={handleCancelButton}>
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
                      <Button variant="contained" color="error" type="button" onClick={handleDeleteButton}>
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
