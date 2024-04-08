'use client';

import { DaysOfTheWeekChip } from '@/components/partials/DaysOfTheWeekChip';
import { GetCohortsResponse } from '@/types/_index';
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
import { CreateType } from './CohortSchedule';

export interface CreateScheduleDialogProps {
  dialogOpen: boolean;
  onClose: (value?: string, cohort?: GetCohortsResponse) => void;
  cohorts: GetCohortsResponse[];
}

export const CreateScheduleDialog: React.FC<CreateScheduleDialogProps> = ({ onClose, dialogOpen: open, cohorts }) => {
  const [selectedCreateType, setSelectedCreateType] = useState<CreateType>('copy');
  const [selectedCohortIds, setSelectedCohortIds] = useState<string[]>([]);
  const [selectedCohort, setSelectedCohort] = useState<GetCohortsResponse>();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCreateType(event.target.value as CreateType);
  };

  const handleCancel = () => {
    onClose();
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

  // Code below is from MUI https://mui.com/material-ui/react-select/
  // Since it's a multiple select box, selected options need to be handled.
  // Continue button will be disabled when user selects more than 1 cohort (handled in button component)
  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedCohortIds(value);

    // no matter how many cohorts are selected, the first one will be set in selectCohort state.
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
                disabled={selectedCreateType === 'new'}
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
                bgcolor: 'grey.100',
                width: '600px',
                height: '320px',
                padding: '1em',
                borderRadius: '0.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              {selectedCohort ? (
                <>
                  {selectedCohort.classes.length > 0 ? (
                    <>
                      {selectedCohort.classes.map((item) => (
                        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
                          <Typography sx={{ width: '25%' }}>
                            {dayjs(item.startAt).format('MMM DD, YYYY (ddd)')}
                          </Typography>
                          <Typography sx={{ width: '25%' }}>
                            {dayjs(item.endAt).format('MMM DD, YYYY (ddd)')}
                          </Typography>
                          <Typography sx={{ width: '35%' }}>{item.course.name}</Typography>
                          <DaysOfTheWeekChip daysOfTheWeek={item.weekdaysRange} />
                        </Box>
                      ))}
                    </>
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Typography>No schedule found</Typography>
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Typography>Select cohort from the list</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          {/* Continue button will be disabled if selected more than 1 cohort */}
          <Button disabled={selectedCohortIds.length > 1} variant="contained" onClick={handleContinue}>
            Continue
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
