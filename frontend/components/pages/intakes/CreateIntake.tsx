'use client';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createIntake } from '@/actions/intakes/createIntake';

const CreateIntake = () => {
  const [isCreating, setIsCreating] = useState(false);
  const handleCancelClick = () => {
    setIsCreating(false);
    reset();
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      intakeName: null,
      startAt: null as Dayjs | null,
      endAt: null as Dayjs | null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        name: data.name,
        startAt: data.startAt,
        endAt: data.endAt,
      };

      await createIntake(payload);

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
              New Intake
            </Button>
          )}
        </div>

        {isCreating && (
          <div className="flex gap-4 items-end p-4 border my-4">
            {/* Intake name */}
            console.log(data.name)
            <Controller
              control={control}
              name="intakeName"
              rules={{ required: true }}
              render={({ field }: any) => {
                return (
                  <TextField
                    label="Name"
                    id="name"
                    sx={{ width: '20rem' }}
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(name) => field.onChange(name)}
                  />
                );
              }}
            />
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
            <div className="flex items-end gap-4 ml-auto">
              <Button
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                variant={'outlined'}
                type="button"
                onClick={handleCancelClick}
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

export default CreateIntake;
