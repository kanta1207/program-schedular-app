'use client';
import { createCohort } from '@/actions/cohorts/createCohort';
import { deleteCohort } from '@/actions/cohorts/deleteCohort';
import { updateCohort } from '@/actions/cohorts/updateCohort';
import { PERIOD_OF_DAYS, PROGRAMS } from '@/constants/_index';
import { intakes } from '@/mock/_index';
import { Cohort } from '@/types/_index';
import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface CohortInfoFormProps {
  cohort?: Cohort;
}

export const CohortInfoForm: React.FC<CohortInfoFormProps> = ({ cohort }) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!cohort) {
      setIsEditMode(true);
    }

    if (cohort && !isEditMode) {
      reset({
        name: cohort!.name,
        intakeId: cohort!.intake.id,
        periodOfDayId: cohort!.periodOfDay.id,
        programId: cohort!.program.id,
      });
    }
  }, []);

  const handleCancelButton = () => {
    const isConfirmed = confirm('Do you really want to cancel?');
    if (isConfirmed) {
      if (!cohort) {
        router.push('/cohorts');
      }
      if (cohort) {
        setIsEditMode(false);
        reset({
          name: cohort!.name,
          intakeId: cohort!.intake.id,
          periodOfDayId: cohort!.periodOfDay.id,
          programId: cohort!.program.id,
        });
      }
    }
  };

  const handleDeleteButton = async () => {
    const isConfirmed = confirm('Do you really want to delete?');
    if (isConfirmed) {
      await deleteCohort(cohort!.id);
      router.push('/cohorts');
    }
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '' as string | null,
      intakeId: '' as number | string,
      periodOfDayId: '' as number | string,
      programId: '' as number | string,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        name: data.name,
        intakeId: data.intakeId,
        periodOfDayId: data.periodOfDayId,
        programId: data.programId,
      };

      if (cohort && isEditMode) {
        const updatedCohort = await updateCohort(cohort!.id, payload);
        console.log('updated cohort:', updatedCohort);

        reset({
          name: payload.name,
          intakeId: payload.intakeId,
          periodOfDayId: payload.periodOfDayId,
          programId: payload.programId,
        });
        setIsEditMode(false);
      } else if (!cohort) {
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
    <form className="w-fit mb-32">
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
            name="intakeId"
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
                        <MenuItem key={intake.id} value={intake.id}>
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
            name="programId"
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
                        <MenuItem key={program.id} value={program.id}>
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
            name="periodOfDayId"
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
                        <MenuItem key={period.id} value={period.id}>
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
