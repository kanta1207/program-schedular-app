'use client';
import { getInstructorsWithHours } from '@/actions/instructors/getInstructorsWithHours';
import Headline from '@/components/partials/Headline';
import { inUnderDesiredColor, isOverMaximumColor, isUnderMinimumColor } from '@/styles/_index';
import { GetInstructorsResponse, GetInstructorsWithHoursResponse } from '@/types/_index';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { InstructorListTable } from './InstructorListTable';
import { InstructorWithHoursListTable } from './InstructorWithHoursListTable';
import TableViewSwitcher, { TableViewType } from './TableViewSwitcher';

interface InstructorsListProps {
  instructors: GetInstructorsResponse[];
}

export const InstructorsList: React.FC<InstructorsListProps> = ({ instructors }) => {
  const [tableViewType, setTableViewType] = useState<TableViewType>('info');
  const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));
  const [yearsArray, setYearsArray] = useState<number[]>([]);
  const [instructorsWithHours, setInstructorsWithHours] = useState<GetInstructorsWithHoursResponse[]>([]);

  useEffect(() => {
    const currentYear = dayjs().year();
    const targetYear = 2023;
    const tempArray = [];
    for (let year = currentYear; year >= targetYear; year--) {
      tempArray.push(year);
    }
    setYearsArray(tempArray);
  }, []);

  useEffect(() => {
    if (tableViewType === 'hours') {
      const selectedYearNumber = parseInt(selectedYear);
      const fetchData = async () => {
        const { data } = await getInstructorsWithHours({ year: selectedYearNumber });
        setInstructorsWithHours(data);
      };
      fetchData();
    }
  }, [tableViewType]);

  useEffect(() => {
    if (tableViewType === 'hours') {
      const selectedYearNumber = parseInt(selectedYear);
      const fetchData = async () => {
        const { data } = await getInstructorsWithHours({ year: selectedYearNumber });
        setInstructorsWithHours(data);
      };
      fetchData();
    }
  }, [selectedYear]);

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newViewType: TableViewType) => {
    setTableViewType(newViewType);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Headline name="Instructors" />
        <TableViewSwitcher tableViewType={tableViewType} handleToggleClick={handleToggleClick} />
        {tableViewType === 'hours' && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', ml: '2rem' }}>
            <FormControl sx={{ minWidth: '7rem', height: '2.5rem', '& .MuiSelect-select': { py: '9px' } }}>
              <InputLabel id="select-year-label">Select Year</InputLabel>
              <Select
                labelId="select-year-label"
                id="select-year"
                value={selectedYear}
                label="Select Year"
                onChange={handleYearChange}
              >
                {yearsArray &&
                  yearsArray.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                '& *': { fontSize: '0.85rem' },
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
                <Box sx={isOverMaximumColor}>00</Box>
                <Box>Over Maximum hours</Box>
              </Box>
              <Box>
                <Box sx={isUnderMinimumColor}>00</Box>
                <Box>Under Minimum hours</Box>
              </Box>
              <Box>
                <Box sx={inUnderDesiredColor}>00</Box>
                <Box>Under Desired hours</Box>
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
        <InstructorListTable instructors={instructors} />
      ) : (
        <InstructorWithHoursListTable instructors={instructorsWithHours} year={parseInt(selectedYear)} />
      )}
    </>
  );
};
