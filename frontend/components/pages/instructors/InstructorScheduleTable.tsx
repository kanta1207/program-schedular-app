import { inBoxScrollBar, tableStyle, thRowStyle } from '@/styles/_index';
import { GetInstructorsResponse } from '@/types/_index';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { InstructorScheduleTableRow } from './InstructorScheduleTableRow';

interface InstructorScheduleTableProps {
  instructor: GetInstructorsResponse;
  isIncludeEndedIntake: boolean;
}

const InstructorScheduleTableBase = (
  { instructor, isIncludeEndedIntake }: InstructorScheduleTableProps,
  ref: React.ForwardedRef<HTMLElement>,
) => {
  const isDisplayable = (intakeEndDate: Date): boolean => {
    const now = dayjs();
    const today = now.startOf('day');

    return isIncludeEndedIntake || dayjs(intakeEndDate) > today;
  };

  return (
    <Box sx={{ overflowX: 'scroll', ...inBoxScrollBar }} ref={ref}>
      <Table sx={{ minWidth: 650, ...tableStyle }}>
        <TableHead>
          <TableRow sx={thRowStyle}>
            <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Start Date</TableCell>
            <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>End Date</TableCell>
            <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Course</TableCell>
            <TableCell sx={{ width: 'calc(100% * 1/12)' }}>Cohort</TableCell>
            <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Days of the Week</TableCell>
            <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Time</TableCell>
            <TableCell sx={{ width: 'calc(100% * 1/12)' }}>Program</TableCell>
            <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Classroom</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instructor.classes.map((classData) => (
            <React.Fragment key={classData.id}>
              {isDisplayable(new Date(classData.cohort.intake.endAt)) && (
                <TableRow>
                  <InstructorScheduleTableRow classData={classData} />
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export const InstructorScheduleTable = React.forwardRef(InstructorScheduleTableBase);
