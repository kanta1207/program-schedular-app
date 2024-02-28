'use client';

import {
  Button,
  TextField,
  InputLabel,
  NativeSelect,
  FormControl,
  FormHelperText,
  Input,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { PROGRAMS } from '@/constants/_index';
const CreateCourse = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="justify-between">
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
        {' '}
        <Button variant="contained" onClick={() => setIsCreating(!isCreating)}>
          New course
        </Button>
      </div>

      {isCreating && (
        <div className="flex gap-4 items-end p-4 border my-4">
          <div>
            <TextField required id="outlined-required" label="Course Name" defaultValue=" " className="w-80" />
          </div>
          <div>
            <TextField id="select" label="Program *" value="Value" select className="w-40">
              {PROGRAMS.map((program) => (
                <MenuItem key={program.id} value={program.name}>
                  {program.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField required id="outlined-required" label="Required Hours" defaultValue=" " className="w-40" />
          </div>

          <div className="flex gap-x-2 justify-between">
            <Button variant={'outlined'} onClick={() => setIsCreating(!isCreating)}>
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
