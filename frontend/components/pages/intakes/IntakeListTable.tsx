'use client';
import { deleteIntake } from '@/actions/intakes/deleteIntake';
import { updateIntake } from '@/actions/intakes/updateIntakes';
import TableMenu from '@/components/partials/TableMenu';
import { TOAST } from '@/constants/_index';
import { usePagination } from '@/hooks/usePagination';
import { GetIntakesResponse } from '@/types/_index';
import { TableFooter, TablePagination } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IntakeListTableProps {
  intakes: GetIntakesResponse[];
}

const IntakeListTable: React.FC<IntakeListTableProps> = ({ intakes }) => {
  const [editIntakeId, setEditIntakeId] = useState<number | null>(null);
  const router = useRouter();

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

      toast.success(TOAST.success.updated);
      setEditIntakeId(null);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleEditClick = (id: number) => {
    setEditIntakeId(id);
  };

  const handleCancelClick = () => {
    reset();
    setEditIntakeId(null);
  };

  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const thRowStyle = { bgcolor: 'primary.main', '& th': thStyle, '& th:last-child': { borderRight: 'none' } };

  const {
    rowsPerPageOptions,
    count,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    ActionsComponent,
    emptyRows,
  } = usePagination({
    count: intakes.length,
    rowsPerPage: 25,
    page: 0,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={thRowStyle}>
              <TableCell sx={{ width: 'calc(100% * 2.5/12)' }}>Name</TableCell>
              <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Start Date</TableCell>
              <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>End Date</TableCell>
              <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Morning Cohorts</TableCell>
              <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Afternoon Cohorts</TableCell>
              <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Evening Cohorts</TableCell>
              <TableCell sx={{ width: 'calc(100% * 0.5/12)' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? intakes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : intakes).map(
              (intake) => (
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
                            return (
                              <TextField
                                label="Name"
                                id="name"
                                sx={{ width: '100%' }}
                                value={field.value}
                                onChange={(name) => field.onChange(name)}
                              />
                            );
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
                          <Button variant="contained" type="submit">
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
                      {intake.periodOfDays.map((period) => (
                        <TableCell key={period.id}>{period.cohorts.map((cohort) => cohort.name).join(', ')}</TableCell>
                      ))}
                      <TableCell>
                        <TableMenu id={intake.id} onEdit={handleEditClick} onDelete={deleteIntake} />
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ),
            )}
            {emptyRows > 0 && <TableRow style={{ height: 73 * emptyRows }} />}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={ActionsComponent}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </form>
    </LocalizationProvider>
  );
};

export default IntakeListTable;
