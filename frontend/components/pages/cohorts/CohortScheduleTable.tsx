import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

interface CohortScheduleTableProps {
  pageType: 'new' | 'edit' | 'view';
}

export const CohortScheduleTable: React.FC<CohortScheduleTableProps> = ({ pageType }) => {
  const thStyle = { color: '#FFF', borderRight: '#FFF 1px solid' };

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
      <TableBody>{pageType === 'new' ? '' : ''}</TableBody>
    </Table>
  );
};
