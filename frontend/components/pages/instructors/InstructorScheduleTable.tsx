import { GetInstructorsResponse } from '@/types/_index';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { InstructorScheduleTableRow } from './InstructorScheduleTableRow';
import React from 'react';

interface InstructorScheduleTableProps {
  instructor: GetInstructorsResponse;
}

export const InstructorScheduleTable: React.FC<InstructorScheduleTableProps> = ({ instructor }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ bgcolor: 'primary.main' }}>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 1.5/12)' }}>Start Date</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 1.5/12)' }}>End Date</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 2/12)' }}>Course</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 1.5/12)' }}>Cohort</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 1.5/12)' }}>Days of the Week</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 1.5/12)' }}>Time</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 1/12)' }}>Program</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 2/12)' }}>Classroom</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {instructor.classes.map((classData) => (
          <TableRow key={classData.id}>
            <InstructorScheduleTableRow classData={classData} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
