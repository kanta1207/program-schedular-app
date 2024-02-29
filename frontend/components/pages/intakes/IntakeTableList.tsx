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
import { intakes } from '@/mock/_index';
import { PROGRAMS } from '@/constants/_index';
import TableMenu from '@/components/partials/TableMenu';
import { Intake } from '@/types/intake';

const IntakeTableList = () => {
  const [hours, setHours] = useState('');
  const [editCourseId, setEditCourseId] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState('');

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
  const getCohortsByPeriod = (intake: Intake, period: string) => {
    return intake.cohorts
      .filter((cohort) => cohort.periodOfDay.name === period)
      .map((cohort) => cohort.name)
      .join(', ');
  };
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Name</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Start Date</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>End Date</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Morning Cohorts</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Afternoon Cohorts</TableCell>
            <TableCell sx={{ border: '1px solid white', color: 'white' }}>Evening Cohorts</TableCell>
            <TableCell sx={{ marginLeft: 'auto' }}></TableCell> {/* Empty head for edit and delete */}
          </TableRow>
        </TableHead>
        <TableBody>
          {intakes.map((intake) => (
            <TableRow key={intake.id}>
              {editCourseId === intake.id ? (
                // Edit mode
                <>
                  <TableCell>
                    <TextField defaultValue={intake.name} variant="outlined" />
                  </TableCell>
                  <>
                    {/* //Change with datepicker */}
                    <TableCell>
                      <FormControl>
                        <InputLabel id="select-program" required>
                          start date
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
                  </>
                  <TableCell colSpan={4} sx={{ marginLeft: 'auto' }}>
                    <Button variant="outlined" onClick={() => handleCancelClick()}>
                      Cancela
                    </Button>
                    <Button variant="contained" onClick={() => handleSaveClick(intake.id)}>
                      Save
                    </Button>
                  </TableCell>
                </>
              ) : (
                // Display mode
                <>
                  <TableCell component="th" scope="row">
                    {intake.name}
                  </TableCell>
                  <TableCell>{intake.startAt.toLocaleDateString()}</TableCell>
                  <TableCell>{intake.endAt.toLocaleDateString()}</TableCell>
                  <TableCell>{getCohortsByPeriod(intake, 'Morning')}</TableCell>
                  <TableCell>{getCohortsByPeriod(intake, 'Afternoon')}</TableCell>
                  <TableCell>{getCohortsByPeriod(intake, 'Evening')}</TableCell>
                  <TableCell>
                    <TableMenu id={intake.id} onEdit={handleEditClick} onDelete={handleDeleteClick} />
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

export default IntakeTableList;
