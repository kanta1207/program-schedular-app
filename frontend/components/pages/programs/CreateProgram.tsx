'use client';
import { createProgram } from '@/actions/programs/createProgram';
import { TOAST } from '@/constants/_index';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateProgram = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCancelClick = () => {
    setIsCreating(false);
    reset();
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const payload = {
        name: data.name,
      };

      await createProgram(payload);

      toast.success(TOAST.success.created);
      setIsCreating(false);
      reset();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end mb-4">
        {!isCreating && (
          <Button variant="contained" onClick={() => setIsCreating(!isCreating)}>
            New Program
          </Button>
        )}
      </div>

      {isCreating && (
        <div className="flex gap-4 items-end p-4 border my-4">
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
  );
};

export default CreateProgram;
