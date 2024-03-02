'use client';
import { createCohort } from '@/actions/cohorts/createCohort';
import { deleteCohort } from '@/actions/cohorts/deleteCohort';
import { submitNewCohort } from '@/actions/cohorts/formAction';
import { updateCohort } from '@/actions/cohorts/updateCohort';
import { PERIOD_OF_DAYS } from '@/constants/period-of-days';
import { PROGRAMS } from '@/constants/program';
import { intakes } from '@/mock/intake';
import { Cohort } from '@/types/cohort';
import { PeriodOfDayName } from '@/types/master';
import { ProgramName } from '@/types/program';
import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface CohortInfoFormProps {
  pageType: 'new' | 'view';
  cohort?: Cohort;
}

export const CohortInfoForm: React.FC<CohortInfoFormProps> = ({ pageType, cohort }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (pageType === 'new') {
      setIsEditMode(true);
    }

    if (pageType === 'view' && !isEditMode) {
      reset({
        name: cohort!.name,
        intake: cohort!.intake.name,
        program: cohort!.program.name,
        period: cohort!.periodOfDay.name,
      });
    }
  }, []);

  const handleCancelButton = () => {
    const result = confirm('Do you really want to cancel?');
    if (result) {
      if (pageType === 'new') {
        router.push('/cohorts');
      }
      if (pageType === 'view') {
        setIsEditMode(false);
        reset({
          name: cohort!.name,
          intake: cohort!.intake.name,
          program: cohort!.program.name,
          period: cohort!.periodOfDay.name,
        });
      }
    }
  };

  const handleDeleteButton = () => {
    alert('Do you really want to delete?');
    deleteCohort(cohort!.id);
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: null as string | null,
      intake: '' as string | null,
      program: '' as ProgramName | null,
      period: '' as PeriodOfDayName | null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        name: data.name,
        intakeName: data.intake,
        programName: data.program,
        periodName: data.period,
      };

      if (pageType === 'view' && isEditMode) {
        await updateCohort(cohort!.id, payload);
        reset({
          name: payload.name,
          intake: payload.intakeName,
          program: payload.programName,
          period: payload.periodName,
        });
        setIsEditMode(false);
      } else if (pageType === 'new') {
        const newCohort = await createCohort(payload);

        // [future] redirect to cohorts/:id when new cohort is saved
        // const newCohortId = newCohort.id;
        // router.push(`/cohorts/${newCohortId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="w-fit mb-32" action={submitNewCohort}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography sx={{ width: '5rem' }}>Name:</Typography>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field }: any) => {
              return (
                <TextField
                  sx={{ width: '14rem' }}
                  size="small"
                  value={field.value ?? ''}
                  inputRef={field.ref}
                  onChange={(name) => field.onChange(name)}
                  disabled={isEditMode ? false : true}
                />
              );
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography sx={{ width: '5rem' }}>Intake:</Typography>
          <Controller
            control={control}
            name="intake"
            rules={{ required: true }}
            render={({ field }: any) => {
              return (
                <FormControl>
                  <Select
                    sx={{ width: '14rem' }}
                    size="small"
                    value={field.value ?? ''}
                    required
                    disabled={isEditMode ? false : true}
                    {...field}
                  >
                    {intakes.map((intake) => {
                      return (
                        <MenuItem key={intake.id} value={intake.name}>
                          {intake.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography sx={{ width: '5rem' }}>Program:</Typography>
          <Controller
            control={control}
            name="program"
            rules={{ required: true }}
            render={({ field }: any) => {
              return (
                <FormControl>
                  <Select
                    sx={{ width: '14rem' }}
                    size="small"
                    value={field.value ?? ''}
                    required
                    disabled={isEditMode ? false : true}
                    {...field}
                  >
                    {PROGRAMS.map((program) => {
                      return (
                        <MenuItem key={program.id} value={program.name}>
                          {program.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography sx={{ width: '5rem' }}>Period:</Typography>
          <Controller
            control={control}
            name="period"
            rules={{ required: true }}
            render={({ field }: any) => {
              return (
                <FormControl>
                  <Select
                    sx={{ width: '14rem' }}
                    size="small"
                    value={field.value ?? ''}
                    required
                    disabled={isEditMode ? false : true}
                    {...field}
                  >
                    {PERIOD_OF_DAYS.map((period) => {
                      return (
                        <MenuItem key={period.id} value={period.name}>
                          {period.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', width: 'fit-content', position: 'relative', left: '100%' }}>
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
      </Box>
    </form>
  );
};
