'use client';

import { useState } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { PROGRAMS } from '@/constants/_index';
const CreateCourse = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [hours, setHours] = useState('');

  const handleHoursChange = (event) => {
    const value = event.target.value;
    // Check if the value is a non-negative integer number
    if (/^\d+$/.test(value) || value === '') {
      setHours(value);
    }
  };

  const handleSelectProgram = (event) => {
    setSelectedProgram(event.target.value);
  };
  return (
    <div>
      <div>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: 'Roboto',
            fontWeight: '600',
            fontSize: '34px',
            letterSpacing: '0.25px',
            color: 'primary.main',
            lineHeight: '40px',
          }}
        >
          Courses
        </Typography>
      </div>
      <div className="flex justify-end mb-4 ">
        {!isCreating && (
          <Button variant="contained" onClick={() => setIsCreating(!isCreating)}>
            New course
          </Button>
        )}
      </div>

      {isCreating && (
        <div className="flex gap-4 items-end p-4 border my-4">
          <div>
            <TextField
              required
              id="outlined-required"
              label="Course Name"
              placeholder="Enter course name"
              className="w-80"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="select-program"
              label="Program *"
              value={selectedProgram}
              onChange={handleSelectProgram}
              select
              className="w-40"
              SelectProps={{
                displayEmpty: true, // needed for placeholder
                renderValue: (selected) => {
                  if (selected === '') {
                    return <em>Choose...</em>;
                  }
                  return selected;
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {PROGRAMS.map((program) => (
                <MenuItem key={program.id} value={program.name}>
                  {program.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Required Hours"
              placeholder="60"
              type="number"
              className="w-40"
              InputLabelProps={{
                shrink: true,
              }}
              value={hours}
              onChange={handleHoursChange}
              inputProps={{
                min: 0,
                onInput: (e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, e.target.maxLength);
                },
                maxLength: 4,
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
