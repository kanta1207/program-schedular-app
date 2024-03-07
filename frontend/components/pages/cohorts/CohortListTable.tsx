import { Cohort } from '@/types/_index';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CohortListTableRow } from './CohortListTableRow';

interface CohortListTableProps {
  cohorts: Cohort[];
}

export const CohortListTable: React.FC<CohortListTableProps> = ({ cohorts }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const thRowStyle = { bgcolor: 'primary.main', '& th': thStyle, '& th:last-child': { borderRight: 'none' } };

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={thRowStyle}>
          <TableCell>Name</TableCell>
          <TableCell>Intake</TableCell>
          <TableCell>Program</TableCell>
          <TableCell>Period</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cohorts.map((cohort) => (
          <CohortListTableRow key={cohort.id} cohort={cohort} />
        ))}
      </TableBody>
    </Table>
  );
};
