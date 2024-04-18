'use client';
import { deleteProgram } from '@/actions/programs/deleteProgram';
import { updateProgram } from '@/actions/programs/updateProgram';
import ErrorMessages from '@/components/partials/ErrorMessages';
import { RequiredMark } from '@/components/partials/RequiredMark';
import TableMenu from '@/components/partials/TableMenu';
import { TOAST } from '@/constants/_index';
import { usePagination } from '@/hooks/usePagination';
import { tableStyle, thRowStyle } from '@/styles/_index';
import { GetProgramsResponse } from '@/types/program';
import { TableFooter, TablePagination } from '@mui/material';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ProgramListTableProps {
  programs: GetProgramsResponse[];
}

const ProgramListTable: React.FC<ProgramListTableProps> = ({ programs }) => {
  const [editProgramId, setEditProgramId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const updatingProgram = programs.find((item) => item.id === editProgramId);

    if (updatingProgram) {
      reset({
        name: updatingProgram.name,
      });
    }
  }, [editProgramId]);

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
      if (!editProgramId) {
        throw new Error('Unexpected Error: id is not selected');
      }

      await updateProgram(editProgramId, payload);

      toast.success(TOAST.success.updated);
      setEditProgramId(null);
      router.refresh();
    } catch (error: any) {
      toast.error(<ErrorMessages message={error.message} />);
    }
  };

  const handleEditClick = (id: number) => {
    setEditProgramId(id);
  };

  const handleCancelClick = () => {
    reset();
    setEditProgramId(null);
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
    count: programs.length,
    rowsPerPage: 25,
    page: 0,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow sx={thRowStyle}>
            <TableCell sx={{ width: 'calc(100% * 10/12)' }}>
              Name
              {editProgramId && <RequiredMark />}
            </TableCell>
            {/* Empty head for edit and delete */}
            <TableCell sx={{ width: 'calc(100% * 2/12)' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? programs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : programs).map(
            (program) => (
              <TableRow key={program.id}>
                {editProgramId === program.id ? (
                  // Edit mode
                  <>
                    <TableCell sx={{ px: '0.5rem' }}>
                      <Controller
                        control={control}
                        name="name"
                        rules={{ required: true }}
                        render={({ field }: any) => {
                          return (
                            <TextField
                              id="name"
                              sx={{ width: '50%' }}
                              value={field.value}
                              onChange={(name) => field.onChange(name)}
                              required
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
                  // Display mode
                  <>
                    <TableCell>{program.name}</TableCell>
                    <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <TableMenu id={program.id} onEdit={handleEditClick} onDelete={deleteProgram} />
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
  );
};

export default ProgramListTable;
