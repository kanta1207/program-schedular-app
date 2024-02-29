import { classes } from '@/mock/class';
import { Class } from '@/types/class';
import { Cohort } from '@/types/cohort';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { CohortScheduleTableRow } from './CohortScheduleTableRow';

interface CohortScheduleTableProps {
  pageType: 'new' | 'edit' | 'view';
  cohort?: Cohort;
}

export const CohortScheduleTable: React.FC<CohortScheduleTableProps> = ({ pageType, cohort }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };
  const cohortSchedule: Class[] = classes.filter((classData) => classData.cohort.name === cohort?.name);

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ bgcolor: 'primary.main' }}>
          <TableCell sx={thStyle}>Start Date</TableCell>
          <TableCell sx={thStyle}>End Date</TableCell>
          <TableCell sx={thStyle}>Course</TableCell>
          <TableCell sx={thStyle}>Days of the Week</TableCell>
          <TableCell sx={thStyle}>Hours / Required</TableCell>
          <TableCell sx={thStyle}>Instructor</TableCell>
          <TableCell sx={{ color: '#FFF' }}></TableCell>
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
