'use client';
import { usePagination } from '@/hooks/usePagination';
import { GetInstructorsResponse } from '@/types/_index';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { InstructorListTableRow } from './InstructorListTableRow';

interface InstructorListTableProps {
  instructors: GetInstructorsResponse[];
}

export const InstructorListTable: React.FC<InstructorListTableProps> = ({ instructors }) => {
  const thStyle = { bgcolor: 'primary.main', color: '#FFF', borderRight: '#FFF 1px solid' };
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
    count: instructors.length,
    rowsPerPage: 10,
    page: 0,
  });

  return (
    <TableContainer sx={{ maxHeight: 600 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow sx={thRowStyle}>
            <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Name</TableCell>
            <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Contract</TableCell>
            <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Desired Hours</TableCell>
            <TableCell sx={{ width: 'calc(100% * 3.5/12)' }}>Period</TableCell>
            <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Days of the Week</TableCell>
            <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? instructors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : instructors
          ).map((instructor) => (
            <InstructorListTableRow key={instructor.id} instructor={instructor} />
          ))}
          {emptyRows > 0 && <TableRow style={{ height: 61 * emptyRows }} />}
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
    </TableContainer>
  );
};
