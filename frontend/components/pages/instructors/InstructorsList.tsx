'use client';
import { getInstructorsWithHours } from '@/actions/instructors/getInstructorsWithHours';
import Headline from '@/components/partials/Headline';
import { inUnderDesiredColor, isOverMaximumColor, isUnderMinimumColor } from '@/styles/_index';
import { GetInstructorsWithHoursResponse } from '@/types/_index';
import { Box, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { InstructorListTable } from './InstructorListTable';
import { InstructorWithHoursListTable } from './InstructorWithHoursListTable';
import TableViewSwitcher, { TableViewType } from './TableViewSwitcher';

interface InstructorsListProps {
  instructors: GetInstructorsWithHoursResponse[];
}

export const InstructorsList: React.FC<InstructorsListProps> = ({ instructors: instructorsWithHours }) => {
  const [tableViewType, setTableViewType] = useState<TableViewType>('info');
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(dayjs());
  const [selectedYearInstructorsWithHours, setSelectedYearInstructorsWithHours] =
    useState<GetInstructorsWithHoursResponse[]>(instructorsWithHours);

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newViewType: TableViewType) => {
    setTableViewType(newViewType);
  };

  const handleYearPickerChange = (value: Dayjs | null) => {
    setSelectedYear(value);
  };

  useEffect(() => {
    const selectedYearNumber = parseInt(dayjs(selectedYear).format('YYYY'));
    const fetchData = async () => {
      const { data } = await getInstructorsWithHours({ year: selectedYearNumber });
      setSelectedYearInstructorsWithHours(data);
    };
    fetchData();
  }, [selectedYear]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Headline name="Instructors" />
        <TableViewSwitcher tableViewType={tableViewType} handleToggleClick={handleToggleClick} />
        {tableViewType === 'hours' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', ml: '2rem' }}>
            <DatePicker
              sx={{ width: '8rem', '& input': { py: '10px' } }}
              label="Select year"
              value={selectedYear}
              views={['year']}
              onChange={handleYearPickerChange}
            />
            <Box
              sx={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                '& .mui-1crmugn-MuiTypography-root': { fontSize: '14px' },
                '& > div': {
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid rgba(224, 224, 224, 1)',
                },
                '& > div > div:first-child': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '2.5rem',
                  aspectRatio: '1/1',
                  borderRight: '1px solid rgba(224, 224, 224, 1)',
                },
                '& > div > div:last-child': {
                  px: '0.25rem',
                },
              }}
            >
              <Box>
                <Box sx={isOverMaximumColor}>
                  <Typography>00</Typography>
                </Box>
                <Box>
                  <Typography>Over maximum hours</Typography>
                </Box>
              </Box>
              <Box>
                <Box sx={isUnderMinimumColor}>
                  <Typography>00</Typography>
                </Box>
                <Box>
                  <Typography>Under minimum hours</Typography>
                </Box>
              </Box>
              <Box>
                <Box sx={inUnderDesiredColor}>
                  <Typography>00</Typography>
                </Box>
                <Box>
                  <Typography>Under desired hours</Typography>
                </Box>
              </Box>
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
        <InstructorListTable instructors={instructorsWithHours} />
      ) : (
        <InstructorWithHoursListTable
          instructors={selectedYearInstructorsWithHours}
          year={parseInt(dayjs(selectedYear).format('YYYY'))}
        />
      )}
    </LocalizationProvider>
  );
};
