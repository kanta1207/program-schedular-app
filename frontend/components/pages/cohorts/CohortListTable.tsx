import { Cohort } from '@/types/cohort';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CohortListTableRow } from './CohortListTableRow';

interface CohortListTableProps {
  cohorts: Cohort[];
}

export const CohortListTable: React.FC<CohortListTableProps> = ({ cohorts }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ bgcolor: 'primary.main' }}>
          <TableCell sx={thStyle}>Name</TableCell>
          <TableCell sx={thStyle}>Intake</TableCell>
          <TableCell sx={thStyle}>Program</TableCell>
          <TableCell sx={{ color: '#FFF' }}>Period</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cohorts.map((cohort) => (
          <TableRow
            key={cohort.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <CohortListTableRow cohort={cohort} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
