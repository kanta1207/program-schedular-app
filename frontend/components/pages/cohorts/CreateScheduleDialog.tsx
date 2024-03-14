'use client';

import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { GetCohortResponse } from '@/types/cohort';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export interface CreateScheduleDialogProps {
  open: boolean;
  onClose: (value: string, cohort?: GetCohortResponse) => void;
  cohorts: GetCohortResponse[];
}

export const CreateScheduleDialog: React.FC<CreateScheduleDialogProps> = ({ onClose, open, cohorts }) => {
  const [selectedCreateType, setSelectedCreateType] = useState('');
  const [selectedCohortIds, setSelectedCohortIds] = useState<string[]>([]);
  const [selectedCohort, setSelectedCohort] = useState<GetCohortResponse>();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCreateType((event.target as HTMLInputElement).value);
  };

  const handleCancel = () => {
    onClose('');
  };

  const handleContinue = () => {
    if (selectedCreateType === 'create') {
      const isConfirmed = confirm('Create new schedule?');
      if (isConfirmed) {
        onClose(selectedCreateType);
      }
    } else if (selectedCreateType === 'copy' && selectedCohort) {
      const isConfirmed = confirm(`Copy schedule from ${selectedCohort.name}?`);
      if (isConfirmed) {
        onClose(selectedCreateType, selectedCohort);
      }
    } else if (selectedCreateType === 'copy' && !selectedCohort) {
      alert('Select one schedule to copy from');
    }
  };

  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedCohortIds(value);

    const selectedCohort = cohorts.find((cohort) => cohort.id === parseInt(value[0]));
    if (selectedCohort) {
      setSelectedCohort(selectedCohort);
    }
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <Box sx={{ padding: '1rem' }}>
        <DialogTitle>Schedule is empty</DialogTitle>
        <Box sx={{ pt: 0, display: 'flex', flexDirection: 'column', gap: '1rem', mb: '1rem' }}>
          <Box sx={{ paddingInline: '1.5rem' }}>
            <RadioGroup value={selectedCreateType} onChange={handleRadioChange}>
              <FormControlLabel value="create" control={<Radio />} label="Create new schedule" />
              <FormControlLabel value="copy" control={<Radio />} label="Copy from existing schedule" />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              flexDirection: 'column',
              gap: '1rem',
              borderWidth: '3px',
              borderStyle: 'solid',
              borderColor: 'primary.main',
              borderRadius: '0.25rem',
            }}
          >
            <Box sx={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
              <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                <InputLabel shrink htmlFor="select-multiple-native">
                  Cohorts
                </InputLabel>
                <Select<string[]>
                  multiple
                  native
                  disabled={selectedCreateType === 'copy' ? false : true}
                  // style={{ height: '250px' }}
                  value={selectedCohortIds}
                  // @ts-ignore Typings are not considering `native`
                  onChange={handleChangeMultiple}
                  label="Native"
                  inputProps={{
                    id: 'select-multiple-native',
                  }}
                >
                  {cohorts.map((cohort) => (
                    <option key={cohort.id} value={cohort.id}>
                      {cohort.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  bgcolor: 'rgba(217,217,217,0.2)',
                  width: '400px',
                  height: '300px',
                  padding: '1em',
                  borderRadius: '0.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                {selectedCohort &&
                  selectedCohort.classes.map((item) => {
                    return (
                      <Box key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ width: '70%' }}>{item.course.name}</Typography>
                        <DaysOfTheWeekChip daysOfTheWeek={item.weekdaysRange} />
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={selectedCohortIds.length > 1 ? true : false} variant="contained" onClick={handleContinue}>
            Continue
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
