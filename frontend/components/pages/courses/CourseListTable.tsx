'use client';
import TableMenu from '@/components/partials/TableMenu';
import { GetProgramsResponse } from '@/types/program';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

interface CourseListTableProps {
  programs: GetProgramsResponse[];
}

const CourseListTable: React.FC<CourseListTableProps> = ({ programs }) => {
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
            <TableCell sx={{ border: '1px solid white', color: 'white', width: '20rem' }}>Course name</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white', width: '20rem' }}>Program</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white', width: '20rem' }}>Required hours</TableCell>
            {/* Empty head for edit and delete */}
            <TableCell sx={{ border: '1px solid white', color: 'white', width: '20rem' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              {editCourseId === course.id ? (
                // Edit mode
                <>
                  <TableCell>
                    <TextField defaultValue={course.name} variant="outlined" sx={{ width: '100%' }} />
                  </TableCell>
                  <TableCell>
                    <Select
                      labelId="select-program"
                      id="select-program"
                      defaultValue={course.program.name}
                      onChange={handleSelectProgram}
                      sx={{ width: '100%' }}
                      required
                    >
                      {programs.map((program) => (
                        <MenuItem key={program.id} value={program.name}>
                          {program.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell>
                    <TextField
                      required
                      id="requiredHours"
                      placeholder="60"
                      type="number"
                      defaultValue={course.requiredHours}
                      sx={{ width: '100%' }}
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
                    <div className="flex justify-end gap-x-2.5">
                      <Button variant="outlined" onClick={() => handleCancelClick()}>
                        Cancel
                      </Button>
                      <Button variant="contained" onClick={() => handleSaveClick(course.id)}>
                        Save
                      </Button>
                    </div>
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

export default CourseListTable;
