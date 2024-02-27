'use client';
import { useState } from 'react';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { courses } from '@/mock/_index';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { ThemeProvider } from '@mui/system';
import theme from '../../theme';
const CourseList = () => {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className="w-full p-20">
      <div className="flex justify-end">
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
            <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel>
            <NativeSelect id="demo-customized-select-native">
              <option value={'DMS'}>DMS</option>
              <option value={'DMA'}>DMA</option>
            </NativeSelect>
          </div>
          <div>
            <h2></h2>
            <TextField required id="outlined-required" label="Required Hours" defaultValue=" " className="w-80" />
          </div>

          <div className="flex gap-x-2">
            <Button color="error" variant={'outlined'} onClick={() => setIsCreating(!isCreating)}>
              Cancel
            </Button>
            <Button variant={'contained'}>Create</Button>
          </div>
        </div>
      )}
      <ThemeProvider theme={theme}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: 'info.main' }}>Course name</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Required hours</TableCell>
              {/* empty head for edit and delete */}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, i) => (
              <TableRow key={i}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.program.name}</TableCell>
                <TableCell>{course.requiredHours}</TableCell>
                <TableCell className="flex gap-4">
                  <Button variant={'outlined'}>Edit</Button>
                  <Button variant={'contained'} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ThemeProvider>
    </div>
  );
};

export default CourseList;
