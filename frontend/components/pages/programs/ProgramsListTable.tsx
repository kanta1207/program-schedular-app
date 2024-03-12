'use client';
import { deleteProgram } from '@/actions/programs/deleteProgram';
import { updateProgram } from '@/actions/programs/updateProgram';
import TableMenu from '@/components/partials/TableMenu';
import { GetProgramsResponse } from '@/types/program';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';

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

      setEditProgramId(null);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id: number) => {
    setEditProgramId(id);
  };

  const handleCancelClick = () => {
    reset();
    setEditProgramId(null);
  };

  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const thRowStyle = { bgcolor: 'primary.main', '& th': thStyle, '& th:last-child': { borderRight: 'none' } };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table>
        <TableHead>
          <TableRow sx={thRowStyle}>
            <TableCell sx={{ width: 'calc(100% * 11/12)' }}>Name</TableCell>
            {/* Empty head for edit and delete */}
            <TableCell sx={{ width: 'calc(100% * 1/12)' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {programs.map((program) => (
            <TableRow key={program.id}>
              {editProgramId === program.id ? (
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
          ))}
        </TableBody>
      </Table>
    </form>
  );
};

export default ProgramListTable;
