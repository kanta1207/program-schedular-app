'use client';
import { createCohort } from '@/actions/cohorts/createCohort';
import { deleteCohort } from '@/actions/cohorts/deleteCohort';
import { updateCohort } from '@/actions/cohorts/updateCohort';
import ErrorMessages from '@/components/partials/ErrorMessages';
import { CONFIRM, PERIOD_OF_DAYS, TOAST } from '@/constants/_index';
import { GetCohortResponse, GetIntakesResponse, GetProgramsResponse } from '@/types/_index';
import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CohortInfoFormProps {
  cohort?: GetCohortResponse;
  intakes: GetIntakesResponse[];
  programs: GetProgramsResponse[];
}

export const CohortInfoForm: React.FC<CohortInfoFormProps> = ({ cohort, intakes, programs }) => {
  const [isEditable, setIsEditable] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cohort) {
      reset({
        name: cohort.name,
        intakeId: cohort.intake.id,
        periodOfDayId: cohort.periodOfDay.id,
        programId: cohort.program.id,
      });
    } else {
      setIsEditable(true);
    }
  }, []);

  const handleCancel = () => {
    if (confirm(CONFIRM.cancel)) {
      if (cohort) {
        setIsEditable(false);
        reset({
          name: cohort.name,
          intakeId: cohort.intake.id,
          periodOfDayId: cohort.periodOfDay.id,
          programId: cohort.program.id,
        });
      } else {
        router.push('/cohorts');
      }
    }
  };

  const handleDelete = async () => {
    if (confirm(CONFIRM.delete) && cohort) {
      try {
        await deleteCohort(cohort.id);
        router.push('/cohorts');
        toast.success(TOAST.success.deleted);
      } catch (error: any) {
        toast.error(<ErrorMessages message={error.message} />);
      }
    }
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      intakeId: 0,
      periodOfDayId: 1,
      programId: 0,
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

      if (cohort) {
        const { data: updatedCohort } = await updateCohort(cohort.id, payload);

        reset({
          name: updatedCohort.name,
          intakeId: updatedCohort.intake.id,
          periodOfDayId: updatedCohort.periodOfDay.id,
          programId: updatedCohort.program.id,
        });
        setIsEditable(false);
        toast.success(TOAST.success.updated);
      } else {
        const { data: newCohort } = await createCohort(payload);
        router.push(`/cohorts/${newCohort.id}`);
        toast.success(TOAST.success.created);
      }
    } catch (error: any) {
      toast.error(<ErrorMessages message={error.message} />);
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
                  required
                  value={field.value}
                  onChange={(name) => field.onChange(name)}
                  disabled={!isEditable}
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
                    value={field.value}
                    required
                    disabled={!isEditable}
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
                    value={field.value}
                    required
                    disabled={!isEditable}
                    {...field}
                  >
                    {programs.map((program) => {
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
                    value={field.value}
                    required
                    disabled={!isEditable}
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
            <Button variant="outlined" type="button" onClick={() => setIsEditable(true)}>
              Edit
            </Button>
            <Button variant="contained" color="error" type="button" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </Box>
    </form>
  );
};
