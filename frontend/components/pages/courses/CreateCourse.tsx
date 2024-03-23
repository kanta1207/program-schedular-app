'use client';

import { useState } from 'react';
import { Button, TextField, MenuItem, FormControl, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import { GetProgramsResponse } from '@/types/_index';
import { createCourse } from '@/actions/courses/createCourse';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TOAST } from '@/constants/_index';
import ErrorMessages from '@/components/partials/ErrorMessages';

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
  const router = useRouter();

  const handleCancelClick = () => {
    setIsCreating(false);
    reset();
  };

  const { control, handleSubmit, reset } = useForm<CourseFormValues>({
    defaultValues: {
      name: '',
      programId: 0,
      requiredHours: '',
    },
  });

  const onSubmit: SubmitHandler<CourseFormValues> = async (data) => {
    try {
      const payload = {
        ...data,
        requiredHours: Number(data.requiredHours),
      };

      await createCourse(payload);

      toast.success(TOAST.success.created);
      setIsCreating(false);
      reset();
      router.refresh();
    } catch (error: any) {
      toast.error(<ErrorMessages message={error.message} />);
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
                  onChange={(name) => field.onChange(name)}
                />
              );
            }}
          />

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

          <div className="ml-auto flex gap-4">
            <Button
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
              variant={'outlined'}
              type="button"
              onClick={handleCancelClick}
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
