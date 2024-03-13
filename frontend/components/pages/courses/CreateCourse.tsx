'use client';

import { useState } from 'react';
import { Button, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GetProgramsResponse } from '@/types/program';

interface CreateCourseProps {
  programs: GetProgramsResponse[];
}

const CreateCourse: React.FC<CreateCourseProps> = ({ programs }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [hours, setHours] = useState('');

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Check if the value is a non-negative integer number
    if (/^\d+$/.test(value) || value === '') {
      setHours(value);
    }
  };

  const handleSelectProgram = (event: SelectChangeEvent) => {
    setSelectedProgram(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-end mb-4 ">
        {!isCreating && (
          <Button variant="contained" onClick={() => setIsCreating(!isCreating)}>
            New Course
          </Button>
        )}
      </div>

      {isCreating && (
        <div className="flex gap-4 items-end p-4 border my-4">
          <div>
            <TextField
              required
              id="courseName"
              label="Course Name"
              placeholder="Enter course name"
              sx={{ width: '20rem' }}
            />
          </div>

          <FormControl>
            <InputLabel id="select-program" required>
              Program
            </InputLabel>
            <Select
              labelId="select-program"
              id="select-program"
              value={selectedProgram}
              label="Program"
              onChange={handleSelectProgram}
              sx={{ width: '20rem' }}
              required
            >
              {programs.map((program) => (
                <MenuItem key={program.id} value={program.name}>
                  {program.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div>
            <TextField
              required
              id="requiredHours"
              label="Required Hours"
              placeholder="60"
              type="number"
              value={hours}
              sx={{ width: '20rem' }}
              onChange={handleHoursChange}
              inputProps={{
                type: 'number',
                min: 0,
                max: 999,
                maxLength: 3,
                onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, e.target.maxLength);
                },
              }}
            />
          </div>
          <div className="ml-auto flex gap-4">
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

export default CreateCourse;
