'use client';
import { usePagination } from '@/hooks/usePagination';
import { inBoxScrollBar, tableStyle, thRowStyle } from '@/styles/_index';
import { GetBreaksResponse, GetInstructorsWithHoursResponse } from '@/types/_index';
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

import { useEffect, useState } from 'react';
import { InstructorWithHoursListTableRow } from './InstructorWithHoursListTableRow';

interface InstructorListTableProps {
  instructors: GetInstructorsWithHoursResponse[];
  year: number;
  breaks: GetBreaksResponse[];
}

export interface WeekBlock {
  id: number;
  weekStartDate: string;
  weekEndDate: string;
}

export const InstructorWithHoursListTable: React.FC<InstructorListTableProps> = ({ instructors, year, breaks }) => {
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

  const [weekBlocks, setWeekBlocks] = useState<WeekBlock[]>([]);
  const [bks, setBks] = useState<WeekBlock[]>([]);
  const [selectedYearBreaks, setSelectedYearBreaks] = useState<GetBreaksResponse[]>([]);

  useEffect(() => {
    const weekBlocksData = [];
    const startDate = dayjs(`${year}-01-01`).startOf('week').add(1, 'day');
    for (let i = 0; i < 53; i++) {
      const weekStartDate = startDate.add(i * 7, 'day').format('MM-DD');
      const weekEndDate = dayjs(weekStartDate).add(4, 'day').format('MM-DD');

      const weekBlock = {
        id: i,
        weekStartDate: weekStartDate,
        weekEndDate: weekEndDate,
      };
      weekBlocksData.push(weekBlock);
    }
    setWeekBlocks(weekBlocksData);

    // filter breaks within the selected year
    const filteredSelectedYearBreaks = breaks
      .filter((breakItem) => dayjs(breakItem.startAt).isAfter(dayjs(`${year}-01-01`)))
      .filter((breakItem) => dayjs(breakItem.endAt).isBefore(dayjs(`${year}-12-31`)));
    setSelectedYearBreaks(filteredSelectedYearBreaks);

    console.log(instructors[0].assignedHours);

    const wkbks = instructors[0].assignedHours.map((obj, i) => {
      return {
        id: i,

        weekStarDate: dayjs(obj.startAt).add(8, 'hour').format('MM-DD'),
        weekEndData: dayjs(obj.endAt).add(8, 'hour').format('MM-DD'),
      };
    });
    setBks([...bks]);

    console.log(wkbks);
  }, [year]);

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
                {weekBlocks.length > 0 &&
                  weekBlocks.map((week) => (
                    <TableCell key={week.id} sx={{ zIndex: '1', px: '0.5rem', minWidth: '3rem' }}>
                      <Typography sx={{ fontSize: '0.75rem' }}>
                        {week.weekStartDate}
                        <br />
                        {week.weekEndDate}
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
                <InstructorWithHoursListTableRow key={instructor.id} instructor={instructor} weekBlocks={weekBlocks} />
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
