'use client';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { courses } from '@/mock/_index';
import { PROGRAMS } from '@/constants/_index';
import CustomizedMenus from './TableMenu';
import { MenuItem } from '@mui/material';

const CourseTableList = () => {
  const [editCourseId, setEditCourseId] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState('');
  // Function to enter edit mode for a specific row
  const handleEditClick = (index: any) => {
    setEditCourseId(index);
  };

  // Function to cancel editing and exit edit mode
  const handleCancelClick = () => {
    setEditCourseId(null); // Reset the edit state to exit edit mode
  };
  const handleSelectProgram = (event) => {
    setSelectedProgram(event.target.value);
  };
  const [hours, setHours] = useState('');

  const handleHoursChange = (event) => {
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
          {courses.map((course, index) => (
            <TableRow key={index}>
              {editCourseId === index ? (
                // Edit mode
                <>
                  <TableCell>
                    <TextField defaultValue={course.name} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField
                      defaultValue={course.program.name}
                      variant="outlined"
                      size="small"
                      id="select-program"
                      onChange={handleSelectProgram}
                      select
                    >
                      {PROGRAMS.map((program) => (
                        <MenuItem key={program.id} value={program.name}>
                          {program.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      defaultValue={course.requiredHours}
                      variant="outlined"
                      size="small"
                      required
                      id="outlined-required"
                      type="number"
                      onChange={handleHoursChange}
                      inputProps={{
                        min: 0,
                        onInput: (e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value))
                            .toString()
                            .slice(0, e.target.maxLength);
                        },
                        maxLength: 4,
                      }}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={handleCancelClick} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={() => handleEditClick(index)}>
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
                    <CustomizedMenus index={index} onEdit={handleEditClick} />
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
