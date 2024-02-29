'use client';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createBreak } from '@/actions/breaks/createBreak';

const CreateBreak = () => {
  const [isCreating, setIsCreating] = useState(false);

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

      await createBreak(payload);

      reset();
      setIsCreating(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end mb-4 ">
          {!isCreating && (
            <Button variant="contained" onClick={() => setIsCreating(!isCreating)}>
              New Break
            </Button>
          )}
        </div>

        {isCreating && (
          <div className="flex gap-4 items-end p-4 border my-4">
            {/* Start Date */}
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
            {/* End Date */}
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
            {/* Table Menu */}
            <div className="flex items-end gap-4 ml-auto">
              <Button
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                variant={'outlined'}
                type="button"
                onClick={() => {
                  setIsCreating(!isCreating);
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button variant={'contained'} type="submit">
                Create
              </Button>
            </div>
          </div>
        )}
      </form>
    </LocalizationProvider>
  );
};

export default CreateBreak;
