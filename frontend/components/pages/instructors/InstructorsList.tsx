'use client';
import Headline from '@/components/partials/Headline';
import { inUnderDesiredColor, isOverMaximumColor, isUnderMinimumColor } from '@/styles/_index';
import { GetInstructorsResponse } from '@/types/_index';
import { Box, Button, Typography } from '@mui/material';
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
        {tableViewType === 'hours' && (
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              '& > div': {
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(224, 224, 224, 1)',
              },
              '& > div > div': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '2.5rem',
                aspectRatio: '1/1',
                borderRight: '1px solid rgba(224, 224, 224, 1)',
              },
              '& > div > p': { px: '0.25rem' },
            }}
          >
            <Box>
              <Box sx={isOverMaximumColor}>00</Box>
              <Typography>Over Maximum hours</Typography>
            </Box>
            <Box>
              <Box sx={isUnderMinimumColor}>00</Box>
              <Typography>Under Minimum hours</Typography>
            </Box>
            <Box>
              <Box sx={inUnderDesiredColor}>00</Box>
              <Typography>Under Desired hours</Typography>
            </Box>
          </Box>
        )}
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
