'use client';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateBreak = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [startAt, setStartAt] = useState<Dayjs | null>(null);
  const [endAt, setEndAt] = useState<Dayjs | null>(null);

  return (
    <div>
      <div className="flex justify-end mb-4 ">
        {!isCreating && (
          <Button variant="contained" onClick={() => setIsCreating(!isCreating)}>
            New Break
          </Button>
        )}
      </div>

      {isCreating && (
        <div className="flex gap-4 items-end p-4 border my-4">
          {/* Start Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Start Date" value={startAt} onChange={(newDate) => setStartAt(newDate)} />
            </DemoContainer>
          </LocalizationProvider>
          {/* End Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="End Date" value={endAt} onChange={(newDate) => setEndAt(newDate)} />
            </DemoContainer>
          </LocalizationProvider>
          {/* Table Menu */}
          <div className="flex items-end gap-4 ml-auto">
            <Button
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
              variant={'outlined'}
              onClick={() => setIsCreating(!isCreating)}
            >
              Cancel
            </Button>
            <Button variant={'contained'}>Create</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBreak;
