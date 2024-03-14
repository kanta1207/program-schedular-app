import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CohortListTableRow } from './CohortListTableRow';
import { GetCohortsResponse } from '@/types/_index';

interface CohortListTableProps {
  cohorts: GetCohortsResponse[];
}

export const CohortListTable: React.FC<CohortListTableProps> = ({ cohorts }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const thRowStyle = { bgcolor: 'primary.main', '& th': thStyle, '& th:last-child': { borderRight: 'none' } };

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={thRowStyle}>
          <TableCell sx={{ width: 'calc(100% * 3/12)' }}>Intake</TableCell>
          <TableCell sx={{ width: 'calc(100% * 3/12)' }}>Name</TableCell>
          <TableCell sx={{ width: 'calc(100% * 3/12)' }}>Program</TableCell>
          <TableCell sx={{ width: 'calc(100% * 3/12)' }}>Period</TableCell>
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
