'use client';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Break } from '@/types/break';
import TableMenu from '@/components/partials/TableMenu';
import { deleteBreak } from '@/actions/breaks/deleteBreak';

interface BreakListTableProps {
  breaks: Break[];
}

const BreakListTable: React.FC<BreakListTableProps> = ({ breaks }) => {
  const [editBreakId, setEditBreakId] = useState<number | null>(null);
  const [startAt, setStartAt] = useState<Dayjs | null>(null);
  const [endAt, setEndAt] = useState<Dayjs | null>(null);

  const handleEditClick = (id: number) => {
    setEditBreakId(id);
  };

  const handleCancelClick = () => {
    setEditBreakId(null);
  };

  return (
    <>
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
          {breaks.map((breakItem) => {
            const isEditing = editBreakId === breakItem.id;
            return (
              <TableRow key={breakItem.id}>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ padding: 0 }}>
                      <DatePicker
                        defaultValue={dayjs(breakItem.startAt)}
                        onChange={(newDate) => setStartAt(newDate)}
                        disabled={!isEditing}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ padding: 0 }}>
                      <DatePicker
                        defaultValue={dayjs(breakItem.endAt)}
                        onChange={(newDate) => setEndAt(newDate)}
                        disabled={!isEditing}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </TableCell>
                {isEditing ? (
                  <TableCell>
                    <div className="flex justify-end gap-x-2.5">
                      <Button variant="outlined" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                      <Button variant="contained" onClick={() => handleEditClick(breakItem.id)}>
                        Save
                      </Button>
                    </div>
                  </TableCell>
                ) : (
                  <TableCell>
                    <div className="flex justify-end">
                      <TableMenu id={breakItem.id} onEdit={handleEditClick} onDelete={deleteBreak} />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default BreakListTable;
