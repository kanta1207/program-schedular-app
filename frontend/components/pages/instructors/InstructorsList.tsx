'use client';
import Headline from '@/components/partials/Headline';
import { GetInstructorsResponse } from '@/types/_index';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { InstructorListTable } from './InstructorListTable';
import { InstructorWithHoursListTable } from './InstructorWithHoursListTable';
import TableViewSwitcher, { TableViewType } from './TableViewSwitcher';

interface InstructorsListProps {
  instructors: GetInstructorsResponse[];
}

export const InstructorsList: React.FC<InstructorsListProps> = ({ instructors }) => {
  const [tableViewType, setTableViewType] = useState<TableViewType>('info');
  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newViewType: TableViewType) => {
    setTableViewType(newViewType);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Headline name="Instructors" />
        <TableViewSwitcher tableViewType={tableViewType} handleToggleClick={handleToggleClick} />
      </Box>
      <div className="flex justify-end mb-4 ">
        <Button href={'/instructors/new'} variant="contained">
          New Instructor
        </Button>
      </div>
      {tableViewType === 'info' ? (
        <InstructorListTable instructors={instructors} />
      ) : (
        <InstructorWithHoursListTable instructors={instructors} />
      )}
    </>
  );
};
