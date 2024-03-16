'use client';
import { usePagination } from '@/hooks/usePagination';
import { GetCohortsResponse } from '@/types/_index';
import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { CohortListTableRow } from './CohortListTableRow';

interface CohortListTableProps {
  cohorts: GetCohortsResponse[];
}

export const CohortListTable: React.FC<CohortListTableProps> = ({ cohorts }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const thRowStyle = { bgcolor: 'primary.main', '& th': thStyle, '& th:last-child': { borderRight: 'none' } };

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
    count: cohorts.length,
    rowsPerPage: 10,
    page: 0,
  });

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
        {(rowsPerPage > 0 ? cohorts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : cohorts).map(
          (cohort) => (
            <CohortListTableRow key={cohort.id} cohort={cohort} />
          ),
        )}
        {emptyRows > 0 && <TableRow style={{ height: 53 * emptyRows }} />}
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
  );
};
