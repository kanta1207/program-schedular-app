'use client';
import { usePagination } from '@/hooks/usePagination';
import { inBoxScrollBar, tableStyle, thRowStyle } from '@/styles/_index';
import { GetInstructorsResponse } from '@/types/_index';
import { Box, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { InstructorListTableRow } from './InstructorListTableRow';

interface InstructorListTableProps {
  instructors: GetInstructorsResponse[];
}

export const InstructorListTable: React.FC<InstructorListTableProps> = ({ instructors }) => {
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
    rowsPerPage: 25,
    page: 0,
  });

  return (
    <Box sx={{ overflowX: 'scroll', ...inBoxScrollBar }}>
      <Table sx={{ minWidth: 650, ...tableStyle }}>
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
    </Box>
  );
};
