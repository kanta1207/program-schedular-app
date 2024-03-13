'use client';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableMenu from '@/components/partials/TableMenu';
import { deleteBreak } from '@/actions/breaks/deleteBreak';
import { updateBreak } from '@/actions/breaks/updateBreak';
import { GetBreaksResponse } from '@/types/_index';

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

      setEditBreakId(null);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id: number) => {
    setEditBreakId(id);
  };

  const handleCancelClick = () => {
    reset();
    setEditBreakId(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ border: '1px solid white', color: 'white', width: '30rem' }}>Start Date</TableCell>
              <TableCell sx={{ border: '1px solid white', color: 'white', width: '30rem' }}>End Date</TableCell>
              {/* Empty head for edit and delete */}
              <TableCell sx={{ border: '1px solid white', color: 'white', width: '20rem' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {breaks.map((breakItem) => (
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
                    <TableCell>{dayjs(breakItem.startAt).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>{dayjs(breakItem.endAt).format('YYYY-MM-DD')}</TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <TableMenu id={breakItem.id} onEdit={handleEditClick} onDelete={deleteBreak} />
                      </div>
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

export default BreakListTable;
