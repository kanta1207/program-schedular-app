'use client';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { courses } from '@/mock/_index';
import { PROGRAMS } from '@/constants/_index';
import TableMenu from '@/components/partials/TableMenu';

const CourseTableList = () => {
  const [hours, setHours] = useState('');
  const [editCourseId, setEditCourseId] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState('');

  // Function to enter edit mode for a specific row
  const handleEditClick = (id: number) => {
    setEditCourseId(id);
  };

  const handleSaveClick = (id: number) => {};

  const handleDeleteClick = (id: number) => {};

  // Function to cancel editing and exit edit mode
  const handleCancelClick = () => {
    setEditCourseId(null); // Reset the edit state to exit edit mode
  };

  const handleSelectProgram = (event: SelectChangeEvent) => {
    setSelectedProgram(event.target.value);
  };

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Check if the value is a non-negative integer number
    if (/^\d+$/.test(value) || value === '') {
      setHours(value);
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Course name</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Program</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Required hours</TableCell>
            <TableCell></TableCell> {/* Empty head for edit and delete */}
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              {editCourseId === course.id ? (
                // Edit mode
                <>
                  <TableCell>
                    <TextField defaultValue={course.name} variant="outlined" />
                  </TableCell>
                  <TableCell>
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
                        sx={{ width: '10rem' }}
                        required
                      >
                        {PROGRAMS.map((program) => (
                          <MenuItem key={program.id} value={program.name}>
                            {program.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell>
                    <TextField
                      required
                      id="requiredHours"
                      label="Required Hours"
                      placeholder="60"
                      type="number"
                      defaultValue={course.requiredHours}
                      sx={{ width: '20rem' }}
                      onChange={handleHoursChange}
                      inputProps={{
                        type: 'number',
                        min: 0,
                        max: 999,
                        maxLength: 3,
                        onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, e.target.maxLength);
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleCancelClick()} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={() => handleSaveClick(course.id)}>
                      Save
                    </Button>
                  </TableCell>
                </>
              ) : (
                // Display mode
                <>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.program.name}</TableCell>
                  <TableCell>{course.requiredHours}</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TableMenu id={course.id} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTableList;
