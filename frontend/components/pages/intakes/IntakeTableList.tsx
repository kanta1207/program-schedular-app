'use client';
import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SelectChangeEvent } from '@mui/material';
import { intakes } from '@/mock/_index';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableMenu from '@/components/partials/TableMenu';
import { Intake } from '@/types/intake';
import { Dayjs } from 'dayjs';

const IntakeTableList = () => {
  const [hours, setHours] = useState('');
  const [editCourseId, setEditCourseId] = useState<number | null>(null);
  const [selectedProgram, setSelectedProgram] = useState('');

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      startAt: null as Dayjs | null,
      endAt: null as Dayjs | null,
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        startAt: data.startAt,
        endAt: data.endAt,
      };
    } catch (error) {
      console.error(error);
    }
  };
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                      <TableCell>
                        <Controller
                          control={control}
                          name="startAt"
                          rules={{ required: true }}
                          render={({ field }: any) => {
                            return (
                              <DatePicker
                                label="Start Date"
                                value={field.value}
                                inputRef={field.ref}
                                onChange={(date) => field.onChange(date)}
                              />
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Controller
                          control={control}
                          name="endAt"
                          rules={{ required: true }}
                          render={({ field }: any) => {
                            return (
                              <DatePicker
                                label="End Date"
                                value={field.value}
                                inputRef={field.ref}
                                onChange={(date) => field.onChange(date)}
                              />
                            );
                          }}
                        />
                      </TableCell>
                    </>
                    <TableCell colSpan={4} sx={{ marginLeft: 'auto' }}>
                      <Button variant="outlined" onClick={() => handleCancelClick()}>
                        Cancel
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
      </form>
    </LocalizationProvider>
  );
};

export default IntakeTableList;
