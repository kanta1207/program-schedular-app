'use client';
import { submitNewCohort } from '@/actions/cohorts/formAction';
import { PERIOD_OF_DAYS } from '@/constants/period-of-days';
import { PROGRAMS } from '@/constants/program';
import { intakes } from '@/mock/intake';
import { Cohort } from '@/types/cohort';
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface CohortInfoFormProps {
  pageType: 'new' | 'edit' | 'view';
  cohort?: Cohort;
}

export const CohortInfoForm: React.FC<CohortInfoFormProps> = ({ pageType, cohort }) => {
  const [name, setName] = React.useState('');
  const [intake, setIntake] = React.useState('');
  const [program, setProgram] = React.useState('');
  const [period, setPeriod] = React.useState('');
  const [isEditMode, setIsEditMode] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (pageType === 'new') {
      setIsEditMode(true);
    }

    if (pageType === 'view' && !isEditMode) {
      setName(cohort!.name);
      setIntake(cohort!.intake.name);
      setProgram(cohort!.program.name);
      setPeriod(cohort!.periodOfDay.name);
    }
  });

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIntakeChange = (event: SelectChangeEvent) => {
    setIntake(event.target.value as string);
  };

  const handleProgramChange = (event: SelectChangeEvent) => {
    setProgram(event.target.value as string);
  };

  const handlePeriodChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string);
  };

  const handleCancelButton = () => {
    const result = confirm('Do you really want to cancel?');
    if (result) {
      if (pageType === 'new') {
        router.push('/cohorts');
      }
      if (pageType === 'view') {
        setIsEditMode(false);
        setName(cohort!.name);
        setIntake(cohort!.intake.name);
        setProgram(cohort!.program.name);
        setPeriod(cohort!.periodOfDay.name);
      }
    }
  };

  const handleDeleteButton = () => {
    alert('Do you really want to delete?');
  };

  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <form className="w-fit mb-32" action={submitNewCohort}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography sx={{ width: '5rem' }}>Name:</Typography>
          <TextField
            value={name}
            sx={{ width: '14rem' }}
            size="small"
            name="name"
            onChange={handleNameInput}
            required
            disabled={isEditMode ? false : true}
          />
        </Box>
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography sx={{ width: '5rem' }}>Intake:</Typography>
          <Select
            sx={{ width: '14rem' }}
            size="small"
            value={intake}
            name="intake"
            onChange={handleIntakeChange}
            required
            disabled={isEditMode ? false : true}
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
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography sx={{ width: '5rem' }}>Program:</Typography>
          <Select
            sx={{ width: '14rem' }}
            size="small"
            id="program-select"
            value={program}
            name="program"
            onChange={handleProgramChange}
            required
            disabled={isEditMode ? false : true}
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
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography sx={{ width: '5rem' }}>Period:</Typography>
          <Select
            sx={{ width: '14rem' }}
            size="small"
            id="program-select"
            name="period"
            value={period}
            onChange={handlePeriodChange}
            required
            disabled={isEditMode ? false : true}
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
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', width: 'fit-content', position: 'relative', left: '100%' }}>
        {isEditMode ? (
          <>
            <Button size="medium" variant="outlined" type="button" onClick={handleCancelButton}>
              Cancel
            </Button>
            <Button size="medium" variant="contained" type="submit">
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
