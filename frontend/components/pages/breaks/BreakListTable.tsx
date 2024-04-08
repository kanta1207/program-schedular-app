'use client';
import { deleteBreak } from '@/actions/breaks/deleteBreak';
import { updateBreak } from '@/actions/breaks/updateBreak';
import ErrorMessages from '@/components/partials/ErrorMessages';
import TableMenu from '@/components/partials/TableMenu';
import { TOAST } from '@/constants/_index';
import { usePagination } from '@/hooks/usePagination';
import { GetBreaksResponse } from '@/types/_index';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, TableFooter, TablePagination } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface BreakListTableProps {
  breaks: GetBreaksResponse[];
}

const BreakListTable: React.FC<BreakListTableProps> = ({ breaks }) => {
  const router = useRouter();
  const [editBreakId, setEditBreakId] = useState<number | null>(null);

  // Set default value in updating break
  useEffect(() => {
    const updatingBreak = breaks.find((item) => item.id === editBreakId);

    if (updatingBreak) {
      reset({
        startAt: dayjs(updatingBreak.startAt),
        endAt: dayjs(updatingBreak.endAt),
      });
    }
  }, [editBreakId]);

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

      if (!editBreakId) {
        throw new Error('Unexpected Error: id is not selected');
      }

      await updateBreak(editBreakId, payload);

      toast.success(TOAST.success.updated);
      setEditBreakId(null);
      router.refresh();
    } catch (error: any) {
      toast.error(<ErrorMessages message={error.message} />);
    }
  };

  const handleEditClick = (id: number) => {
    setEditBreakId(id);
  };

  const handleCancelClick = () => {
    reset();
    setEditBreakId(null);
  };

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
    count: breaks.length,
    rowsPerPage: 25,
    page: 0,
  });

  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const thRowStyle = { bgcolor: 'primary.main', '& th': thStyle, '& th:last-child': { borderRight: 'none' } };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'inline-block', color: 'info.main' }}>
        <a href="https://ciccc.ca/academic-calendar/" target="_blank" className="flex items-center gap-1">
          <OpenInNewIcon fontSize="small" />
          Academic Calender
        </a>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableHead>
            <TableRow sx={thRowStyle}>
              <TableCell sx={{ width: 'calc(100% * 4.5/12)' }}>Start Date</TableCell>
              <TableCell sx={{ width: 'calc(100% * 4.5/12)' }}>End Date</TableCell>
              {/* Empty head for edit and delete */}
              <TableCell sx={{ width: 'calc(100% * 3/12)' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? breaks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : breaks).map(
              (breakItem) => (
                <TableRow key={breakItem.id}>
                  {editBreakId === breakItem.id ? (
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
                                format={'MMM DD, YYYY'}
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
                                format={'MMM DD, YYYY'}
                                onChange={(date) => field.onChange(date)}
                              />
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
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
                    <>
                      <TableCell>{dayjs(breakItem.startAt).format('MMM DD, YYYY (ddd)')}</TableCell>
                      <TableCell>{dayjs(breakItem.endAt).format('MMM DD, YYYY (ddd)')}</TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <TableMenu id={breakItem.id} onEdit={handleEditClick} onDelete={deleteBreak} />
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ),
            )}
            {emptyRows > 0 && <TableRow style={{ height: 57 * emptyRows }} />}
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

export default BreakListTable;
