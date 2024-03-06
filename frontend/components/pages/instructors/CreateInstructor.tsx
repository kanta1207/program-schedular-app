'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';

import {
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
} from '@mui/material';
import { courses } from '@/mock/_index';
import { deleteInstructor } from '@/actions/instructors/deleteInstructor';
import { CONTRACT_TYPES, DESIRED_WORKING_HOURS, PERIOD_OF_DAYS, WEEKDAYS_RANGES } from '@/constants/_index';
import { ContractName, Instructor, PeriodOfDayName } from '@/types/_index';
import { updateInstructor } from '@/actions/instructors/updateInstructor';
import { createInstructor } from '@/actions/instructors/createInstructor';

interface CreateInstructorProps {
  pageType: 'new' | 'view';
  instructor?: Instructor;
}
const CreateInstructor: React.FC<CreateInstructorProps> = ({ pageType, instructor }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  const coursesByProgram = (programName: string) => {
    return courses
      .filter((course) => course.program.name === programName)
      .map((course) => (
        <FormControlLabel key={course.id} control={<Checkbox />} label={course.name} value={course.name} />
      ));
  };

  useEffect(() => {
    if (pageType === 'new') {
      setIsEditMode(true);
    }

    if (pageType === 'view' && !isEditMode) {
      reset({
        name: instructor?.name,
        contract: instructor?.contractType.name,
        hours: instructor?.desiredWorkingHours,
        days: instructor?.weekdaysRange.name,
        period: instructor?.periodOfDays[0].name,
        isActive: instructor?.isActive,
        courses: instructor?.courses,
        notes: instructor?.notes,
      });
    }
  }, []);

  const handleCancelButton = () => {
    const result = confirm('Do you want to cancel?');
    if (result) {
      if (pageType === 'new') {
        router.push('/instructors');
      }
      if (pageType === 'view') {
        setIsEditMode(false);
        reset({
          name: instructor?.name,
          contract: instructor?.contractType.name,
          hours: instructor?.desiredWorkingHours,
          days: instructor?.weekdaysRange.name,
          period: instructor?.periodOfDays?.map((period) => period.name) ?? [],
          isActive: instructor?.isActive,
          courses: instructor?.courses,
          notes: instructor?.notes,
        });
      }
    }
  };
  const handleDeleteButton = () => {
    alert('Do you really want to delete?');
    deleteInstructor(instructor!.id);
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: null as string | null,
      contract: '' as ContractName | null,
      hours: 10,
      days: null as string | null,
      period: [] as unknown | null,
      isActive: false,
      courses: [] as unknown | null,
      notes: null as string | null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        name: data.name,
        contractTypeId: data.contract,
        desiredWorkingHours: data.hours,
        weekdaysRangeId: data.days,
        periodOfDayId: data.period,
        isActive: data.isActive,
        coursesIds: data.courses,
        notes: data.notes,
      };

      if (pageType === 'view' && isEditMode) {
        await updateInstructor(instructor!.id, payload);
        reset({
          name: payload.name,
          contract: payload.contractTypeId,
          hours: payload.desiredWorkingHours,
          days: payload.weekdaysRangeId,
          period: payload.periodOfDayId,
          isActive: payload.isActive,
          courses: payload.coursesIds,
          notes: payload.notes,
        });
        setIsEditMode(false);
      } else if (pageType === 'new') {
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
                        disabled={isEditMode ? false : true}
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
                  name="contract"
                  control={control}
                  rules={{ required: 'Contract type is required' }}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {CONTRACT_TYPES.map((contract) => (
                        <FormControlLabel
                          key={contract.id}
                          value={contract.name}
                          control={<Radio />}
                          label={contract.name}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </TableCell>
            </TableRow>
            {/* Hours */}
            <TableRow>
              <TableCell sx={{ border: 'none' }}>Hours:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Controller
                  name="hours"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {DESIRED_WORKING_HOURS.map((hour) => (
                        <FormControlLabel key={hour} value={hour} control={<Radio />} label={`${hour}`} />
                      ))}
                    </RadioGroup>
                  )}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ border: 'none' }}>Days:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Controller
                  name="days"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {WEEKDAYS_RANGES.map((range) => (
                        <FormControlLabel key={range.id} value={range.name} control={<Radio />} label={range.name} />
                      ))}
                    </RadioGroup>
                  )}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ border: 'none' }}>Period:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Controller
                  name="period"
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
                                value={period.name}
                              />
                            }
                            label={`${period.name} (${period.time})`}
                          />
                        ))}
                      </FormGroup>
                    );
                  }}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ border: 'none' }}>Active:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Switch {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                  )}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ border: 'none' }}>Course:</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ border: 'none' }}>DMS:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <FormGroup row>{coursesByProgram('DMS')}</FormGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: 'none' }}>DMA:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <FormGroup row>{coursesByProgram('DMA')}</FormGroup>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ border: 'none' }}>Notes:</TableCell>
              <TableCell sx={{ border: 'none' }}>
                <TextField multiline rows={4} variant="outlined" sx={{ width: '20rem' }} />
              </TableCell>
            </TableRow>
            {/* Buttons */}
            <TableRow>
              <TableCell sx={{ border: 'none' }} colSpan={2} align="right">
                {isEditMode ? (
                  <>
                    <Button size="medium" variant="outlined" type="button" onClick={handleCancelButton}>
                      Cancel
                    </Button>
                    <Button size="medium" variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="medium" variant="outlined" type="button" onClick={() => setIsEditMode(true)}>
                      Edit
                    </Button>
                    <Button size="medium" variant="contained" color="error" type="button" onClick={handleDeleteButton}>
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};

export default CreateInstructor;
