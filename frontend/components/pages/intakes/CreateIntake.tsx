'use client';
import { createIntake } from '@/actions/intakes/createIntake';
import ErrorMessages from '@/components/partials/ErrorMessages';
import { TOAST } from '@/constants/_index';
import { datePickerFormat } from '@/styles/_index';
import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateIntake = () => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCancelClick = () => {
    setIsCreating(false);
    reset();
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '' as string,
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

      toast.success(TOAST.success.updated);
      setIsCreating(false);
      reset();
      router.refresh();
    } catch (error: any) {
      toast.error(<ErrorMessages message={error.message} />);
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
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field }: any) => {
                return (
                  <TextField
                    label="Name"
                    id="name"
                    sx={{ width: '20rem' }}
                    value={field.value}
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
                    format={datePickerFormat}
                    localeText={{
                      fieldMonthPlaceholder: () => 'MMM',
                    }}
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
                    format={datePickerFormat}
                    localeText={{
                      fieldMonthPlaceholder: () => 'MMM',
                    }}
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
