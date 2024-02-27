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
        {/* // I used mb here */}
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
            <InputLabel id="program-label" className="w-40">
              Program
            </InputLabel>
            <Select labelId="program-label" id="program-select" value=" " label="Program" required className="w-40">
              <MenuItem value="DMS">DMS</MenuItem>
              <MenuItem value="DMA">DMA</MenuItem>
            </Select>
          </div>
          <div>
            <TextField required id="outlined-required" label="Required Hours" defaultValue=" " className="w-40" />
          </div>

          <div className="flex gap-x-2">
            <Button color="error" variant={'outlined'} onClick={() => setIsCreating(!isCreating)}>
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
