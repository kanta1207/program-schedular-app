'use client';

import { useState } from 'react';
import ViewSwitcher, { ViewType } from './ViewSwitcher';
import { InstructorScheduleTable } from './InstructorScheduleTable';
import { GetInstructorsResponse } from '@/types/instructor';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import theme from '@/app/theme';
import Headline from '@/components/partials/Headline';
import GanttToolTip from '@/components/partials/gantt/GanttToolTip';

interface InstructorScheduleProps {
  instructor: GetInstructorsResponse;
  ganttItems: Task[];
}

const InstructorSchedule: React.FC<InstructorScheduleProps> = ({ instructor, ganttItems }) => {
  const [viewType, setViewType] = useState<ViewType>('list');

  const handleToggleClick = (event: React.MouseEvent<HTMLElement>, newViewType: ViewType) => {
    setViewType(newViewType);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
        <Headline name={`${instructor.name}'s Schedule`} />
        <ViewSwitcher viewType={viewType} handleToggleClick={handleToggleClick} />
      </Box>
      {viewType === 'list' ? (
        <InstructorScheduleTable instructor={instructor} />
      ) : viewType === 'gantt' ? (
        <>
          {ganttItems.length > 0 ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'end', pb: '.5rem' }}>
                <GanttToolTip />
              </Box>
              <Box sx={{ fontSize: '12px' }}>
                <Gantt
                  tasks={ganttItems}
                  viewMode={ViewMode.Week}
                  viewDate={dayjs().subtract(2, 'week').toDate()}
                  columnWidth={40}
                  projectBackgroundColor={theme.palette.gantt.project}
                  projectProgressColor={theme.palette.gantt.project}
                  projectProgressSelectedColor={theme.palette.gantt.project}
                  projectBackgroundSelectedColor={theme.palette.gantt.project}
                  fontSize="12"
                />
              </Box>
            </>
          ) : (
            <Typography sx={{ textAlign: 'center', padding: '10rem' }}>No Schedule</Typography>
          )}
        </>
      ) : null}
    </>
  );
};

export default InstructorSchedule;
