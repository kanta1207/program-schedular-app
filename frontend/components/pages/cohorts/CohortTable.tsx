import { cohorts } from '@/mock/cohort';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { CohortTableRow } from './CohortTableRow';

export const CohortTable = () => {
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ bgcolor: 'primary.main' }}>
          <TableCell sx={{ color: '#FFF', borderRight: '#FFF 1px solid' }}>Name</TableCell>
          <TableCell sx={{ color: '#FFF', borderRight: '#FFF 1px solid' }}>Intake</TableCell>
          <TableCell sx={{ color: '#FFF', borderRight: '#FFF 1px solid' }}>Program</TableCell>
          <TableCell sx={{ color: '#FFF' }}>Period</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cohorts.map((cohort) => (
          <TableRow
            key={cohort.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, ':hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <CohortTableRow cohort={cohort} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
