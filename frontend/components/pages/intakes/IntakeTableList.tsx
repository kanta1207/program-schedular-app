'use client';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableMenu from '@/components/partials/TableMenu';
import { Intake, PeriodOfDayName } from '@/types/_index';

import { updateIntake } from '@/actions/intakes/updateIntakes';

interface IntakeTableListProps {
  intakes: Intake[];
}

const IntakeTableList: React.FC<IntakeTableListProps> = ({ intakes }) => {
  const [editIntakeId, setEditIntakeId] = useState<number | null>(null);

  useEffect(() => {
    const updatingIntake = intakes.find((item) => item.id === editIntakeId);

    if (updatingIntake) {
      reset({
        name: updatingIntake.name,
        startAt: dayjs(updatingIntake.startAt),
        endAt: dayjs(updatingIntake.endAt),
      });
    }
  }, [editIntakeId]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: null as string | null,
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
      if (!editIntakeId) {
        throw new Error('Unexpected Error: id is not selected');
      }

      await updateIntake(editIntakeId, payload);

      reset();
      setEditIntakeId(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = (id: number) => {
    setEditIntakeId(id);
  };

  const handleSaveClick = (id: number) => {};

  const handleDeleteClick = (id: number) => {};

  const handleCancelClick = () => {
    reset();
    setEditIntakeId(null);
  };

  const getCohortsByPeriod = (intake: Intake, period: PeriodOfDayName) => {
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
              <TableCell sx={{ marginLeft: 'auto', border: '1px solid white', color: 'white' }}></TableCell>
              {/* Empty head for edit and delete */}
            </TableRow>
          </TableHead>
          <TableBody>
            {intakes?.map((intake) => (
              <TableRow key={intake.id}>
                {editIntakeId === intake.id ? (
                  // Edit mode
                  <>
                    <TableCell>
                      <Controller
                        control={control}
                        name="name"
                        rules={{ required: true }}
                        render={({ field }: any) => {
                          return <TextField defaultValue={intake.name} variant="outlined" />;
                        }}
                      />
                    </TableCell>
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
                    <TableCell colSpan={4} sx={{ marginLeft: 'auto' }}>
                      <div className="flex justify-end gap-x-2.5">
                        <Button variant="outlined" type="button" onClick={handleCancelClick}>
                          Cancel
                        </Button>
                        <Button variant="contained" type="submit" onClick={() => handleSaveClick(intake.id)}>
                          Save
                        </Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  // Display mode
                  <>
                    <TableCell component="th" scope="row">
                      {intake.name}
                    </TableCell>
                    <TableCell>{dayjs(intake.startAt).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>{dayjs(intake.endAt).format('YYYY-MM-DD')}</TableCell>
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
