import { GetInstructorsResponse } from '@/types/_index';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { InstructorListTableRow } from './InstructorListTableRow';

interface InstructorListTableProps {
  instructors: GetInstructorsResponse[];
}

export const InstructorListTable: React.FC<InstructorListTableProps> = ({ instructors }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ bgcolor: 'primary.main' }}>
          <TableCell sx={thStyle}>Name</TableCell>
          <TableCell sx={thStyle}>Contract</TableCell>
          <TableCell sx={thStyle}>Desired Hours</TableCell>
          <TableCell sx={thStyle}>Period</TableCell>
          <TableCell sx={thStyle}>Days of the Week</TableCell>
          <TableCell sx={{ color: '#FFF' }}>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {instructors.map((instructor) => (
          <InstructorListTableRow key={instructor.id} instructor={instructor} />
        ))}
      </TableBody>
    </Table>
  );
};
