'use client';
import { submitNewCohort } from '@/actions/cohorts/formAction';
import { PERIOD_OF_DAYS } from '@/constants/period-of-days';
import { PROGRAMS } from '@/constants/program';
import { intakes } from '@/mock/intake';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import React from 'react';

const page = () => {
  const [intake, setIntake] = React.useState('');
  const [program, setProgram] = React.useState('');
  const [period, setPeriod] = React.useState('');
  const router = useRouter();

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
      router.push('/cohorts');
    }
  };

  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
        <Typography variant="h4">New Cohort</Typography>
      </Box>
      <form className="w-fit" action={submitNewCohort}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '5rem' }}>Name:</Typography>
            <TextField sx={{ width: '12rem' }} size="small" name="name" required />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '5rem' }}>Intake:</Typography>
            <Select
              sx={{ width: '12rem' }}
              size="small"
              value={intake}
              name="intake"
              onChange={handleIntakeChange}
              required
            >
              {intakes.map((intake) => {
                return (
                  <MenuItem key={intake.id} value={intake.name}>
                    {intake.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '5rem' }}>Program:</Typography>
            <Select
              sx={{ width: '12rem' }}
              size="small"
              id="program-select"
              value={program}
              name="program"
              onChange={handleProgramChange}
              required
            >
              {PROGRAMS.map((program) => {
                return (
                  <MenuItem key={program.id} value={program.name}>
                    {program.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ width: '5rem' }}>Period:</Typography>
            <Select
              sx={{ width: '12rem' }}
              size="small"
              id="program-select"
              name="period"
              value={period}
              onChange={handlePeriodChange}
              required
            >
              {PERIOD_OF_DAYS.map((period) => {
                return (
                  <MenuItem key={period.id} value={period.name}>
                    {period.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', width: 'fit-content', position: 'relative', left: '100%' }}>
          <Button size="medium" variant="outlined" type="button" onClick={handleCancelButton}>
            Cancel
          </Button>
          <Button size="medium" variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default page;
