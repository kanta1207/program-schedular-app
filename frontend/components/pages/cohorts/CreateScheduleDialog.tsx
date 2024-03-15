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
import dayjs from 'dayjs';
import { useState } from 'react';

export interface CreateScheduleDialogProps {
  dialogOpen: boolean;
  onClose: (value: string, cohort?: GetCohortResponse) => void;
  cohorts: GetCohortResponse[];
}

export const CreateScheduleDialog: React.FC<CreateScheduleDialogProps> = ({ onClose, dialogOpen: open, cohorts }) => {
  const [selectedCreateType, setSelectedCreateType] = useState('copy');
  const [selectedCohortIds, setSelectedCohortIds] = useState<string[]>([]);
  const [selectedCohort, setSelectedCohort] = useState<GetCohortResponse>();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCreateType((event.target as HTMLInputElement).value);
  };

  const handleCancel = () => {
    onClose('');
  };

  const handleContinue = () => {
    if (selectedCreateType === 'new') {
      onClose(selectedCreateType);
    } else if (selectedCreateType === 'copy' && selectedCohort) {
      onClose(selectedCreateType, selectedCohort);
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
    <Dialog onClose={handleCancel} open={open} maxWidth={'lg'}>
      <Box sx={{ padding: '1rem' }}>
        <DialogTitle>Create/Reset Schedule</DialogTitle>
        <Box sx={{ pt: 0, display: 'flex', flexDirection: 'column', gap: '1rem', mb: '1rem' }}>
          <Box sx={{ paddingInline: '1.5rem' }}>
            <RadioGroup value={selectedCreateType} onChange={handleRadioChange}>
              <FormControlLabel value="new" control={<Radio />} label="Create new schedule" />
              <FormControlLabel value="copy" control={<Radio />} label="Copy from other cohort" />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              // display: selectedCreateType === 'create' ? 'none' : 'flex',
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              borderWidth: '3px',
              borderStyle: 'solid',
              borderColor: 'primary.main',
              borderRadius: '0.25rem',
              transform: selectedCreateType === 'new' ? 'scale(0)' : 'scale(1)',
              transition: '0.25s',
              transformOrigin: 'top left',
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
              <InputLabel shrink htmlFor="select-multiple-native">
                Cohorts
              </InputLabel>
              <Select<string[]>
                multiple
                native
                disabled={selectedCreateType === 'copy' ? false : true}
                style={{ height: '100%' }}
                value={selectedCohortIds}
                // @ts-ignore Typings are not considering `native`
                onChange={handleChangeMultiple}
                label="Native"
                inputProps={{
                  id: 'select-multiple-native',
                  style: { height: '88%' },
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
                width: '600px',
                height: '320px',
                padding: '1em',
                borderRadius: '0.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              {selectedCreateType === 'copy' && selectedCohort && selectedCohort.classes.length > 0 ? (
                selectedCohort.classes.map((item) => {
                  return (
                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
                      <Typography sx={{ width: '25%' }}>{dayjs(item.startAt).format('YYYY-MM-DD (ddd)')}</Typography>
                      <Typography sx={{ width: '25%' }}>{dayjs(item.endAt).format('YYYY-MM-DD (ddd)')}</Typography>
                      <Typography sx={{ width: '35%' }}>{item.course.name}</Typography>
                      <DaysOfTheWeekChip daysOfTheWeek={item.weekdaysRange} />
                    </Box>
                  );
                })
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  {selectedCohort ? (
                    <Typography>No schedule found</Typography>
                  ) : (
                    <Typography>Select cohort from the list</Typography>
                  )}
                </Box>
              )}
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
