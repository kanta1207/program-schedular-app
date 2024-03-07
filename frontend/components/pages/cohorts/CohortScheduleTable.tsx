import { classes } from '@/mock/_index';
import { Cohort } from '@/types/_index';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { CohortScheduleTableRow } from './CohortScheduleTableRow';

interface CohortScheduleTableProps {
  cohort?: Cohort;
}

export const CohortScheduleTable: React.FC<CohortScheduleTableProps> = ({ cohort }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const thRowStyle = { bgcolor: 'primary.main', '& th': thStyle, '& th:last-child': { borderRight: 'none' } };

  const cohortSchedule = classes.filter((classData) => classData.cohort.name === cohort?.name);

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={thRowStyle}>
          <TableCell sx={{ width: 'calc(100% * 2/12)' }}>Start Date</TableCell>
          <TableCell sx={{ width: 'calc(100% * 2/12)' }}>End Date</TableCell>
          <TableCell sx={{ width: 'calc(100% * 3/12)' }}>Course</TableCell>
          <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Days of the Week</TableCell>
          <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Hours / Required</TableCell>
          <TableCell sx={{ width: 'calc(100% * 1.5/12)' }}>Instructor</TableCell>
          <TableCell sx={{ width: 'calc(100% * 0.5/12)' }}></TableCell>
        </TableRow>
      </TableHead>
      {!cohort ? (
        ''
      ) : (
        <TableBody>
          {cohortSchedule.map((classData) => (
            <TableRow key={classData.id}>
              <CohortScheduleTableRow classData={classData} />
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};
