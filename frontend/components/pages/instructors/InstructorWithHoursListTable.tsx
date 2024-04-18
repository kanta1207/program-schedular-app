'use client';
import { usePagination } from '@/hooks/usePagination';
import { inBoxScrollBar, tableStyle, thRowStyle } from '@/styles/_index';
import { GetInstructorsWithHoursResponse } from '@/types/_index';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import { InstructorWithHoursListTableRow } from './InstructorWithHoursListTableRow';

interface InstructorListTableProps {
  instructors: GetInstructorsWithHoursResponse[];
  year: number;
}

export interface WeekBlock {
  id: number;
  weekStartDate: string;
  weekEndDate: string;
}

export const InstructorWithHoursListTable: React.FC<InstructorListTableProps> = ({ instructors }) => {
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
    <>
      <Box>
        <Box
          sx={{
            overflowX: 'scroll',
            ...inBoxScrollBar,
            '& .sticky-column': { zIndex: '2', position: 'sticky' },
            '& tr': { cursor: 'auto' },
            '& tbody td.sticky-column, & tbody th.sticky-column': { bgcolor: '#FFF' },
            '& tbody tr:hover td.sticky-column': { bgcolor: '#F5F5F5', cursor: 'pointer' },
            '& tbody tr:hover th.sticky-column': { bgcolor: '#F5F5F5', cursor: 'pointer' },
          }}
        >
          <Table sx={{ minWidth: 650, ...tableStyle, borderCollapse: 'separate' }}>
            <TableHead>
              <TableRow sx={thRowStyle}>
                <TableCell className="sticky-column" sx={{ left: '0', minWidth: '120px' }}>
                  Name
                </TableCell>
                <TableCell className="sticky-column" sx={{ left: '120px', minWidth: '90px' }}>
                  Contract
                </TableCell>
                <TableCell className="sticky-column" sx={{ left: '210px', minWidth: '220px' }}>
                  Availability
                </TableCell>
                <TableCell className="sticky-column" sx={{ left: '430px', textAlign: 'center', lineHeight: '1rem' }}>
                  Desired Hours
                </TableCell>
                {instructors[0].assignedHours.map((weekObj) => (
                  <TableCell
                    key={dayjs(weekObj.startAt).format('YYYYMMDD')}
                    sx={{ zIndex: '1', px: '0.5rem', minWidth: '3rem' }}
                  >
                    <Typography sx={{ fontSize: '0.75rem' }}>
                      {dayjs(weekObj.startAt).format('MM-DD')}
                      <br />
                      {dayjs(weekObj.endAt).format('MM-DD')}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? instructors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : instructors
              ).map((instructor) => (
                <InstructorWithHoursListTableRow key={instructor.id} instructor={instructor} />
              ))}
              {emptyRows > 0 && <TableRow style={{ height: 52 * emptyRows }} />}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  sx={{ left: '0' }}
                  rowsPerPageOptions={rowsPerPageOptions}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={ActionsComponent}
                  colSpan={4}
                  className="sticky-column"
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      </Box>
    </>
  );
};
