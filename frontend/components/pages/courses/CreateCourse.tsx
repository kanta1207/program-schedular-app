'use client';

import React, { useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PROGRAMS } from '@/constants/_index';
import { GetProgramsResponse } from '@/types/program';
import { createCourse } from '@/actions/courses/createCourse';
import { useRouter } from 'next/navigation';

interface CreateCourseProps {
  programs?: GetProgramsResponse[];
}

interface CourseFormValues {
  name: string;
  programId: number;
  requiredHours: string;
}

const CreateCourse: React.FC<CreateCourseProps> = ({ programs }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [hours, setHours] = useState('');
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<CourseFormValues>({
    defaultValues: {
      name: '',
      programId: 0,
      requiredHours: '',
    },
  });

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

  const onSubmit: SubmitHandler<CourseFormValues> = async (data) => {
    const payload = {
      ...data,
      requiredHours: Number(data.requiredHours),
    };

    try {
      await createCourse(payload);
      reset();
      setIsCreating(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-end p-4 border my-4">
          <div>
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field }: any) => {
                return (
                  <TextField
                    required
                    id="courseName"
                    label="Course Name"
                    placeholder="Enter course name"
                    sx={{ width: '20rem' }}
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(name) => field.onChange(name)}
                  />
                );
              }}
            />
          </div>

          <FormControl>
            <InputLabel id="select-program" required>
              Program
            </InputLabel>
            <Controller
              control={control}
              name="programId"
              rules={{ required: true }}
              render={({ field }: any) => {
                return (
                  <Select
                    labelId="select-program"
                    id="select-program"
                    name="programId"
                    value={field.value}
                    label="Program"
                    onChange={handleSelectProgram}
                    sx={{ width: '20rem' }}
                    required
                    {...field}
                  >
                    {programs?.map((program) => (
                      <MenuItem key={program.id} value={program.id}>
                        {program.name}
                      </MenuItem>
                    ))}
                  </Select>
                );
              }}
            />
          </FormControl>

          <div>
            <Controller
              control={control}
              name="requiredHours"
              rules={{
                required: true,
                pattern: { value: /^\d+$/, message: '' },
              }}
              render={({ field }: any) => {
                return (
                  <TextField
                    required
                    id="requiredHours"
                    label="Required Hours"
                    placeholder="60"
                    type="number"
                    value={field.value}
                    inputRef={field.ref}
                    sx={{ width: '20rem' }}
                    onChange={(requiredHours) => field.onChange(requiredHours)}
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
                );
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
            <Button type="submit" variant={'contained'}>
              Create
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateCourse;
