import { classes } from '@/mock/_index';
import { Class, Cohort } from '@/types/_index';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { CohortScheduleTableRow } from './CohortScheduleTableRow';

interface CohortScheduleTableProps {
  pageType: 'new' | 'view';
  cohort?: Cohort;
}

export const CohortScheduleTable: React.FC<CohortScheduleTableProps> = ({ pageType, cohort }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const cohortSchedule: Class[] = classes.filter((classData) => classData.cohort.name === cohort?.name);

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ bgcolor: 'primary.main' }}>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 2/12)' }}>Start Date</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 2/12)' }}>End Date</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 3/12)' }}>Course</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 1.5/12)' }}>Days of the Week</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 1.5/12)' }}>Hours / Required</TableCell>
          <TableCell sx={{ ...thStyle, width: 'calc(100% * 1.5/12)' }}>Instructor</TableCell>
          <TableCell sx={{ color: '#FFF', width: 'calc(100% * 0.5/12)' }}></TableCell>
        </TableRow>
      </TableHead>
      {pageType === 'new' ? (
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
